import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { ActorModal } from "../../Modals/ActorModal/ActorModal";

export const ActorLink = ({ actor }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant="link" className="text-decoration-none d-inline-flex p-0 px-2 align-baseline" onClick={() => setModalShow(true)}>
        <span>{actor.Name}</span>
      </Button>

      <ActorModal
        actor={actor}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
