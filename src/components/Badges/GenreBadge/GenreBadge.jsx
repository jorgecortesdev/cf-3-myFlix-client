import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { GenreModal } from "../../Modals";

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
