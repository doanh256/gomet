import { Router } from 'express';
import { prisma } from '../index.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

// POST /api/date-posts/:id/apply
router.post('/:id/apply', async (req, res) => {
  try {
    const postId = req.params.id;
    const applicantId = req.user.id;
    const { message } = req.body;

    const post = await prisma.datePost.findUnique({ where: { id: postId } });
    if (!post) return res.status(404).json({ error: 'Bài đăng không tồn tại' });
    if (post.status !== 'open') return res.status(400).json({ error: 'Bài đăng đã đóng' });
    if (post.authorId === applicantId) return res.status(400).json({ error: 'Không thể ứng tuyển bài đăng của mình' });

    const existing = await prisma.dateApplication.findUnique({
      where: { postId_applicantId: { postId, applicantId } },
    });
    if (existing) return res.status(400).json({ error: 'Bạn đã ứng tuyển rồi' });

    const application = await prisma.dateApplication.create({
      data: { postId, applicantId, message },
      include: {
        applicant: { select: { id: true, name: true, avatar: true, age: true, location: true } },
      },
    });

    res.json({ application });
  } catch (err) {
    console.error('Apply error:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// GET /api/date-applications/my-applications
router.get('/my-applications', async (req, res) => {
  try {
    const applications = await prisma.dateApplication.findMany({
      where: { applicantId: req.user.id },
      include: {
        post: {
          include: {
            author: { select: { id: true, name: true, avatar: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ applications });
  } catch (err) {
    console.error('Get my applications error:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// PUT /api/date-applications/:id/accept
router.put('/:id/accept', async (req, res) => {
  try {
    const application = await prisma.dateApplication.findUnique({
      where: { id: req.params.id },
      include: { post: true },
    });

    if (!application) return res.status(404).json({ error: 'Đơn ứng tuyển không tồn tại' });
    if (application.post.authorId !== req.user.id) {
      return res.status(403).json({ error: 'Không có quyền' });
    }
    if (application.status !== 'pending') {
      return res.status(400).json({ error: 'Đơn đã được xử lý' });
    }

    // Handle payment for tra_phi
    if (application.post.category === 'tra_phi' && application.post.price) {
      const applicant = await prisma.user.findUnique({ where: { id: application.applicantId } });
      if (applicant.walletBalance < application.post.price) {
        return res.status(400).json({ error: 'Người ứng tuyển không đủ số dư' });
      }

      // Debit applicant, credit author
      await prisma.$transaction([
        prisma.user.update({
          where: { id: application.applicantId },
          data: { walletBalance: { decrement: application.post.price } },
        }),
        prisma.user.update({
          where: { id: application.post.authorId },
          data: { walletBalance: { increment: application.post.price } },
        }),
        prisma.transaction.create({
          data: {
            userId: application.applicantId,
            type: 'payment',
            amount: -application.post.price,
            description: `Thanh toán cho: ${application.post.title}`,
            relatedPostId: application.post.id,
          },
        }),
        prisma.transaction.create({
          data: {
            userId: application.post.authorId,
            type: 'earning',
            amount: application.post.price,
            description: `Thu nhập từ: ${application.post.title}`,
            relatedPostId: application.post.id,
          },
        }),
      ]);
    }

    // Update application status
    await prisma.dateApplication.update({
      where: { id: req.params.id },
      data: { status: 'accepted' },
    });

    // Check if maxApply reached
    const acceptedCount = await prisma.dateApplication.count({
      where: { postId: application.postId, status: 'accepted' },
    });
    if (acceptedCount >= application.post.maxApply) {
      await prisma.datePost.update({
        where: { id: application.postId },
        data: { status: 'filled' },
      });
    }

    // Create private conversation
    const conversation = await prisma.conversation.create({
      data: {
        type: 'date',
        datePostId: application.postId,
        members: {
          create: [
            { userId: application.post.authorId },
            { userId: application.applicantId },
          ],
        },
        messages: {
          create: {
            senderId: application.post.authorId,
            text: `🎉 Cuộc hẹn "${application.post.title}" đã được chốt! Hãy trao đổi chi tiết nhé!`,
            isSystem: true,
          },
        },
      },
    });

    res.json({ message: 'Đã chấp nhận', conversationId: conversation.id });
  } catch (err) {
    console.error('Accept error:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// PUT /api/date-applications/:id/reject
router.put('/:id/reject', async (req, res) => {
  try {
    const application = await prisma.dateApplication.findUnique({
      where: { id: req.params.id },
      include: { post: true },
    });

    if (!application) return res.status(404).json({ error: 'Đơn ứng tuyển không tồn tại' });
    if (application.post.authorId !== req.user.id) {
      return res.status(403).json({ error: 'Không có quyền' });
    }

    await prisma.dateApplication.update({
      where: { id: req.params.id },
      data: { status: 'rejected' },
    });

    res.json({ message: 'Đã từ chối' });
  } catch (err) {
    console.error('Reject error:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

export default router;
