import { getMovieDetails } from './api.js';
import { fetchMovieDetails } from './omdb.js';

// Get movie ID from the URL
const params = new URLSearchParams(window.location.search);
const movieId = params.get('id');

const poster = document.getElementById('movie-poster');
const title = document.getElementById('movie-title');
const year = document.getElementById('movie-year');
const synopsis = document.getElementById('movie-synopsis');
const castList = document.getElementById('movie-cast');
const trailerButton = document.getElementById('watch-trailer');
const favButton = document.getElementById('add-to-favorites');
const ratingList = document.getElementById('movie-ratings'); // ✅ Add this

const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('active');
});

let currentMovie = null;

async function loadMovieDetail() {
  try {
    const movie = await getMovieDetails(movieId);
    currentMovie = movie;

    // Set poster, title, year, synopsis
    poster.src = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : 'images/placeholder.jpg';
    title.textContent = movie.title;
    year.textContent = movie.release_date ? movie.release_date.slice(0, 4) : 'N/A';
    synopsis.textContent = movie.overview;
    
    const omdbData = await fetchMovieDetails(movie.title);
    const omdbRatings = omdbData?.Ratings || [];
    ratingList.innerHTML = omdbRatings.length > 0
        ? omdbRatings.map(r => `<li>${r.Source}: ${r.Value}</li>`).join('')
        : '<li>No ratings found from OMDb</li>';
    
    // Display top 5 cast
    const cast = movie.credits?.cast?.slice(0, 5) || [];
    castList.innerHTML = cast.map(actor => `<li>${actor.name} as ${actor.character}</li>`).join('');

    // Handle trailer link
    const trailer = movie.videos?.results?.find(video => video.type === 'Trailer' && video.site === 'YouTube');
    if (trailer) {
      trailerButton.onclick = () => {
        window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
      };
    } else {
      trailerButton.disabled = true;
      trailerButton.textContent = 'Trailer Unavailable';
    }

    // Check if already in favorites
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.includes(movieId)) {
      favButton.textContent = '★ Already in Favorites';
      favButton.disabled = true;
    }

  } catch (error) {
    console.error('Failed to load movie details:', error);
    document.getElementById('movie-detail').innerHTML = `<p class="error">Could not load movie details. Please try again.</p>`;
  }
}

// Add to Favorites handler
favButton.addEventListener('click', () => {
  if (!currentMovie) return;

  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (!favorites.includes(movieId)) {
    favorites.push(movieId);
    localStorage.setItem('favorites', JSON.stringify(favorites));

    favButton.textContent = '★ Added to Favorites';
    favButton.disabled = true;

    // Show confirmation alert
    alert(`"${currentMovie.title}" has been added to your favorites.`);
  } else {
    alert(`"${currentMovie.title}" is already in your favorites.`);
  }
});

// Load the movie on page load
loadMovieDetail();