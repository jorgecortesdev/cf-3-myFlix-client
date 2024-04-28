import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import { MovieCard } from '../Cards/MovieCard/MovieCard';
import { MoviesFilter } from '../MoviesFilter';

import { setMovies } from '../../state/movies/moviesSlice';

export const MoviesList = () => {
  const movies = useSelector((state) => state.movies.list);
  const { token } = useSelector((state) => state.user);
  const filter = useSelector((state) => state.movies.filter)
    .trim()
    .toLowerCase();

  const filteredMovies = movies.filter((movie) => movie.Title.toLowerCase().includes(filter));

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      return;
    }

    const { MYFLIX_API: myflixApi } = process.env;

    fetch(`${myflixApi}/movies`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then(({ data }) => {
        // Please review the response format of the API here
        // https://cf-2-movie-api.onrender.com/docs/#/Movie/get_movies
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            ImagePath: movie.ImagePath,
            Featured: movie.Featured,
            ReleaseYear: movie.ReleaseYear,
            MPA: movie.MPA,
            IMDb: movie.IMDb,
            Genre: movie.Genre,
            Director: movie.Director,
            Actors: movie.Actors,
            Runtime: movie.Runtime,
          };
        });

        dispatch(setMovies(moviesFromApi));
      });
  }, [token]);

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
            <Col className="mb-5" key={movie.id} md={3}>
              <MovieCard movie={movie} />
            </Col>
          ))
        )}
      </Row>
    </>
  );
};
