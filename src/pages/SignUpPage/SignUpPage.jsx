import React, { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useSignupMutation } from '../../services/myFlixApi';
import { PasswordInput } from '../../components/PasswordInput/PasswordInput';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [formState, setFormState] = useState({
    Name: null,
    Password: null,
    Email: null,
    Birthday: null,
  });
  const [errors, setErrors] = useState([]);

  const [signup, { isLoading }] = useSignupMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await signup(formState);

      if (response?.data?.success) {
        toast.success('Sign up successful');
        navigate('/', { replace: true });
      } else {
        const errors = response.error.message;
        if (Array.isArray(errors)) {
          setErrors(errors.reduce((acc, cur) => ({ ...acc, [cur.path]: cur.msg }), {}));
        } else {
          setErrors({ Email: errors });
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
              name="Email"
              onChange={handleChange}
              placeholder="Email"
              isInvalid={!!errors.Email}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.Email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <PasswordInput name="Password" onChange={handleChange} isInvalid={!!errors.Password} isRequired={true}>
              <Form.Control.Feedback type="invalid">{errors.Password}</Form.Control.Feedback>
            </PasswordInput>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formName">
            <Form.Control
              type="text"
              name="Name"
              onChange={handleChange}
              placeholder="Name"
              isInvalid={!!errors.Name}
              required
              minLength="5"
            />
            <Form.Control.Feedback type="invalid">{errors.Name}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBirthday">
            <Form.Control type="date" name="Birthday" onChange={handleChange} placeholder="Birthday" />
          </Form.Group>

          <Button className="mb-3 align-self-end" variant="primary" type="submit" disabled={isLoading}>
            {isLoading && (
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
