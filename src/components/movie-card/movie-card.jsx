import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FavoriteIcon } from "../favorite-icon/favorite-icon";
import { ToWatchIcon } from "../towatch-icon/towatch-icon";
import { GenreBadge } from "../genre-badge/genre-badge";

import "./movie-card.scss";

export const MovieCard = ({ movie, token, user, syncUser }) => {

  return (
    <Card className="h-100 position-relative">
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body className="d-flex flex-column">
        <Card.Text className="d-flex justify-content-end mb-3 gap-2">
          <FavoriteIcon movie={movie} token={token} user={user} syncUser={syncUser} />
          <ToWatchIcon movie={movie} token={token} user={user} syncUser={syncUser} />
        </Card.Text>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <div className="flex-grow-1 d-flex align-items-end justify-content-between">
          <GenreBadge genre={movie.Genre} />
          <Link to={`/movies/${encodeURIComponent(movie.id)}`} className="z-0">
            <Button className="stretched-link p-0" variant="link">
              Open
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"/>
              </svg>
            </Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
  }).isRequired
};
