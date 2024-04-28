import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage, SignUpPage, MoviePage, ProfilePage } from '../../pages';
import { ProtectedRoute, MoviesList } from '../../components';
import { AppLayout } from '../../layouts';

export const HomePage = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <ProtectedRoute>
                <MoviePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MoviesList />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
