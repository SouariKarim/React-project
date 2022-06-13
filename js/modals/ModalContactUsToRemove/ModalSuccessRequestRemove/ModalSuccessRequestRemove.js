import React, {useContext} from "react";
import {ModalContext} from "../../../contexts/ModalContext";
import Modal, {ModalBody, ModalHeader, ModalTitle} from "../../Modal";
import Button from "../../../components/Buttons/Button";
import classes from "./success-remove.module.scss"


export default function ModalSuccessRequestRemove() {

    const {isShowingSuccessRemove, toggleSuccessRemove} = useContext(ModalContext);

    return (
        <Modal
            isShowing={isShowingSuccessRemove}
            toggle={toggleSuccessRemove}
        >

            <ModalHeader closeButton>
                <ModalTitle>Demande de suppression bien reçue !</ModalTitle>
            </ModalHeader>

            <ModalBody>
                <div className={classes.content}>
                    <p>Jean-Michel DPO va supprimer vos données dans les plus brefs délais, nous sommes sincèrement désolés pour la gêne éventuelle occasionnée.</p>
                    <Button variant={"cta secondary"} onClick={toggleSuccessRemove}>
                        Ok, merci !
                    </Button>
                </div>
            </ModalBody>
        </Modal>
    )
}