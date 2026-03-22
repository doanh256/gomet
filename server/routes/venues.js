import { Router } from 'express';
import { prisma } from '../index.js';

const router = Router();

// GET /api/venues - List venues with optional filters
router.get('/', async (req, res) => {
  try {
    const { category, district, search, city, priceRange } = req.query;
    const where = {};

    if (category) where.category = category;
    if (district) where.district = { contains: district };
    if (city) where.city = { contains: city };
    if (priceRange) where.priceRange = priceRange;
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { tags: { contains: search } },
      ];
    }

    const venues = await prisma.venue.findMany({
      where,
      orderBy: { rating: 'desc' },
    });

    res.json(venues);
  } catch (err) {
    console.error('Error fetching venues:', err);
    res.status(500).json({ error: 'Failed to fetch venues' });
  }
});

// GET /api/venues/:id - Single venue
router.get('/:id', async (req, res) => {
  try {
    const venue = await prisma.venue.findUnique({
      where: { id: req.params.id },
    });
    if (!venue) return res.status(404).json({ error: 'Venue not found' });
    res.json(venue);
  } catch (err) {
    console.error('Error fetching venue:', err);
    res.status(500).json({ error: 'Failed to fetch venue' });
  }
});

export default router;
