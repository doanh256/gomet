import { Router } from 'express';
import { prisma } from '../index.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

// GET /api/wallet
router.get('/', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { walletBalance: true },
    });

    const recentTransactions = await prisma.transaction.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    res.json({ balance: user.walletBalance, transactions: recentTransactions });
  } catch (err) {
    console.error('Get wallet error:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// POST /api/wallet/topup
router.post('/topup', async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Số tiền phải lớn hơn 0' });
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: req.user.id },
        data: { walletBalance: { increment: amount } },
      }),
      prisma.transaction.create({
        data: {
          userId: req.user.id,
          type: 'topup',
          amount,
          description: `Nạp ${amount.toLocaleString('vi-VN')}đ vào ví`,
        },
      }),
    ]);

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { walletBalance: true },
    });

    res.json({ balance: user.walletBalance, message: 'Nạp tiền thành công' });
  } catch (err) {
    console.error('Topup error:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// GET /api/wallet/transactions
router.get('/transactions', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const transactions = await prisma.transaction.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    });

    const total = await prisma.transaction.count({ where: { userId: req.user.id } });
    res.json({ transactions, total });
  } catch (err) {
    console.error('Get transactions error:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

export default router;
