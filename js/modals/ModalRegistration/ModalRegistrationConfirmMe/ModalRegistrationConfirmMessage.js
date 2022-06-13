import React, {useContext} from 'react';
import "./ModalRegistrationConfirmMessage.scss";
import {Col, Container, Row} from "react-bootstrap";
import Modal, {ModalBody, ModalHeader, ModalTitle} from "../../Modal";
import Button from '../../../components/Buttons/Button';
import {ModalContext} from '../../../contexts/ModalContext';

export default function ModalRegistrationConfirmMessage() {

    const {toggleRegistrationConfirmation, isShowingRegistrationConfirmation} = useContext(ModalContext);

    const getWelcomeSentence = () => {
        return 'Jean-Michel va valider votre compte au plus vite (max 24h).'
    }

    return (
        <div className='modal-confirmation-message'>
            <Modal isShowing={isShowingRegistrationConfirmation}
                   toggle={toggleRegistrationConfirmation}
            >

                <ModalHeader closeButton>
                    <ModalTitle>Il est des nôtres</ModalTitle>
                </ModalHeader>

                <ModalBody>
                    <Container fluid>
                        <Row>
                            <Col>
                                <p>Bravo de vous être inscrit sur Jean-Michel.io !</p>
                                <p>{getWelcomeSentence()}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='text-center my-2'>
                                <Button onClick={toggleRegistrationConfirmation} variant='cta secondary'>
                                    Youpi !
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </ModalBody>
            </Modal>
        </div>
    )
}