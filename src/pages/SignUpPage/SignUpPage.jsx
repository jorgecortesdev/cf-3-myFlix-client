import React, { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Email: email,
      Password: password,
      Name: name,
      Birthday: birthday,
    };

    setLoading(true);

    const { MYFLIX_API: myflixApi } = process.env;

    fetch(`${myflixApi}/users`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Please review the response format of the API here
        // https://cf-2-movie-api.onrender.com/docs/#/User/post_users
        if (data.success) {
          toast.success('Signup successful');
          navigate('/', { replace: true });
        } else {
          const errors = data.error.message;
          if (Array.isArray(errors)) {
            setErrors(errors.reduce((acc, cur) => ({ ...acc, [cur.path]: cur.msg }), {}));
          } else {
            setErrors({ Email: errors });
          }
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error('Something went wrong!');
        console.log(error);
      });
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
            <Form.Control
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              isInvalid={!!errors.Email}
              // required
            />
            <Form.Control.Feedback type="invalid">{errors.Email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              isInvalid={!!errors.Password}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.Password}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formName">
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              isInvalid={!!errors.Name}
              required
              minLength="5"
            />
            <Form.Control.Feedback type="invalid">{errors.Name}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBirthday">
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              placeholder="Birthday"
            />
          </Form.Group>

          <Button className="mb-3 align-self-end" variant="primary" type="submit" disabled={loading}>
            {loading && (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-1" />
            )}
            Signup
          </Button>
        </Form>

        <Link className="align-self-end" to="/login">
          <Button variant="link" className="p-0">
            Already have an account?
          </Button>
        </Link>
      </div>
    </div>
  );
};
