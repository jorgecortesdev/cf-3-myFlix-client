import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export const GenreBadge = ({ genre }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant="link" className="text-decoration-none text-secondary p-0 z-1" onClick={() => setModalShow(true)}>
        <small className="d-inline-flex focus-ring py-1 px-3 bg-light text-dark fw-semibold border border-dark-subtle rounded-4">{genre.Name}</small>
      </Button>

      <GenreModal
        genre={genre}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  )
}

function GenreModal({ genre, show, onHide }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {genre.Name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{genre.Description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
