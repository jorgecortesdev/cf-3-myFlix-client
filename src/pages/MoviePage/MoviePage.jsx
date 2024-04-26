import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Row, Col, Button, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

import { FavoriteIcon } from "../../components/Icons/FavoriteIcon/FavoriteIcon";
import { RatingIcon } from "../../components/Icons/RatingIcon/RatingIcon";
import { PopularityIcon } from "../../components/Icons/PopularityIcon/PopularityIcon";
import { ToWatchIcon } from "../../components/Icons/ToWatchIcon/ToWatchIcon";
import { MoviesSlider } from "../../components/MoviesSlider/MoviesSlider";
import { GenreBadge } from "../../components/Badges/GenreBadge/GenreBadge";
import { DirectorLink } from "../../components/Links/DirectorLink/DirectorLink";
import { ActorLink } from "../../components/Links/ActorLink/ActorLink";

export const MoviePage = () => {
  const { movieId } = useParams();

  const movies = useSelector(state => state.movies.list);

  const movie = movies.find(movie => movie.id === movieId);

  // Bonus Task 2: Similar Movies
  const similarMovies = movies.filter(currentMovie => {
    const isSimilarMovie = movie.Genre.Name === currentMovie.Genre.Name;
    const isNotTheSelectedMovie = movie.id !== currentMovie.id;
    return isNotTheSelectedMovie && isSimilarMovie;
  });

  return (
    <>
      <Row className="mb-5">
        <Col md={6} className="d-flex flex-column">
          <div>
            <h1 className="mb-0">{movie.Title}</h1>
            <div className="d-flex justify-content-between align-items-end">
              <div className="d-flex gap-2 align-items-center">
                <span className="fs-6 text-body-secondary">{movie.ReleaseYear}</span>&bull;
                <span className="fs-6 text-body-secondary">{movie.MPA}</span>
              </div>
              <GenreBadge genre={movie.Genre} />
            </div>
          </div>

          <p className="mt-4">{movie.Description}</p>

          <ListGroup variant="flush" className="mt-2 mb-5">
            <ListGroup.Item className="border-top px-0">
              <strong>Director</strong>
              <DirectorLink director={movie.Director} />
            </ListGroup.Item>
            <ListGroup.Item className="border-bottom px-0">
              <strong>Actors</strong>
              <ul className="ms-3 d-inline-flex dot-decorator">
                {movie.Actors.map(actor => (
                  <li key={actor.Name}>
                    <ActorLink actor={actor} />
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
                    <RatingIcon />
                  </div>
                  <div className="fs-5 fw-semibold">{movie.IMDb}<small className="fw-normal fs-7 text-secondary"> / 10</small></div>
                </div>
              </div>

              <div className="d-flex flex-column align-items-center bg-body-secondary px-3 py-1 rounded-2">
                <small className="text-body-secondary fw-bold">POPULARITY</small>
                <div className="d-flex align-items-center gap-2">
                  <div className="text-success d-flex align-items-center">
                    <PopularityIcon />
                  </div>
                  {/* placeholder: it will count how many times this movie has been favored */}
                  {/* it needs to be implemented in the API */}
                  <div className="fs-5 fw-semibold">10</div>
                </div>
              </div>
              <div className="flex-grow-1 d-flex justify-content-end align-self-end">
                <Link to={`/`}>
                  <Button variant="primary">Back</Button>
                </Link>
              </div>
            </div>
          </div>
        </Col>

        <Col md={6}>
          <div className="d-flex justify-content-center bg-dark rounded-3 py-3 position-relative">
            <img src={movie.ImagePath} />
            <div className="position-absolute top-0 end-0 m-3 d-flex gap-2">
              <FavoriteIcon className="text-danger" movie={movie} />
              <ToWatchIcon className="text-primary" movie={movie} />
            </div>
          </div>
        </Col>
      </Row>

      <MoviesSlider movies={similarMovies} title={"Similar Movies"} description={"No similar movies found!"} />
    </>
  );
};
