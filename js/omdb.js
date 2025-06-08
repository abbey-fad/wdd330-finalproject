const API_KEY ='cf94b5d3'; 

// Fetch movie details by IMDb ID or by title (you can customize)
export async function fetchMovieDetails(titleOrId) {
  // You can fetch by title: &t=title  OR by IMDb ID: &i=imdbID
  // Here, assume by title for simplicity
  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(titleOrId)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.Response === "False") {
      throw new Error(data.Error);
    }
    return data;  // This includes Ratings, Title, Plot, etc.
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
}