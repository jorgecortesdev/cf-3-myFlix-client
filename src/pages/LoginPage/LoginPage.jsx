import React, { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from '../../state/user/userSlice';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to
    // reload the entire page
    event.preventDefault();

    const data = {
      Email: email,
      Password: password,
    };

    setLoading(true);

    const { MYFLIX_API: myflixApi } = process.env;

    fetch(`${myflixApi}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // Please review the response format of the API here
        // https://cf-2-movie-api.onrender.com/docs/#/Auth/post_login
        if (data.success) {
          const { user, token } = data.data;
          dispatch(setUser(user));
          dispatch(setToken(token));
        } else {
          alert(`Login failed: ${data.error.message}`);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('Something went wrong');
        console.log(error);
      });
  };

  return (
    <div className="d-flex flex-column mt-n5">
      <Form className="d-flex flex-column" onSubmit={handleSubmit}>
        <div className="d-flex justify-content-center mb-5">
          <h1 className="display-3 fw-semibold">
            <small className="lead text-body-secondary d-block">Welcome to</small>
            myFlix
          </h1>
        </div>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Control
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </Form.Group>

        <Button className="mb-3 align-self-end" variant="primary" type="submit" disabled={loading}>
          {loading && (
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-1" />
          )}
          Login
        </Button>
      </Form>

      <Link className="p-0 align-self-end" to="/signup">
        <Button variant="link">Don&apos;t have an account?</Button>
      </Link>
    </div>
  );
};
