import React, {useContext} from "react"
import Modal, {ModalBody, ModalHeader, ModalTitle} from "../Modal";
import {ModalContext} from "../../contexts/ModalContext";
import "./ModalFreelanceTJM.scss"
import {Col, Container, Row} from "react-bootstrap";
import Button from "../../components/Buttons/Button";
import useAuthManager from "../../hooks/useAuthManager";
import Constant from "../../constant";


export default function ModalFreelanceTJM () {

    const {isShowingFreelanceTJM, toggleFreelanceTJM, toggleContactUsToSubscribe, toggleRegistration} = useContext(ModalContext);
    const {isLogged} = useAuthManager()

    return (
        <Modal
            isShowing={isShowingFreelanceTJM}
            toggle={toggleFreelanceTJM}
            className={"freelance-tjm-modal"}
            hideSeparation
        >
            <ModalHeader closeButton>
                <ModalTitle>
                    Cette information n'est visible que des utilisateurs payants
                </ModalTitle>
            </ModalHeader>

            <ModalBody>
                <Container fluid className={"content-modal-tjm"}>
                    <Row>
                        <Col xs={12}>
                            Jean-Michel pense que cette information est critique !<br/>Le TJM (Tarif Moyen Journalier) n'est
                            visible qu'aux utilisateurs payants de Jean-Michel.io
                        </Col>
                    </Row>
                    <Row className={"my-4"}>
                        <Col xs={12}>
                            Prêt à souscrire un compte payant ? (siouplé &lt;3)
                        </Col>
                    </Row>
                    <Row className="justify-content-center mt-5 mb-4">
                        <Col xs={6}>
                            {isLogged() ?
                                <Button onClick={() => {
                                    toggleContactUsToSubscribe();
                                    toggleFreelanceTJM();
                                }} variant={'cta secondary'}>
                                    YEP, J'UPGRADE
                                </Button>
                                :
                                <Button onClick={() => {
                                    toggleRegistration({subscriptionCode: Constant.SUBSCRIPTION_CODE_SMART});
                                    toggleFreelanceTJM();
                                }} variant={'cta secondary'}>
                                    YEP, JE M'INSCRIS
                                </Button>
                            }
                        </Col>

                        <Col xs={6}>
                            <Button variant={'action'} onClick={() => toggleFreelanceTJM()}>
                                NON, TANT PIS
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </ModalBody>
        </Modal>
    )
}