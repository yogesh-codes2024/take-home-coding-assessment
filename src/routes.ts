import { Router } from 'express';
import { getMoviesByYear } from './services/movieService';

export const router = Router();

router.get('/movies/:year', async (req, res) => {
  console.log("Request",req.query)
  const year = req.params.year;
  const page = req.query.page || 1;
  try {
    const movies = await getMoviesByYear(year, Number(page));
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movies', error });
  }
});