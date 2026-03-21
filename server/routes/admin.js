import { Router } from 'express';
import { prisma } from '../index.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);
router.use(adminMiddleware);

// GET /api/admin/stats
router.get('/stats', async (req, res) => {
  try {
    const [userCount, matchCount, postCount, messageCount, transactionSum] = await Promise.all([
      prisma.user.count({ where: { role: 'user' } }),
      prisma.match.count(),
      prisma.datePost.count(),
      prisma.message.count(),
      prisma.transaction.aggregate({ _sum: { amount: true }, where: { type: 'topup' } }),
    ]);
    res.json({
      users: userCount,
      matches: matchCount,
      datePosts: postCount,
      messages: messageCount,
      revenue: transactionSum._sum.amount || 0,
    });
  } catch (err) {
    console.error('Admin stats error:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// GET /api/admin/users
router.get('/users', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || '';
    const where = {
      role: 'user',
      ...(search ? { OR: [{ name: { contains: search } }, { email: { contains: search } }] } : {}),
    };
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, email: true, avatar: true, age: true, gender: true, location: true, walletBalance: true, createdAt: true },
      }),
      prisma.user.count({ where }),
    ]);
    res.json({ users, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    console.error('Admin users error:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// GET /api/admin/date-posts
router.get('/date-posts', async (req, res) => {
  try {
    const posts = await prisma.datePost.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: { author: { select: { id: true, name: true, avatar: true } }, _count: { select: { applications: true } } },
    });
    res.json({ posts });
  } catch (err) {
    console.error('Admin date-posts error:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// GET /api/admin/recent-signups
router.get('/recent-signups', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { role: 'user' },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: { id: true, name: true, email: true, avatar: true, createdAt: true },
    });
    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// GET /api/admin/reports - Danh sách tất cả báo cáo
router.get('/reports', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const status = req.query.status;

    const where = status ? { status } : {};

    const [reports, total] = await Promise.all([
      prisma.report.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          reporter: { select: { id: true, name: true, email: true, avatar: true } },
          reported: { select: { id: true, name: true, email: true, avatar: true } },
        },
      }),
      prisma.report.count({ where }),
    ]);

    res.json({ reports, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    console.error('Admin reports error:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// PUT /api/admin/reports/:id - Cập nhật trạng thái báo cáo
router.put('/reports/:id', async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !['resolved', 'dismissed'].includes(status)) {
      return res.status(400).json({ error: 'Trạng thái không hợp lệ. Chọn resolved hoặc dismissed' });
    }

    const report = await prisma.report.findUnique({ where: { id: req.params.id } });
    if (!report) {
      return res.status(404).json({ error: 'Báo cáo không tồn tại' });
    }

    const updated = await prisma.report.update({
      where: { id: req.params.id },
      data: { status },
      include: {
        reporter: { select: { id: true, name: true, email: true, avatar: true } },
        reported: { select: { id: true, name: true, email: true, avatar: true } },
      },
    });

    res.json({ message: 'Cập nhật trạng thái báo cáo thành công', report: updated });
  } catch (err) {
    console.error('Admin update report error:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

export default router;
