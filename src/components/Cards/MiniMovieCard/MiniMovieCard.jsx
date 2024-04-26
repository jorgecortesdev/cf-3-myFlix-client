import React from "react";
import { Link } from "react-router-dom";
import { FavoriteIcon } from "../../Icons/FavoriteIcon/FavoriteIcon";
import { ToWatchIcon } from "../../Icons/ToWatchIcon/ToWatchIcon";

import "./MiniMovieCard.scss";

// TODO: add the movie length to the API and implement it here.
export const MiniMovieCard = ({ movie }) => {
  return (
    <div className="movie-information">
      <div className="movie-poster">
        <img
          className="movie-poster__img"
          src={movie.ImagePath}
        />
        <div className="movie-poster__overlay z-1">
          <div className="position-absolute top-0 end-0 z-2 mt-2 me-3 d-flex gap-2">
            <FavoriteIcon className="text-white" movie={movie} />
            <ToWatchIcon className="text-white" movie={movie} />
          </div>

          <div className="movie-details">
            <p>
              <Link to={`/movies/${encodeURIComponent(movie.id)}`} className="z-0 stretched-link">{movie.Title}</Link>
            </p>
            <div>
              <span className="movie-details__rating">{movie.MPA}</span>
              <ul className="movie-details__list">
                <li>1h 56m</li>
                <li>{movie.ReleaseYear}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <p className="movie-title">{movie.Title}</p>
    </div>
  );
};
