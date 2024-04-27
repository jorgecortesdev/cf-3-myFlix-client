import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { NavigationBar, FooterBar } from '../../layouts';
import { LoginPage, SignUpPage, MoviePage, ProfilePage } from '../../pages';

import MoviesList from '../../components/MoviesList';

import { setMovies } from '../../state/movies/moviesSlice';

export const HomePage = () => {
  const movies = useSelector((state) => state.movies.list);
  const { user, token } = useSelector((state) => state.user);

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
    <BrowserRouter>
      <NavigationBar />

      <Routes>
        <Route
          path="/signup"
          element={
            <>
              {user ? (
                <Navigate to="/" />
              ) : (
                <Container className="flex-grow-1 d-flex justify-content-center align-items-center">
                  <Row className="w-100 justify-content-center">
                    <Col md={5}>
                      <SignUpPage />
                    </Col>
                  </Row>
                </Container>
              )}
            </>
          }
        />

        <Route
          path="/login"
          element={
            <>
              {user ? (
                <Navigate to="/" />
              ) : (
                <Container className="flex-grow-1 d-flex justify-content-center align-items-center">
                  <Row className="w-100 justify-content-center">
                    <Col md={5}>
                      <LoginPage />
                    </Col>
                  </Row>
                </Container>
              )}
            </>
          }
        />

        <Route
          path="/profile"
          element={
            <>
              {!user ? (
                <Navigate to="/login" />
              ) : (
                <Container className="flex-grow-1">
                  <ProfilePage />
                </Container>
              )}
            </>
          }
        />

        <Route
          path="/movies/:movieId"
          element={
            <>
              {!user ? (
                <Navigate to="/" replace />
              ) : movies.length === 0 ? (
                <Container className="flex-grow-1">
                  <Row className="pt-5 pb-2">
                    <Col>The list is empty!</Col>
                  </Row>
                </Container>
              ) : (
                <Container className="flex-grow-1">
                  <Row className="pt-5 pb-2">
                    <Col md={12}>
                      <MoviePage />
                    </Col>
                  </Row>
                </Container>
              )}
            </>
          }
        />

        <Route path="/" element={<>{!user ? <Navigate to="/login" replace /> : <MoviesList />}</>} />
      </Routes>

      <FooterBar />
    </BrowserRouter>
  );
};
