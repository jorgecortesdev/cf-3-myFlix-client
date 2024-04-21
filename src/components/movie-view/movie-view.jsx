import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Button, ListGroup, Nav } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
  // temporary randomize which movies are favorite
  const isFavorite = Boolean(Math.round(Math.random()));

  const actors = movie.Actors.map(actor => actor.Name).join(', ');

  return (
    <Row>
      <Col md={6} className="d-flex flex-column">
        <div>
          <h1 className="mb-0">{movie.Title}</h1>
          <div className="d-flex justify-content-between align-items-end">
            <div className="d-flex gap-2 align-items-center">
              <span className="fs-6 text-body-secondary">{movie.ReleaseYear}</span>&bull;
              <span className="fs-6 text-body-secondary">{movie.MPA}</span>
            </div>
            <small className="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-4">{movie.Genre.Name}</small>
          </div>
        </div>

        <p className="mt-4">{movie.Description}</p>

        <ListGroup variant="flush" className="mt-2 mb-5">
          <ListGroup.Item className="border-top px-0">
            <strong>Director</strong>
            <span className="ms-3">{movie.Director.Name}</span>
          </ListGroup.Item>
          <ListGroup.Item className="border-bottom px-0">
            <strong>Actors</strong>
            <ul className="ms-3 d-inline-flex dot-decorator">
              {movie.Actors.map(actor => (
                <li key={actor.Name}>
                  <a className="px-2" href="#">{actor.Name}</a>
                </li>
              ))}
            </ul>
          </ListGroup.Item>
        </ListGroup>

        <div className="flex-grow-1 d-flex align-items-end">
          <div className="d-flex w-100 gap-3">
            <div className="d-flex flex-column align-items-center bg-body-secondary px-3 py-1 rounded-2">
              <small className="text-body-secondary fw-bold">IMDb RATING</small>
              <div className="d-flex align-items-center gap-2">
                <div className="text-warning d-flex align-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                  </svg>
                </div>
                <div className="fs-5 fw-semibold">{movie.IMDb}<small className="fw-normal fs-7 text-secondary"> / 10</small></div>
              </div>
            </div>

            <div className="d-flex flex-column align-items-center bg-body-secondary px-3 py-1 rounded-2">
              <small className="text-body-secondary fw-bold">POPULARITY</small>
              <div className="d-flex align-items-center gap-2">
                <div className="text-success d-flex align-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-graph-up-arrow" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5"/>
                  </svg>
                </div>
                {/* placeholder: it will count how many times this movie has been favored */}
                <div className="fs-5 fw-semibold">10</div>
              </div>
            </div>
            <div className="flex-grow-1 d-flex justify-content-end align-self-end">
              <Button variant="primary" onClick={onBackClick}>Back</Button>
            </div>
          </div>
        </div>
      </Col>

      <Col md={6}>
        <div className="d-flex justify-content-center bg-dark rounded-3 py-3 position-relative">
          <img src={movie.ImagePath} />
          <div className="position-absolute top-0 end-0 text-danger p-3">
            {isFavorite ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
              </svg>
            )}
          </div>
        </div>
      </Col>
    </Row>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
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
    Actors: PropTypes.arrayOf(PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birthday: PropTypes.string,
      ImagePath: PropTypes.string.isRequired
    }))
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};
