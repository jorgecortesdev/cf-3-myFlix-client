import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Card, ListGroup, Image } from 'react-bootstrap';

import { actorPropTypes } from '../../../propTypes';

export const ActorModal = ({ actor, show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter" centered backdrop>
      <Modal.Body>
        <Card body className="border-0">
          <Image src={actor.ImagePath} className="float-start me-4" />
          <Card.Title>{actor.Name}</Card.Title>
          <Card.Text>{actor.Bio}</Card.Text>
          <ListGroup variant="flush" className="mt-2">
            <ListGroup.Item className="px-0 border-0">
              <strong>Born:</strong>
              <span className="ms-3">{actor.Birthday.split('T')[0]}</span>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Modal.Body>
    </Modal>
  );
};

ActorModal.propTypes = {
  actor: actorPropTypes.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func,
};
