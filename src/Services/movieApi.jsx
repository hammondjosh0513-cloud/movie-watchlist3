import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export const getPopularMovies = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );

    return response.data.results;
  } catch (error) {
    console.log("Error fetching movies:", error);

    return [];
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
    );

    return response.data.results;
  } catch (error) {
    console.log("Search error:", error);

    return [];
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
    );

    return response.data;
  } catch (error) {
    console.log("Movie details error:", error);

    return null;
  }
};

export const getSimilarMovies = async (id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`
    );

    return response.data.results;
  } catch (error) {
    console.log(
      "Similar movies error:",
      error
    );

    return [];
  }
};