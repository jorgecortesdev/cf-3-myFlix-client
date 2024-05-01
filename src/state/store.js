import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './movies/moviesSlice';
import userReducer from './user/userSlice';
import { myFlixApi } from '../services/myFlixApi';

export const store = configureStore({
  reducer: {
    [myFlixApi.reducerPath]: myFlixApi.reducer,
    movies: moviesReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(myFlixApi.middleware),
});
