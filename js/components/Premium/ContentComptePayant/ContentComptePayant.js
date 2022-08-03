// render a modal for passing to premium account

import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from '../../Buttons/Button';
import './ContentComptePayant.scss';

export default function ContentComptePayant(props) {
  const { handleClose, handleContactUsToSubscribe, isModal = false } = props;

  return (
    <Container
      fluid
      className={'content-compte-payant'}
      style={isModal ? { border: 'none' } : undefined}
    >
      <Row>
        <Col>
          <h2 className={'content-compte-payant-title'}>
            Celui-là, on te l'offre pas !
          </h2>
        </Col>
      </Row>
      <Row>
        <Col className={'justify-content-center'}>
          <p className={'text-center'}>
            Jean-Michel pense que ce freelance est un pokemon rare ! Son CV et
            ses coordonnées ne sont visibles qu'aux utilisateurs payants de
            Jean-Michel.io
          </p>
        </Col>
      </Row>
      <Row className='justify-content-md-center'>
        <Col xs={12} style={{ margin: '20px 0 30px 0' }}>
          <p>Prêt à souscrire un compte payant ? (siouplé &lt;3)</p>
        </Col>
        <Col xs={12} sm={6}>
          <Button
            onClick={() => {
              handleContactUsToSubscribe();
              handleClose();
            }}
            variant={'cta secondary'}
          >
            YEP, J'UPGRADE
          </Button>
        </Col>

        <Col xs={12} sm={6}>
          <Button variant={'action'} onClick={handleClose}>
            NON, TANT PIS
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
