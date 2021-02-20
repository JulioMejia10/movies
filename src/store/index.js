import { createStore } from 'redux';
import { movies } from './../reducers/movies';

const initialState = { movies: 'movies' };

export const store = createStore(movies, initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__());