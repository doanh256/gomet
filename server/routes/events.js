import { Router } from 'express';
import { prisma } from '../index.js';

const router = Router();

// GET /api/events - List events with optional filters
router.get('/', async (req, res) => {
  try {
    const { category, status, search, isHot } = req.query;
    const where = {};

    if (category) where.category = category;
    if (status) where.status = status;
    if (isHot !== undefined) where.isHot = isHot === 'true';
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { venueName: { contains: search } },
        { tags: { contains: search } },
      ];
    }

    const events = await prisma.event.findMany({
      where,
      orderBy: { date: 'asc' },
    });

    res.json(events);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// GET /api/events/:id - Single event
router.get('/:id', async (req, res) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id: req.params.id },
    });
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (err) {
    console.error('Error fetching event:', err);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

export default router;
