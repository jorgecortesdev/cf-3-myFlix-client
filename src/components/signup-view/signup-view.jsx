import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from 'react-bootstrap/Spinner';
import { Link } from "react-router-dom";

export const SignupView = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to
    // reload the entire page
    event.preventDefault();

    const data = {
      Email: email,
      Password: password,
      Name: name,
      Birthday: birthday
    };

    setLoading(true);

    fetch("https://cf-2-movie-api.onrender.com/users", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(data => {
        // Please review the response format of the API here
        // https://cf-2-movie-api.onrender.com/docs/#/User/post_users
        if (data.success) {
          alert("Signup successful");
          window.location.reload();
        } else {
          alert(`Signup failed: ${data.error.message}`);
        }
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        alert("Something went wrong");
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

        <Form.Group className="mb-3" controlId="formName">
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            minLength="5"
          />
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
          {loading &&
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="me-1"
            />
          }
          Signup
        </Button>
      </Form>

      <Link className="p-0 align-self-end" to="/login">
        <Button variant="link">Already have an account?</Button>
      </Link>
    </div>
  );
};
