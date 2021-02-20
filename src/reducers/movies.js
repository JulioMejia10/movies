import { SET_DATA } from '../actions';

export const movies = (state, action) => {
  switch (action.type) {
    case SET_DATA:
      return { ...state, movies: action.value }
  }
  return state
}