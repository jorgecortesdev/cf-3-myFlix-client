import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

import { genrePropTypes } from '../../../propTypes';

export const GenreModal = ({ genre, show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter" centered backdrop>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{genre.Name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{genre.Description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

GenreModal.propTypes = {
  genre: genrePropTypes.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func,
};
