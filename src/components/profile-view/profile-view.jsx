import React, { useState } from "react";
import { Row, Col, Button, Form, Spinner } from "react-bootstrap";
import { MovieList } from "../movie-list/movie-list";

export const ProfileView = ({ movies, user, token, syncUser, onLoggedOut }) => {
  // TODO: Fix the bug with timezone
  const formattedDate = (value) => {
    if (value) {
      const inputDate = new Date(value);

      const year = inputDate.getFullYear();
      const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
      const day = inputDate.getDate().toString().padStart(2, "0");

      return `${year}-${month}-${day}`;
    }

    return value;
  }

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(user.Name);
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState(formattedDate(user.Birthday));

  const favoriteMovies = movies.filter(movie => user.FavoriteMovies.includes(movie.id));

  const handleSubmit = event => {
    event.preventDefault();

    let data = {
      Name: name,
      Birthday: birthday
    }

    setLoading(true);

    // only set password if is not empty
    if (password) {
      data.Password = password;
    }

    fetch(`https://cf-2-movie-api.onrender.com/users/${user.Email}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          syncUser({...user, ...data.data});
          alert("Update successful");
        } else {
          alert(`Update failed: ${data.error.message}`)
        }
        setLoading(false);
      }).catch(error => {
        setLoading(false);
        alert("Something went wrong");
      });
  }

  const removeAccount = () => {
    fetch(`https://cf-2-movie-api.onrender.com/users/${user.Email}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        onLoggedOut();
      } else {
        alert(`Remove failed: ${data.error.message}`)
      }
    }).catch(error => {
      alert("Something went wrong");
    });
  }

  return(
    <>
      <Row className="mb-5 pt-5 pb-2">
        <Col md={4}>
          <h3 className="mb-4">Account Information</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                defaultValue={user.Email}
                disabled
              />
              <Form.Text id="passwordHelpBlock" muted>
                * You can't change your email.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formName">
              <Form.Control
                type="text"
                placeholder="Name"
                defaultValue={user.Name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={5}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBirthday">
              <Form.Control
                type="date"
                placeholder="Birthday"
                defaultValue={formattedDate(user.Birthday)}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </Form.Group>

            <div className="d-flex flex-column align-items-end">
              <Button variant="primary" type="submit" disabled={loading}>
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
                Update
              </Button>
            </div>
          </Form>
          <div className="d-flex justify-content-end">
            <Button onClick={removeAccount} variant="link" type="submit" className="text-danger p-0 mt-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
              </svg>
              <small className="ms-2">Remove account permanently</small>
            </Button>
          </div>
        </Col>
      </Row>

      <MovieList movies={favoriteMovies} title={"Favorites"} token={token} user={user} syncUser={syncUser} />
    </>
  );
};
