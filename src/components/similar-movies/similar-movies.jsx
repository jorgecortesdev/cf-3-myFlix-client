import React from "react";
import PropTypes from "prop-types";
import { MovieCard } from "../movie-card/movie-card";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router";

export const SimilarMovies = ({ movies, token, user, syncUser }) => {
  const { movieId } = useParams();

  const currentMovie = movies.find(movie => movie.id === movieId);

  // Bonus Task 2: Similar Movies
  const similarMovies = movies.filter(movie => {
    const isSimilarMovie = movie.Genre.Name === currentMovie.Genre.Name;
    const isNotTheSelectedMovie = movie.id !== currentMovie.id;
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
                <MovieCard movie={movie} token={token} user={user} syncUser={syncUser} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </>
  );
};

SimilarMovies.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
      ReleaseYear: PropTypes.number,
      MPA: PropTypes.string,
      IMDb: PropTypes.number,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
      }).isRequired,
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string,
        Death: PropTypes.string,
      }),
      Actors: PropTypes.arrayOf(
        PropTypes.shape({
          Name: PropTypes.string.isRequired,
          Bio: PropTypes.string.isRequired,
          Birthday: PropTypes.string,
          ImagePath: PropTypes.string.isRequired
        })
      )
    })
  ).isRequired
};
