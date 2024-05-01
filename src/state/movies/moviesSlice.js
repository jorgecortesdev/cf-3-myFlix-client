import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filter: '',
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setFilter } = moviesSlice.actions;

export default moviesSlice.reducer;
