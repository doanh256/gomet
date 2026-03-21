import { Router } from 'express';
import { prisma } from '../index.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

// POST /api/swipes
router.post('/', async (req, res) => {
  try {
    const { targetId, action } = req.body;
    const senderId = req.user.id;

    if (!targetId || !action) {
      return res.status(400).json({ error: 'Thiếu targetId hoặc action' });
    }
    if (!['like', 'dislike', 'superlike'].includes(action)) {
      return res.status(400).json({ error: 'Action không hợp lệ' });
    }
    if (targetId === senderId) {
      return res.status(400).json({ error: 'Không thể swipe chính mình' });
    }

    // Create or update swipe
    await prisma.swipe.upsert({
      where: { senderId_targetId: { senderId, targetId } },
      update: { action },
      create: { senderId, targetId, action },
    });

    // Check for mutual match (only if like or superlike)
    let matched = false;
    let matchUser = null;

    if (action === 'like' || action === 'superlike') {
      const otherSwipe = await prisma.swipe.findUnique({
        where: { senderId_targetId: { senderId: targetId, targetId: senderId } },
      });

      if (otherSwipe && (otherSwipe.action === 'like' || otherSwipe.action === 'superlike')) {
        // Mutual match! Create match record
        const [id1, id2] = [senderId, targetId].sort();

        const existingMatch = await prisma.match.findUnique({
          where: { user1Id_user2Id: { user1Id: id1, user2Id: id2 } },
        });

        if (!existingMatch) {
          await prisma.match.create({
            data: { user1Id: id1, user2Id: id2 },
          });

          // Create conversation with icebreaker
          const targetUser = await prisma.user.findUnique({ where: { id: targetId } });

          const conversation = await prisma.conversation.create({
            data: {
              type: 'match',
              members: {
                create: [
                  { userId: senderId },
                  { userId: targetId },
                ],
              },
              messages: {
                create: {
                  senderId: senderId,
                  text: `🎉 Bạn và ${targetUser.name} đã kết nối! Nhắn tin phá băng ngay!`,
                  isSystem: true,
                },
              },
            },
          });

          matched = true;
          const { password, ...cleaned } = targetUser;
          matchUser = cleaned;
        }
      }
    }

    res.json({ matched, matchUser });
  } catch (err) {
    console.error('Swipe error:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

export default router;
