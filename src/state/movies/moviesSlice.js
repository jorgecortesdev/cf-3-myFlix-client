import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      return action.payload;
    }
  }
});

export const { setMovies } = moviesSlice.actions;

export default moviesSlice.reducer;

export const selectAllMovies = state => state.movies;
