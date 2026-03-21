import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../index.js';

const router = Router();

// Lưu trữ mã xác nhận trong bộ nhớ
const resetCodes = new Map();

// POST /api/auth/forgot-password - Gửi mã xác nhận
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Vui lòng nhập email' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'Email không tồn tại trong hệ thống' });
    }

    // Tạo mã xác nhận 6 chữ số
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Lưu mã với thời hạn 10 phút
    resetCodes.set(email, {
      code,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    // Giả lập gửi email (không gửi thật)
    console.log(`[Password Reset] Mã xác nhận cho ${email}: ${code}`);

    res.json({ message: 'Mã xác nhận đã được gửi' });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// POST /api/auth/reset-password - Đặt lại mật khẩu
router.post('/reset-password', async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword) {
      return res.status(400).json({ error: 'Vui lòng nhập đầy đủ thông tin' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Mật khẩu mới phải có ít nhất 6 ký tự' });
    }

    const stored = resetCodes.get(email);
    if (!stored) {
      return res.status(400).json({ error: 'Mã xác nhận không hợp lệ hoặc đã hết hạn' });
    }

    if (Date.now() > stored.expiresAt) {
      resetCodes.delete(email);
      return res.status(400).json({ error: 'Mã xác nhận đã hết hạn' });
    }

    if (stored.code !== code) {
      return res.status(400).json({ error: 'Mã xác nhận không đúng' });
    }

    // Cập nhật mật khẩu
    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { email },
      data: { password: hashed },
    });

    // Xóa mã xác nhận đã sử dụng
    resetCodes.delete(email);

    res.json({ message: 'Đặt lại mật khẩu thành công' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

export default router;
