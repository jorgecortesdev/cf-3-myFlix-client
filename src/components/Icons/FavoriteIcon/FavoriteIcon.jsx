import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../../state/user/userSlice';
import { toast } from 'react-toastify';
import { moviePropTypes } from '../../../propTypes';
import { useToggleFavoriteMovieMutation } from '../../../services/myFlixApi';

export const FavoriteIcon = ({ movie, className = '' }) => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const isFavorite = user.FavoriteMovies.includes(movie._id);

  const [toggle] = useToggleFavoriteMovieMutation();

  const toggleMovie = async (user, movie, method) => {
    try {
      const response = await toggle({ email: user.Email, movie: movie._id, method });

      if (response?.data?.success) {
        const updatedUser = response.data.data;
        dispatch(setUser(updatedUser));
        toast.success(isFavorite ? 'Movie removed' : 'Movie added');
      } else {
        toast.error(`${response.error.message}`);
      }
    } catch (error) {
      toast.error('Something went wrong!');
      console.log(error);
    }
  };

  return (
    <>
      {isFavorite ? (
        <Button variant="link" className={`p-0 z-1 ${className}`} onClick={() => toggleMovie(user, movie, 'DELETE')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            className="bi bi-heart-fill"
            viewBox="0 0 16 16"
          >
            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
          </svg>
        </Button>
      ) : (
        <Button variant="link" className={`p-0 z-1 ${className}`} onClick={() => toggleMovie(user, movie, 'POST')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            className="bi bi-heart"
            viewBox="0 0 16 16"
          >
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
          </svg>
        </Button>
      )}
    </>
  );
};

FavoriteIcon.propTypes = {
  movie: moviePropTypes.isRequired,
  className: PropTypes.string,
};
