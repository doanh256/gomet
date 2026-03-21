import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './middleware/auth.js';
import { prisma } from './index.js';

export function setupSocket(io) {
  // Authenticate socket connections
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Token required'));

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      socket.user = decoded;
      next();
    } catch {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    const userId = socket.user.id;

    // Join user's personal room
    socket.join(userId);

    // Join a conversation room
    socket.on('join_conversation', ({ conversationId }) => {
      socket.join(`conv_${conversationId}`);
    });

    // Send a message
    socket.on('send_message', async ({ conversationId, text }) => {
      try {
        // Verify membership
        const membership = await prisma.conversationMember.findUnique({
          where: {
            conversationId_userId: { conversationId, userId },
          },
        });

        if (!membership) return;

        // Save message to DB
        const message = await prisma.message.create({
          data: { conversationId, senderId: userId, text },
          include: {
            sender: { select: { id: true, name: true, avatar: true } },
          },
        });

        // Emit to all members of this conversation
        io.to(`conv_${conversationId}`).emit('new_message', {
          conversationId,
          message,
        });

        // Also notify other members who might not be in the conversation room
        const members = await prisma.conversationMember.findMany({
          where: { conversationId, userId: { not: userId } },
        });
        members.forEach(m => {
          io.to(m.userId).emit('message_notification', {
            conversationId,
            message,
          });
        });
      } catch (err) {
        console.error('Socket send_message error:', err);
      }
    });

    // Typing indicator
    socket.on('typing', ({ conversationId }) => {
      socket.to(`conv_${conversationId}`).emit('user_typing', {
        conversationId,
        userId,
      });
    });

    socket.on('disconnect', () => {
      // Cleanup if needed
    });
  });
}
