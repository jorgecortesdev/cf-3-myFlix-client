import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { setFilter } from '../../state/movies/moviesSlice';

export const MoviesFilter = () => {
  const filter = useSelector((state) => state.movies.filter);
  const dispatch = useDispatch();

  return (
    <Form.Control
      type="text"
      placeholder="Search..."
      value={filter}
      onChange={(e) => dispatch(setFilter(e.target.value))}
    />
  );
};
