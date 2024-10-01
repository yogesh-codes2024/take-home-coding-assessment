import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';

export const getMovies = async (year: string, page: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: process.env.API_KEY,
        language: 'en-US',
        primary_release_year: year,
        sort_by: 'popularity.desc',
        page: page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const getMovieCredits = async (movieId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
      params: {
        api_key: process.env.API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie credits:', error);
    throw error;
  }
};
