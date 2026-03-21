import { Router } from 'express';
import { prisma } from '../index.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

// POST /api/date-posts
router.post('/', async (req, res) => {
  try {
    const { category, title, description, icon, time, place, price, maxApply } = req.body;

    if (!category || !title) {
      return res.status(400).json({ error: 'Cần có category và title' });
    }
    if (!['tim_yeu', 'tim_ban', 'tra_phi'].includes(category)) {
      return res.status(400).json({ error: 'Category không hợp lệ' });
    }
    if (category === 'tra_phi' && (!price || price <= 0)) {
      return res.status(400).json({ error: 'Cuộc hẹn trả phí cần có giá > 0' });
    }

    const post = await prisma.datePost.create({
      data: {
        authorId: req.user.id,
        category,
        title,
        description,
        icon: icon || 'coffee',
        time,
        place,
        price: category === 'tra_phi' ? price : null,
        maxApply: maxApply || 1,
      },
      include: {
        author: { select: { id: true, name: true, avatar: true, age: true, location: true } },
        _count: { select: { applications: true } },
      },
    });

    res.json({ post });
  } catch (err) {
    console.error('Create date post error:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// GET /api/date-posts
router.get('/', async (req, res) => {
  try {
    const { category, status = 'open', page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = { status };
    if (category) where.category = category;

    const posts = await prisma.datePost.findMany({
      where,
      include: {
        author: { select: { id: true, name: true, avatar: true, age: true, location: true } },
        _count: { select: { applications: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: parseInt(limit),
    });

    const total = await prisma.datePost.count({ where });
    res.json({ posts, total });
  } catch (err) {
    console.error('Get date posts error:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// GET /api/date-posts/my-posts
router.get('/my-posts', async (req, res) => {
  try {
    const posts = await prisma.datePost.findMany({
      where: { authorId: req.user.id },
      include: {
        applications: {
          include: {
            applicant: { select: { id: true, name: true, avatar: true, age: true, location: true } },
          },
        },
        _count: { select: { applications: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ posts });
  } catch (err) {
    console.error('Get my posts error:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// GET /api/date-posts/:id
router.get('/:id', async (req, res) => {
  try {
    const post = await prisma.datePost.findUnique({
      where: { id: req.params.id },
      include: {
        author: { select: { id: true, name: true, avatar: true, age: true, location: true, bio: true } },
        applications: {
          include: {
            applicant: { select: { id: true, name: true, avatar: true, age: true, location: true } },
          },
        },
        _count: { select: { applications: true } },
      },
    });

    if (!post) return res.status(404).json({ error: 'Bài đăng không tồn tại' });

    // Only show applications to the author
    if (post.authorId !== req.user.id) {
      post.applications = undefined;
    }

    res.json({ post });
  } catch (err) {
    console.error('Get date post error:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// PUT /api/date-posts/:id
router.put('/:id', async (req, res) => {
  try {
    const post = await prisma.datePost.findUnique({ where: { id: req.params.id } });
    if (!post) return res.status(404).json({ error: 'Bài đăng không tồn tại' });
    if (post.authorId !== req.user.id) return res.status(403).json({ error: 'Không có quyền chỉnh sửa' });

    const { title, description, icon, time, place, price, status } = req.body;

    const updated = await prisma.datePost.update({
      where: { id: req.params.id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(icon !== undefined && { icon }),
        ...(time !== undefined && { time }),
        ...(place !== undefined && { place }),
        ...(price !== undefined && { price }),
        ...(status !== undefined && { status }),
      },
    });

    res.json({ post: updated });
  } catch (err) {
    console.error('Update date post error:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// DELETE /api/date-posts/:id
router.delete('/:id', async (req, res) => {
  try {
    const post = await prisma.datePost.findUnique({ where: { id: req.params.id } });
    if (!post) return res.status(404).json({ error: 'Bài đăng không tồn tại' });
    if (post.authorId !== req.user.id) return res.status(403).json({ error: 'Không có quyền xóa' });

    await prisma.datePost.update({
      where: { id: req.params.id },
      data: { status: 'cancelled' },
    });

    res.json({ message: 'Đã hủy bài đăng' });
  } catch (err) {
    console.error('Delete date post error:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

export default router;
