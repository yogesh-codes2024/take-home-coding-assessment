import { getMovies, getMovieCredits } from '../utils/apiClient';

interface Movie {
  title: string;
  release_date: string;
  vote_average: number;
  editors?: string[];
}

export const getMoviesByYear = async (year: string, page: number): Promise<Movie[]> => {
  try {
    const movies = await getMovies(year, page);
    const movieList: Movie[] = [];

    for (const movie of movies) {
      const credits = await getMovieCredits(movie.id);
      const editors = credits.crew
        .filter((person: any) => person.known_for_department === 'Editing')
        .map((editor: any) => editor.name);

      movieList.push({
        title: movie.title,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        editors: editors.length ? editors : undefined,
      });
    }
    return movieList;
  } catch (error) {
    console.error('Error fetching movies by year:', error);
    throw error;
  }
};
