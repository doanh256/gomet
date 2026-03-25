import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

// ============================================
// GET /api/search
//    Global search across venues, events, users, movies
//    Query: ?q=pho&type=all|venues|events|users|movies
// ============================================
router.get('/', async (req, res) => {
  try {
    const { q, type = 'all' } = req.query;

    if (!q || q.trim().length === 0) {
      return res.status(400).json({ error: 'Thiếu từ khóa tìm kiếm (q)' });
    }

    const query = q.trim();
    const results = {};

    // Search venues
    if (type === 'all' || type === 'venues') {
      results.venues = await prisma.venue.findMany({
        where: {
          OR: [
            { name: { contains: query } },
            { description: { contains: query } },
            { category: { contains: query } },
            { tags: { contains: query } },
            { district: { contains: query } },
          ],
        },
        orderBy: { rating: 'desc' },
        take: 10,
      });
    }

    // Search events
    if (type === 'all' || type === 'events') {
      results.events = await prisma.event.findMany({
        where: {
          OR: [
            { title: { contains: query } },
            { description: { contains: query } },
            { category: { contains: query } },
            { tags: { contains: query } },
            { venueName: { contains: query } },
          ],
        },
        orderBy: { date: 'desc' },
        take: 10,
      });
    }

    // Search users (public profile info only)
    if (type === 'all' || type === 'users') {
      results.users = await prisma.user.findMany({
        where: {
          role: 'user',
          OR: [
            { name: { contains: query } },
            { bio: { contains: query } },
            { location: { contains: query } },
          ],
        },
        select: {
          id: true,
          name: true,
          avatar: true,
          bio: true,
          location: true,
          age: true,
          gender: true,
        },
        take: 10,
      });
    }

    // Search movies
    if (type === 'all' || type === 'movies') {
      results.movies = await prisma.movie.findMany({
        where: {
          OR: [
            { title: { contains: query } },
            { description: { contains: query } },
            { genre: { contains: query } },
            { director: { contains: query } },
            { tags: { contains: query } },
          ],
        },
        orderBy: { rating: 'desc' },
        take: 10,
      });
    }

    res.json(results);
  } catch (err) {
    console.error('Error performing search:', err);
    res.status(500).json({ error: 'Lỗi tìm kiếm' });
  }
});

export default router;
