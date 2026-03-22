import { Router } from 'express';
import { prisma } from '../index.js';

const router = Router();

// GET /api/movies - List movies with optional filters
router.get('/', async (req, res) => {
  try {
    const { genre, isShowing, search, cinema } = req.query;
    const where = {};

    if (genre) where.genre = genre;
    if (isShowing !== undefined) where.isShowing = isShowing === 'true';
    if (cinema) where.cinema = { contains: cinema };
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { director: { contains: search } },
        { tags: { contains: search } },
      ];
    }

    const movies = await prisma.movie.findMany({
      where,
      orderBy: { rating: 'desc' },
    });

    res.json(movies);
  } catch (err) {
    console.error('Error fetching movies:', err);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

// GET /api/movies/:id - Single movie
router.get('/:id', async (req, res) => {
  try {
    const movie = await prisma.movie.findUnique({
      where: { id: req.params.id },
    });
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    console.error('Error fetching movie:', err);
    res.status(500).json({ error: 'Failed to fetch movie' });
  }
});

export default router;
