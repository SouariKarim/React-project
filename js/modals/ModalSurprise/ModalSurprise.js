import Modal, {ModalBody, ModalHeader, ModalTitle} from "../Modal";
import React, {useContext} from "react";
import {ModalContext} from "../../contexts/ModalContext";
import "./ModalSurprise.scss"
import Button from "../../components/Buttons/Button";
import surprise from "../../res/images/singe-surprise.jpg"


export default function ModalSurprise() {

    const {isShowingSurprise, toggleSurprise} = useContext(ModalContext);

    return (
        <Modal
            isShowing={isShowingSurprise}
            toggle={toggleSurprise}
            className={"surprise-modal"}
            hideSeparation
        >
            <ModalHeader closeButton>
                <ModalTitle>Jean-Michel BITE !</ModalTitle>
            </ModalHeader>

            <ModalBody>
                <div className={"surprise-container"}>
                    <img src={surprise} alt={"surprise"}/>
                    <div className={"actions"}>
                        <Button variant={"cta secondary"} onClick={toggleSurprise}>
                            J'AI RI
                        </Button>
                        <Button variant={"cta secondary"} onClick={toggleSurprise}>
                            J'SUIS PAS DROLE
                        </Button>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
}