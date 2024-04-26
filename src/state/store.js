import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './movies/moviesSlice';
import userReducer from './user/userSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    user: userReducer,
  },
});
