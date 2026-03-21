import { Router } from 'express';
import { prisma } from '../index.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// POST /api/users/:id/block - Chặn người dùng
router.post('/:id/block', authMiddleware, async (req, res) => {
  try {
    const blockedId = req.params.id;
    const blockerId = req.user.id;

    if (blockerId === blockedId) {
      return res.status(400).json({ error: 'Không thể tự chặn chính mình' });
    }

    const targetUser = await prisma.user.findUnique({ where: { id: blockedId } });
    if (!targetUser) {
      return res.status(404).json({ error: 'Người dùng không tồn tại' });
    }

    const existing = await prisma.block.findUnique({
      where: { blockerId_blockedId: { blockerId, blockedId } },
    });
    if (existing) {
      return res.status(400).json({ error: 'Bạn đã chặn người dùng này rồi' });
    }

    await prisma.block.create({
      data: { blockerId, blockedId },
    });

    res.json({ message: 'Đã chặn người dùng thành công' });
  } catch (err) {
    console.error('Block user error:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// DELETE /api/users/:id/block - Bỏ chặn người dùng
router.delete('/:id/block', authMiddleware, async (req, res) => {
  try {
    const blockedId = req.params.id;
    const blockerId = req.user.id;

    const existing = await prisma.block.findUnique({
      where: { blockerId_blockedId: { blockerId, blockedId } },
    });
    if (!existing) {
      return res.status(404).json({ error: 'Bạn chưa chặn người dùng này' });
    }

    await prisma.block.delete({
      where: { blockerId_blockedId: { blockerId, blockedId } },
    });

    res.json({ message: 'Đã bỏ chặn người dùng thành công' });
  } catch (err) {
    console.error('Unblock user error:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// GET /api/users/blocked - Danh sách người dùng đã chặn
router.get('/blocked', authMiddleware, async (req, res) => {
  try {
    const blocks = await prisma.block.findMany({
      where: { blockerId: req.user.id },
      include: {
        blocked: {
          select: { id: true, name: true, avatar: true, age: true, gender: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const blockedUsers = blocks.map(b => ({
      ...b.blocked,
      blockedAt: b.createdAt,
    }));

    res.json({ blockedUsers });
  } catch (err) {
    console.error('Get blocked users error:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// POST /api/users/:id/report - Báo cáo người dùng
router.post('/:id/report', authMiddleware, async (req, res) => {
  try {
    const reportedId = req.params.id;
    const reporterId = req.user.id;
    const { reason, details } = req.body;

    if (reporterId === reportedId) {
      return res.status(400).json({ error: 'Không thể tự báo cáo chính mình' });
    }

    if (!reason) {
      return res.status(400).json({ error: 'Vui lòng chọn lý do báo cáo' });
    }

    const targetUser = await prisma.user.findUnique({ where: { id: reportedId } });
    if (!targetUser) {
      return res.status(404).json({ error: 'Người dùng không tồn tại' });
    }

    const report = await prisma.report.create({
      data: { reporterId, reportedId, reason, details },
    });

    res.json({ message: 'Báo cáo đã được gửi thành công', report });
  } catch (err) {
    console.error('Report user error:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

export default router;
