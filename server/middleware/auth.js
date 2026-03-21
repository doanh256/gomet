import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'gomet-secret-key-2026';

export const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token không hợp lệ' });
  }

  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Token hết hạn hoặc không hợp lệ' });
  }
};

export const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Bạn không có quyền admin' });
  }
  next();
};

export { JWT_SECRET };
