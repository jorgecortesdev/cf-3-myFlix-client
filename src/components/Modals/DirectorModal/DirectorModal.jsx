import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Card, ListGroup } from 'react-bootstrap';

import { directorPropTypes } from '../../../propTypes';

export const DirectorModal = ({ director, show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter" centered backdrop>
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
};

DirectorModal.propTypes = {
  director: directorPropTypes.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func,
};
