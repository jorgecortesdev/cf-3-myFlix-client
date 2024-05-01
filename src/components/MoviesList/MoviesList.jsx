import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import { MovieCard } from '../Cards/MovieCard/MovieCard';
import { MoviesFilter } from '../MoviesFilter';
import { useGetMoviesQuery } from '../../services/myFlixApi';

export const MoviesList = () => {
  const { data: movies = [] } = useGetMoviesQuery();

  const filter = useSelector((state) => state.movies.filter)
    .trim()
    .toLowerCase();

  const filteredMovies = movies.filter((movie) => movie.Title.toLowerCase().includes(filter));

  return (
    <>
      <Row className="pt-5 pb-2 d-flex justify-content-center">
        <Col md={4}>
          <MoviesFilter />
        </Col>
      </Row>
      <Row className="pt-5 pb-2">
        {filteredMovies.length === 0 ? (
          <Col>The list is empty!</Col>
        ) : (
          filteredMovies.map((movie) => (
            <Col className="mb-5" key={movie._id} md={3}>
              <MovieCard movie={movie} />
            </Col>
          ))
        )}
      </Row>
    </>
  );
};
