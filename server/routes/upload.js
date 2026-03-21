import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { prisma } from '../index.js';
import { authMiddleware } from '../middleware/auth.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), 'server', 'uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${req.user.id}_${Date.now()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Chỉ chấp nhận file ảnh'), false);
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

const router = Router();
router.use(authMiddleware);

// POST /api/upload/avatar
router.post('/avatar', upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Không có file nào được upload' });
    }

    const avatarUrl = `/uploads/${req.file.filename}`;
    await prisma.user.update({
      where: { id: req.user.id },
      data: { avatar: avatarUrl },
    });

    res.json({ url: avatarUrl });
  } catch (err) {
    console.error('Upload avatar error:', err);
    res.status(500).json({ error: 'Lỗi upload' });
  }
});

// POST /api/upload/images
router.post('/images', upload.array('images', 6), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'Không có file nào được upload' });
    }

    const currentMax = await prisma.userImage.findFirst({
      where: { userId: req.user.id },
      orderBy: { order: 'desc' },
    });
    let nextOrder = (currentMax?.order ?? -1) + 1;

    const images = await Promise.all(
      req.files.map((file, i) =>
        prisma.userImage.create({
          data: {
            userId: req.user.id,
            url: `/uploads/${file.filename}`,
            order: nextOrder + i,
          },
        })
      )
    );

    res.json({ images });
  } catch (err) {
    console.error('Upload images error:', err);
    res.status(500).json({ error: 'Lỗi upload' });
  }
});

export default router;
