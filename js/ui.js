export function createMovieCard(movie) {
	const card = document.createElement('div');
	card.classList.add('movie-card');
  
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
	card.appendChild(link);
  
	return card;
  }