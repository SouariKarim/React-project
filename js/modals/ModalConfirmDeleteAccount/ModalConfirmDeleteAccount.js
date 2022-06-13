import React, {useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import Button from "../../components/Buttons/Button";
import Modal, {ModalBody, ModalHeader, ModalTitle} from "../Modal";
import useAuthManager from "../../hooks/useAuthManager";
import useUsersApi from "../../hooks/useUsersApi";
import useRoutes from "../../hooks/useRoutes";


const ModalConfirmDeleteAccount = ({isShowing, toggle, users}) => {
    const [disableSubmit, setDisableSubmit] = useState(false);
    const {redirect} = useRoutes();
    const {removeUser} = useUsersApi();
    const {user} = useAuthManager();

    const onValid = () => {
        setDisableSubmit(true);

        removeUser({userId: user.id})
            .finally(() => {
                redirect({key: 'HOME_PAGE'});
            });
    };

    return (
        <Modal isShowing={isShowing} isLoading={disableSubmit} toggle={toggle}
               className={"user-remove-modal"} text={"Jean-Michel pleure"}>

            <ModalHeader closeButton>
                <ModalTitle>Supprimer mon compte</ModalTitle>
            </ModalHeader>

            <ModalBody>
                <Container>
                    <Row className={"justify-content-md-center"}>
                        <Col>
                            <Button variant={"cta"} className={"my-3"} disabled={disableSubmit} onClick={onValid}>
                                Je confirme vouloir supprimer mon compte
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </ModalBody>

        </Modal>);
};

export default ModalConfirmDeleteAccount;