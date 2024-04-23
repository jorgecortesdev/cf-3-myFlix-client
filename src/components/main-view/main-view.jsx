import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { FooterBar } from "../footer-bar/footer-bar";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://cf-2-movie-api.onrender.com/movies", {
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

        setMovies(moviesFromApi);
      });
  }, [token]);

  // keep user on sync on any change
  const syncUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  }

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={onLoggedOut}
      />

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
                      <LoginView
                        onLoggedIn={(user, token) => {
                          setUser(user);
                          setToken(token);
                        }}
                        />
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
                  <ProfileView movies={movies} user={user} token={token} syncUser={syncUser} onLoggedOut={onLoggedOut} />
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
                      <MovieView movies={movies} token={token} user={user} syncUser={syncUser} />
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
              {!user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Container className="flex-grow-1">
                  <Row className="pt-5 pb-2">
                    <Col>The list is empty!</Col>
                  </Row>
                </Container>
              ) : (
                <Container className="flex-grow-1">
                  <Row className="pt-5 pb-2">
                    {movies.map((movie) => (
                      <Col className="mb-5" key={movie.id} md={3}>
                        <MovieCard movie={movie} token={token} user={user} syncUser={syncUser} />
                      </Col>
                    ))}
                  </Row>
                </Container>
              )}
            </>
          }
        />
      </Routes>

      <FooterBar
        user={user}
        onLoggedOut={onLoggedOut}
      />
    </BrowserRouter>
  );
};
