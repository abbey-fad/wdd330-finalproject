import { fetchPopularMovies, searchMovies, fetchGenres } from './api.js';
import { createMovieCard } from './ui.js';

const movieList = document.getElementById('movie-list');
const searchInput = document.getElementById('searchInput');
const genreFilter = document.getElementById('genreFilter');

const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Function to load and display popular movies
async function loadPopularMovies() {
  try {
    const movies = await fetchPopularMovies();
    movieList.innerHTML = '';
    movies.forEach(movie => {
      const card = createMovieCard(movie);
      movieList.appendChild(card);
    });
  } catch (error) {
    movieList.innerHTML = '<p class="error">Failed to load movies. Please try again later.</p>';
    console.error('Error loading popular movies:', error);
  }
}

// Load and populate genres in the dropdown
async function loadGenres() {
  try {
    const genres = await fetchGenres();
    genres.forEach(genre => {
      const option = document.createElement('option');
      option.value = genre.id;
      option.textContent = genre.name;
      genreFilter.appendChild(option);
    });
  } catch (error) {
    console.error('Failed to load genres:', error);
  }
}

// Filter movies by selected genre
genreFilter.addEventListener('change', async () => {
  const selectedGenre = genreFilter.value;

  if (selectedGenre === '') {
    loadPopularMovies(); // Show all movies if no genre selected
    return;
  }

  try {
    const allMovies = await fetchPopularMovies();
    const filtered = allMovies.filter(movie =>
      movie.genre_ids.includes(parseInt(selectedGenre))
    );

    movieList.innerHTML = '';
    filtered.forEach(movie => {
      const card = createMovieCard(movie);
      movieList.appendChild(card);
    });
  } catch (error) {
    movieList.innerHTML = '<p class="error">Genre filter failed. Try again later.</p>';
    console.error('Genre filter error:', error);
  }
});

// Handle search input
searchInput.addEventListener('input', async (e) => {
  const query = e.target.value.trim();

  if (query.length > 2) {
    try {
      const results = await searchMovies(query);
      movieList.innerHTML = '';
      results.forEach(movie => {
        const card = createMovieCard(movie);
        movieList.appendChild(card);
      });
    } catch (error) {
      movieList.innerHTML = '<p class="error">Search failed. Please try again later.</p>';
      console.error('Search error:', error);
    }
  } else {
    loadPopularMovies(); // Reset to popular movies when input is short
  }
});

// Initial load
loadGenres();
loadPopularMovies();