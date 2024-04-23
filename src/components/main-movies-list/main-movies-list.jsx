import React from "react";
import { useSelector } from "react-redux";
import { MovieCard } from "../movie-card/movie-card";
import { MoviesFilter } from "../movies-filter/movies-filter";
import { Container, Row, Col } from "react-bootstrap";

export const MainMoviesList = () => {
  const movies = useSelector(state => state.movies.list);
  const filter = useSelector(state => state.movies.filter).trim().toLowerCase();

  const filteredMovies = movies.filter(movie => movie.Title.toLowerCase().includes(filter));

  return (
    <Container className="flex-grow-1">
      <Row className="pt-5 pb-2 d-flex justify-content-center">
        <Col md={4}>
          <MoviesFilter />
        </Col>
      </Row>
      <Row className="pt-5 pb-2">
        {filteredMovies.length === 0 ? (
          <Col>The list is empty!</Col>
        ) : (
          filteredMovies.map(movie => (
            <Col className="mb-5" key={movie.id} md={3}>
              <MovieCard movie={movie} />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};
