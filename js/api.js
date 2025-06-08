// TMDb API
const API_KEY = '5e20d0f609d8c12fbac2788b1d287e9d';
const BASE_URL = 'https://api.themoviedb.org/3';

// OMDb API
const OMDB_API_KEY = 'cf94b5d3'; // ✅ Replace with your personal OMDb API key
const OMDB_URL = 'https://www.omdbapi.com/';

// Fetch popular movies from TMDb
export async function fetchPopularMovies() {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
  const data = await response.json();
  return data.results;
}

// Search movies by keyword from TMDb
export async function searchMovies(query) {
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.results;
}

// Get detailed movie info from TMDb
export async function getMovieDetails(movieId) {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=credits,videos`);
  const data = await response.json();
  return data;
}

// ✅ NEW: Get OMDb ratings by movie title
export async function getOmdbRating(title) {
  try {
    const response = await fetch(`${OMDB_URL}?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(title)}`);
    const data = await response.json();
    return data.Ratings || [];
  } catch (error) {
    console.error('Error fetching OMDb ratings:', error);
    return [];
  }
}