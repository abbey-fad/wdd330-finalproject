import { getMovieDetails } from './api.js';

const favoritesContainer = document.getElementById('favorites-container');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

// Hamburger toggle
menuToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('active');
});

// Get favorites from localStorage
function getFavoriteIds() {
  const stored = JSON.parse(localStorage.getItem('favorites')) || [];
  return stored.map(id => Number(id));

}

// Save updated favorites
function saveFavoriteIds(ids) {
  localStorage.setItem('favorites', JSON.stringify(ids));
}

// Create card using DOM elements
function createMovieCard(movie) {
  const card = document.createElement('div');
  card.classList.add('movie-card');
  card.dataset.id = movie.id;

  // Link wrapper
  const link = document.createElement('a');
  link.href = `detail.html?id=${movie.id}`;

  const img = document.createElement('img');
  img.src = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'images/placeholder.jpg';
  img.alt = movie.title;

  const title = document.createElement('h3');
  title.textContent = movie.title;

  const year = document.createElement('p');
  year.textContent = movie.release_date
    ? movie.release_date.slice(0, 4)
    : 'N/A';

  link.appendChild(img);
  link.appendChild(title);
  link.appendChild(year);

  // Remove button
  const button = document.createElement('button');
  button.classList.add('remove-favorite');
  button.textContent = '🗑 Remove from Favorites';

  // Confirmation before removing, then update storage and UI
  button.addEventListener('click', (e) => {
    e.preventDefault(); // prevent navigating link

    if (confirm(`Are you sure you want to remove "${movie.title}" from your favorites?`)) {
      const id = parseInt(card.dataset.id);
      const currentFavorites = getFavoriteIds();
      const updatedFavorites = currentFavorites.filter(favId => favId !== id);
      saveFavoriteIds(updatedFavorites);
      card.remove(); // remove from DOM
      alert(`"${movie.title}" has been removed from your favorites.`);
    }
  console.log('Before removal:', currentFavorites);
  console.log('Removing ID:', id);
  console.log('After removal:', updatedFavorites);

  });

  card.appendChild(link);
  card.appendChild(button);
  return card;
}

// Load and display favorites
async function loadFavorites() {
  favoritesContainer.innerHTML = ''; // Clear container

  const favoriteIds = getFavoriteIds();
  if (favoriteIds.length === 0) {
    favoritesContainer.innerHTML = `<p>No favorites yet. Add some from the detail page!</p>`;
    return;
  }

  try {
    const moviePromises = favoriteIds.map(id => getMovieDetails(id));
    const movies = await Promise.all(moviePromises);

    movies.forEach(movie => {
      const card = createMovieCard(movie);
      favoritesContainer.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    favoritesContainer.innerHTML = `<p class="error">Error loading favorites.</p>`;
  }
}

// Initial load
loadFavorites();