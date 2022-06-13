import React, {useContext} from 'react';
import Modal, {ModalBody} from "../Modal";
import './ModalFreelancePremium.scss';
import {ModalContext} from "../../contexts/ModalContext";
import ContentComptePayant from "../../components/Premium/ContentComptePayant/ContentComptePayant";


export default function ModalFreelancePremium() {

    const {isShowingFreelancePremium, toggleModalFreelancePremium, toggleContactUsToSubscribe} = useContext(ModalContext);

    return (
        <Modal
            isShowing={isShowingFreelancePremium}
            toggle={toggleModalFreelancePremium}
            className={"freelance-premium-modal"}
            hideSeparation
        >
            <ModalBody>
                <ContentComptePayant
                    isModal
                    handleClose={() => toggleModalFreelancePremium(false)}
                    handleContactUsToSubscribe={() => toggleContactUsToSubscribe()}
                    />
            </ModalBody>
        </Modal>
    );
};