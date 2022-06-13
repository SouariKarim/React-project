import React, {useContext} from 'react';
import {ModalContext} from "../../contexts/ModalContext";
import Modal, {ModalBody, ModalHeader, ModalTitle} from "../Modal";
import {Col, Container, Row} from "react-bootstrap";
import './ModalPremiumFonctionality.scss';
import Button from "../../components/Buttons/Button";


const ModalPremiumFonctionality = () => {

    const {isShowingPremiumFonctionality, togglePremiumFonctionality, toggleContactUsToSubscribe} = useContext(ModalContext);

    return (
        <Modal isShowing={isShowingPremiumFonctionality}
               hideSeparation
               toggle={togglePremiumFonctionality}
               className={"modal-premium-fonctionality"}
               text={"Jean-Michel LAPOSTE"}
        >

            <ModalHeader closeButton>
                <ModalTitle>Fonctionnalité pour les utilisateurs payants</ModalTitle>
            </ModalHeader>

            <ModalBody>
                <Container>
                    <Row>
                        <Col>
                            <p>Parce qu'il faut bien rémunérer toute la (formidable) équipe qui travaille dérrière Jean-Michel.io</p>
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center">
                        <Col xs={12} style={{marginBottom: '15px'}}><p className={"text-center"}>Prêt à souscrire un compte payant ?</p></Col>
                        <Col xs={5}>
                            <Button onClick={() => {togglePremiumFonctionality(); toggleContactUsToSubscribe();}} variant={'cta secondary'}>
                                YEP, J'UPGRADE
                            </Button>
                        </Col>

                        <Col xs={{span: 5, offset: 1}}>
                            <Button variant={"action"} onClick={() => togglePremiumFonctionality()}>
                                NON, TANT PIS
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </ModalBody>

        </Modal>
    );
};

export default ModalPremiumFonctionality;