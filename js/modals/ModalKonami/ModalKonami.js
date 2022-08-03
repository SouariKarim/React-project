import React from 'react';
import Modal, { ModalBody } from '../Modal';

export default function ModalKonami({ isShowing, toggle }) {
  return (
    // the modal squelette
    <Modal
      isShowing={isShowing}
      toggle={toggle}
      className={'konami-modal'}
      hideSeparation
    >
      {/* the modal body */}
      <ModalBody
        style={{
          padding: 0,
        }}
      >
        {isShowing && (
          <iframe
            width='648'
            height='300'
            src='https://www.youtube.com/embed/OXbNkx8bQMU?autoplay=1'
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        )}
      </ModalBody>
    </Modal>
  );
}
