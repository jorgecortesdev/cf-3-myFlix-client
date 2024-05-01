import React, { useState } from 'react';
import { Row, Col, Button, Form, Spinner } from 'react-bootstrap';
import { MoviesSlider } from '../../components/MoviesSlider';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../state/user/userSlice';
import { useGetMoviesQuery, useUpdateAccountMutation } from '../../services/myFlixApi';
import { toast } from 'react-toastify';
import { formattedDate, removeNullOrUndefined } from '../../utils/utils';
import { RemoveAccountLink } from '../../components/Links';

export const ProfilePage = () => {
  const { user } = useSelector((state) => state.user);

  const [updateAccount, { isLoading }] = useUpdateAccountMutation();
  const [formState, setFormState] = useState({
    Name: user.Name,
    Password: null,
    Birthday: user.Birthday,
  });
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    let data = { ...formState };
    removeNullOrUndefined(data);

    try {
      const response = await updateAccount({ email: user.Email, form: data });
      if (response?.data?.success) {
        dispatch(setUser({ ...user, ...response.data.data }));
        setErrors([]);
        toast.success('Update successful');
      } else {
        const errors = response.error.message;
        if (Array.isArray(errors)) {
          setErrors(errors.reduce((acc, cur) => ({ ...acc, [cur.path]: cur.msg }), {}));
        } else {
          toast.error(errors);
        }
      }
    } catch (error) {
      toast.error('Something went wrong!');
      console.log(error);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const { data: movies = [] } = useGetMoviesQuery();
  const favoriteMovies = movies.filter((movie) => user.FavoriteMovies.includes(movie._id));
  const toWatchMovies = movies.filter((movie) => user.ToWatch.includes(movie._id));

  return (
    <>
      <Row className="mb-5 pt-5 pb-2">
        <Col md={4}>
          <h3 className="mb-4">Account Information</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Control type="email" placeholder="Email" defaultValue={user.Email} disabled />
              <Form.Text id="passwordHelpBlock" muted>
                * You can&apos;t change your email.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Control type="password" name="Password" placeholder="Password" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formName">
              <Form.Control
                type="text"
                name="Name"
                value={formState.Name}
                placeholder="Name"
                onChange={handleChange}
                isInvalid={!!errors.Name}
                required
                minLength={5}
              />
              <Form.Control.Feedback type="invalid">{errors.Name}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBirthday">
              <Form.Control
                type="date"
                name="Birthday"
                value={formattedDate(formState.Birthday)}
                placeholder="Birthday"
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex flex-column align-items-end">
              <Button variant="primary" type="submit" disabled={isLoading}>
                {isLoading && (
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-1" />
                )}
                Update
              </Button>
            </div>
          </Form>
          <div className="d-flex justify-content-end">
            <RemoveAccountLink />
          </div>
        </Col>
      </Row>

      <MoviesSlider movies={favoriteMovies} title={'Favorites'} />

      <MoviesSlider movies={toWatchMovies} title={'To Watch'} />
    </>
  );
};
