import { Router } from 'express';
import { prisma } from '../index.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

// GET /api/conversations
router.get('/', async (req, res) => {
  try {
    const memberships = await prisma.conversationMember.findMany({
      where: { userId: req.user.id },
      select: { conversationId: true },
    });

    const convIds = memberships.map(m => m.conversationId);

    const conversations = await prisma.conversation.findMany({
      where: { id: { in: convIds } },
      include: {
        members: {
          include: {
            user: { select: { id: true, name: true, avatar: true } },
          },
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Format: add "otherUser" and "lastMessage"
    const formatted = conversations.map(conv => {
      const otherMember = conv.members.find(m => m.userId !== req.user.id);
      return {
        id: conv.id,
        type: conv.type,
        otherUser: otherMember?.user || null,
        lastMessage: conv.messages[0] || null,
        createdAt: conv.createdAt,
      };
    });

    res.json({ conversations: formatted });
  } catch (err) {
    console.error('Get conversations error:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// GET /api/conversations/:id/messages
router.get('/:id/messages', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    // Verify membership
    const membership = await prisma.conversationMember.findUnique({
      where: {
        conversationId_userId: {
          conversationId: req.params.id,
          userId: req.user.id,
        },
      },
    });

    if (!membership) {
      return res.status(403).json({ error: 'Bạn không thuộc cuộc trò chuyện này' });
    }

    const messages = await prisma.message.findMany({
      where: { conversationId: req.params.id },
      include: {
        sender: { select: { id: true, name: true, avatar: true } },
      },
      orderBy: { createdAt: 'asc' },
      skip,
      take: limit,
    });

    res.json({ messages });
  } catch (err) {
    console.error('Get messages error:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

export default router;
