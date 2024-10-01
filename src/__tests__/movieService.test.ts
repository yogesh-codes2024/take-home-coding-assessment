import { getMoviesByYear } from '../services/movieService';
import * as apiClient from '../utils/apiClient'; 

describe('Movie Service', () => {

  //test1 - Fetching movies for a specific year
  it('should return a list of movies for a given year', async () => {
    const movies = await getMoviesByYear('2019', 1);
    expect(movies.length).toBeGreaterThan(0);
    expect(movies[0]).toHaveProperty('title');
    expect(movies[0]).toHaveProperty('release_date');
  });

  //test2 - Handling API Error here
  it('should handle errors when the movie API fails', async () => {
    // Simulating a failure from the movie API
    jest.spyOn(apiClient, 'getMovies').mockRejectedValueOnce(new Error('API Failure'));
    await expect(getMoviesByYear('2019', 1)).rejects.toThrow('API Failure');
  });

  //test3 - Handling case where no movies are found
  it('should return an empty list if no movies are found', async () => {
    // Simulating no movies found
    jest.spyOn(apiClient, 'getMovies').mockResolvedValueOnce([]);
    const movies = await getMoviesByYear('2025', 1);
    expect(movies.length).toBe(0);
  });

  //test4 - Filtering movie credits for editors
  it('should correctly filter editors from the movie credits', async () => {
    // Simulating movie credits with editors
    const mockCredits = {
      crew: [
        { name: 'John Editor', known_for_department: 'Editing' },
        { name: 'Jane Sound', known_for_department: 'Sound' }
      ]
    };
    jest.spyOn(apiClient, 'getMovieCredits').mockResolvedValueOnce(mockCredits);

    const movies = await getMoviesByYear('2020', 1);
    expect(movies[0].editors).toContain('John Editor');
    expect(movies[0].editors).not.toContain('Jane Sound');
  });

  //test5 - Handling cases where no editors are found
  it('should return movies without editors if no editors are found', async () => {
    // Simulating movie credits with no editors
    const mockCredits = { crew: [] };
    jest.spyOn(apiClient, 'getMovieCredits').mockResolvedValueOnce(mockCredits);

    const movies = await getMoviesByYear('2020', 1);
    expect(movies[0].editors).toBeUndefined();
  });
});

