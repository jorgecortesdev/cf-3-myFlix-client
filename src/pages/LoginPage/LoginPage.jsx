import React, { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { Navigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../services/myFlixApi';
import { setUser, setToken } from '../../state/user/userSlice';
import { PasswordInput } from '../../components/PasswordInput/PasswordInput';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [formState, setFormState] = useState({
    Email: '',
    Password: '',
  });

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login(formState);

      if (response?.data?.success) {
        const { user, token } = response.data.data;
        dispatch(setUser(user));
        dispatch(setToken(token));
        toast.success(`Welcome back, ${user.Name}`);
      } else {
        toast.error(response.error.data.error.message);
      }
    } catch (error) {
      toast.error('Something went wrong!');
      console.log(error);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100">
      <div className="d-flex flex-column col-md-4">
        <Form className="d-flex flex-column" onSubmit={handleSubmit}>
          <div className="d-flex justify-content-center mb-5">
            <h1 className="display-3 fw-semibold">
              <small className="lead text-body-secondary d-block">Welcome to</small>
              myFlix
            </h1>
          </div>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Control type="text" name="Email" onChange={handleChange} placeholder="Email" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <PasswordInput name="Password" onChange={handleChange} />
          </Form.Group>

          <Button className="mb-3 align-self-end" variant="primary" type="submit" disabled={isLoading}>
            {isLoading && (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-1" />
            )}
            Login
          </Button>
        </Form>

        <Link className="align-self-end" to="/signup">
          <Button variant="link" className="p-0">
            Don&apos;t have an account?
          </Button>
        </Link>
      </div>
    </div>
  );
};
