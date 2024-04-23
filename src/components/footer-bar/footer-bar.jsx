import React from "react";
import { Container, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { onLoggedOut } from "../../state/user/userSlice";

export const FooterBar = () => {
  const { user } = useSelector(state => state.user);

  const dispatch = useDispatch();

  return (
    <footer className="mt-auto">
      <Container className="d-flex flex-wrap justify-content-between align-items-center py-3 my-3">
        <p className="col-md-4 mb-0 text-body-secondary">© 2024 myFlix, Inc</p>
        <p className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto">myFlix</p>
        <Nav className="col-md-4 justify-content-end">
          {!user && (
            <>
              <Nav.Item>
                <Nav.Link as={Link} to="/login" className="px-2 text-body-secondary">Login</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/signup" className="px-2 text-body-secondary">Signup</Nav.Link>
              </Nav.Item>
            </>
          )}
          {user && (
            <>
              <Nav.Item>
                <Nav.Link as={Link} to="/" className="px-2 text-body-secondary">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/profile" className="px-2 text-body-secondary">Profile</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => dispatch(onLoggedOut())} className="px-2 text-body-secondary">Logout</Nav.Link>
              </Nav.Item>
            </>
          )}
        </Nav>
      </Container>
    </footer>
  )
}
