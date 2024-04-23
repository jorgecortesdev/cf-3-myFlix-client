import React from "react";
import { Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const MovieList = ({ movies, title, description = "Empty List" }) => {
  return (
    <Row>
      <Col md={12}>
        <h3 className="mb-4">{ title }</h3>
        <Row>
          {movies.length !== 0 ? (
            movies.map(movie => (
              <Col className="mb-5" key={movie.id} md={3}>
                <MovieCard movie={movie} />
              </Col>
            ))
          ) : (
            <p>{description}</p>
          )}
        </Row>
      </Col>
    </Row>
  )
}
