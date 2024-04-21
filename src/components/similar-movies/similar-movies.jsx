import React from "react";
import PropTypes from "prop-types";
import { MovieCard } from "../movie-card/movie-card";
import { Row, Col } from "react-bootstrap";

export const SimilarMovies = ({ selectedMovie, movies, onSimilarMovieClick }) => {
  // Bonus Task 2: Similar Movies
  const similarMovies = movies.filter(movie => {
    const isSimilarMovie = movie.Genre.Name === selectedMovie.Genre.Name;
    const isNotTheSelectedMovie = movie.id !== selectedMovie.id;
    return isNotTheSelectedMovie && isSimilarMovie;
  });

  return (
    <>
      {similarMovies.length > 0 && (
        <div className="mt-5">
          <h2 className="mb-3">Similar Movies</h2>
          <Row>
            {similarMovies.map(movie => (
              <Col key={movie.id} md={3}>
                <MovieCard
                  movie={movie}
                  onMovieClick={() => onSimilarMovieClick(movie)}
                />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
