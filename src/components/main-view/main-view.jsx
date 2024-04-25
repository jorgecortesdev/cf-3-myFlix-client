import React, { useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { FooterBar } from "../footer-bar/footer-bar";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../state/movies/moviesSlice";
import { MainMoviesList } from "../main-movies-list/main-movies-list";

export const MainView = () => {
  const movies = useSelector(state => state.movies.list);
  const { user, token } = useSelector(state => state.user);

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
        const moviesFromApi = data.map(movie => {
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
          }
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
                    <SignupView />
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
                      <LoginView />
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
                  <ProfileView />
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
                      <MovieView />
                    </Col>
                  </Row>
                </Container>
              )}
            </>
          }
        />

        <Route
          path="/"
          element={
            <>
              {!user ? <Navigate to="/login" replace /> : <MainMoviesList />}
            </>
          }
        />
      </Routes>

      <FooterBar />
    </BrowserRouter>
  );
};
