import React, { useState } from "react";
import { Button, Modal, Card, ListGroup } from "react-bootstrap";

export const DirectorLink = ({director}) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant="link" className="text-decoration-none d-inline-flex p-0 ms-3 align-baseline" onClick={() => setModalShow(true)}>
        <span>{director.Name}</span>
      </Button>

      <DirectorModal
        director={director}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

function DirectorModal({ director, show, onHide }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop
    >
      <Modal.Body>
        <Card body className="border-0">
          <Card.Title>{director.Name}</Card.Title>
          <Card.Text>{director.Bio}</Card.Text>

          <ListGroup variant="flush" className="mt-2">
            <ListGroup.Item className="px-0 border-0">
              <strong>Born:</strong>
              <span className="ms-3">{director.Birth.split('T')[0]}</span>
            </ListGroup.Item>
            <ListGroup.Item className="px-0 border-0">
              <strong>Died:</strong>
              <span className="ms-3">-</span>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Modal.Body>
    </Modal>
  );
}
