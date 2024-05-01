import { PropTypes } from 'prop-types';

export const genrePropTypes = PropTypes.shape({
  Name: PropTypes.string.isRequired,
  Description: PropTypes.string.isRequired,
});

export const directorPropTypes = PropTypes.shape({
  Name: PropTypes.string.isRequired,
  Bio: PropTypes.string.isRequired,
  Birth: PropTypes.string,
  Death: PropTypes.string,
});

export const actorPropTypes = PropTypes.shape({
  Name: PropTypes.string.isRequired,
  Bio: PropTypes.string.isRequired,
  Birthday: PropTypes.string,
  ImagePath: PropTypes.string.isRequired,
});

export const moviePropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  Title: PropTypes.string.isRequired,
  Description: PropTypes.string.isRequired,
  ImagePath: PropTypes.string.isRequired,
  ReleaseYear: PropTypes.number,
  MPA: PropTypes.string,
  IMDb: PropTypes.number,
  Genre: genrePropTypes.isRequired,
  Director: directorPropTypes.isRequired,
  Actors: PropTypes.arrayOf(actorPropTypes),
  Runtime: PropTypes.number.isRequired,
});
