import React from "react";
import { Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const MovieList = ({ title, description = "Empty List", movies, token, user, syncUser }) => {
  return (
    <Row>
      <Col md={12}>
        <h3 className="mb-4">{ title }</h3>
        <Row>
          {movies.length !== 0 ? (
            movies.map(movie => (
              <Col className="mb-5" key={movie.id} md={3}>
                <MovieCard movie={movie} token={token} user={user} syncUser={syncUser} />
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
