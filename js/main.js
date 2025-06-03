import { fetchPopularMovies, searchMovies } from './api.js';
import { createMovieCard } from './ui.js';

const movieList = document.getElementById('movie-list');
const searchInput = document.getElementById('searchInput');

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

// Initial load of popular movies
loadPopularMovies();