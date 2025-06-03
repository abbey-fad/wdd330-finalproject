const API_KEY = '5e20d0f609d8c12fbac2788b1d287e9d';

const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchPopularMovies() {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
  const data = await response.json();
  return data.results;
}

export async function searchMovies(query) {
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.results;
}

export async function getMovieDetails(movieId) {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=credits,videos`);
  const data = await response.json();
  return data;
}