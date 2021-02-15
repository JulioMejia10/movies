import CONFIG from '../config/config.json';

const movies = () => {
  return new Promise((resolve) => {
    fetch(`${CONFIG.apiMovies}${CONFIG.key}`)
      .then(response => response.json())
      .then(data => {
        resolve(data);
      });
  });
}

const moviesList = () => {
  return new Promise((resolve) => {
    fetch(`${CONFIG.listMovies}${CONFIG.key}`)
      .then(response => response.json())
      .then(data => {
        resolve(data);
      });
  });
}

export { movies, moviesList };