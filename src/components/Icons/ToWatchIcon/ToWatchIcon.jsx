import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../../state/user/userSlice';

import { moviePropTypes } from '../../../propTypes';

export const ToWatchIcon = ({ movie, className = '' }) => {
  const { user, token } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const isAdded = user.ToWatch.includes(movie.id);

  const toggleMovie = (user, movie, method) => {
    const { MYFLIX_API: myflixApi } = process.env;

    fetch(`${myflixApi}/lists/${user.Email}/watch/${movie.id}`, {
      method,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const updatedUser = data.data;
          dispatch(setUser(updatedUser));
        } else {
          alert(`Operation failed: ${data.error.message}`);
        }
      })
      .catch((error) => {
        console.log(error);
        alert('Something went wrong');
      });
  };

  return (
    <>
      {isAdded ? (
        <Button variant="link" className={`p-0 z-1 ${className}`} onClick={() => toggleMovie(user, movie, 'DELETE')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            className="bi bi-bookmark-plus-fill"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5m6.5-11a.5.5 0 0 0-1 0V6H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V7H10a.5.5 0 0 0 0-1H8.5z"
            />
          </svg>
        </Button>
      ) : (
        <Button variant="link" className={`p-0 z-1 ${className}`} onClick={() => toggleMovie(user, movie, 'POST')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            className="bi bi-bookmark-plus"
            viewBox="0 0 16 16"
          >
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
            <path d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4" />
          </svg>
        </Button>
      )}
    </>
  );
};

ToWatchIcon.propTypes = {
  movie: moviePropTypes.isRequired,
  className: PropTypes.string,
};
