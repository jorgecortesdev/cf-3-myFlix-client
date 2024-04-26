import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { DirectorModal } from "../../Modals";

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
