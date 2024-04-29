import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { NavigationBar, FooterBar } from '../../layouts';

export const AppLayout = () => {
  return (
    <Container>
      <Row>
        <Col className="d-flex flex-column min-vh-100">
          <NavigationBar />

          <main className="flex-grow-1">
            <Outlet />
          </main>

          <FooterBar />
          <ToastContainer theme="colored" />
        </Col>
      </Row>
    </Container>
  );
};
