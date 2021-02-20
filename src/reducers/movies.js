import { SET_DATA } from '../actions';

export const movies = (state, action) => {
  switch (action.type) {
    case SET_DATA:
      return { ...state, movies: action.value }
  }
  return state
}

export const getMoviesFavoritesSelector = (store, id) => {
  return store.filter((item) => {
    return item.id === id;
  })
}

export const isFavoriteSelector = (store, id) => {
  return store.find((item) => {
    return id === item.id;
  })
}

export const getFavorite = (store) => {
  return store.find((item) => {
    return item.check === true;
  })
}