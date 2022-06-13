import React, {useContext, useState} from 'react';
import "./ModalRegistration.scss";
import Modal from "../Modal";
import ModalRegistrationForm from './ModalRegistrationForm/ModalRegistrationForm';
import {ModalContext} from '../../contexts/ModalContext';


const ModalRegistration = () => {

	const { isShowingRegistration, toggleRegistration, optionRegistration } = useContext(ModalContext);
	const [isLoading, setLoading] = useState(false)


	return (
		<Modal isShowing={isShowingRegistration}
			   isLoading={isLoading}
			   toggle={toggleRegistration}
			   className={"registration-modal"} text={"Jean-Michel Linscription"}>

				<ModalRegistrationForm option={optionRegistration} setLoading={setLoading}/>
		</Modal>
	);
};

export default ModalRegistration;