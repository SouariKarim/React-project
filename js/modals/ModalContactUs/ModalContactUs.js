import React, {useContext, useState} from 'react';
import {Col, Container, FormGroup, Row} from "react-bootstrap";
import Modal, {ModalBody, ModalHeader, ModalSubTitle, ModalTitle} from "../Modal";
import Button from '../../components/Buttons/Button';
import './ModalContactUs.scss';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import InputGroup from '../../components/Form/InputGroup';
import InputError from '../../components/Form/InputError';
import useSiteApi from "../../hooks/useSiteApi";
import {Input, TextAreaInput} from "../../components/Form/Input";
import useAuthManager from "../../hooks/useAuthManager";
import {ModalContext} from "../../contexts/ModalContext";
import useToast from "../../hooks/useToast";
import CopyToClipBoard from "../../components/CopyToClipBoard/CopyToClipBoard";


const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

const ContactSchema = Yup.object().shape({
	phoneNumber: Yup.string().matches(phoneRegExp, 'Numéro de téléphone invalide'),
	email: Yup.string()
			  .email('Email invalide')
			  .required('Emails requis'),
	message: Yup.string().min(1, 'Votre messsage est trop court').required(),
});


export default function ModalContactUs({ parentShowing = null, parentToggle = null, text = null}) {

	const {isShowingContactUs, toggleContactUs} = useContext(ModalContext);
	const [isLModalContactLoading, setIsModalContactLoading] = useState(false);
	const { sendContact } = useSiteApi();
	const toast = useToast()
	const {user} = useAuthManager()


	const toggleModal = () => {
		if (parentToggle !== null) {
			parentToggle()
		}
		else {
			toggleContactUs()
		}
	}


	const onSubmit = (values, { setSubmitting, setFieldError }) => {
		setIsModalContactLoading(true)

		toast.promise({
			promise: sendContact(values),
			loadingText: "Envol du pigeon voyageur",
			successText: "Message bien reçu !",
			style: {minWidth: 230}
		}).then(() => {
			toggleModal()
		}).catch(errors => {
			if (Array.isArray(errors)) {
				for (const formError of errors) {
					let field = formError.getField()
					setFieldError(field, formError.getMessages())
				}
			}
			setSubmitting(false)
		}).finally(() => {
			setIsModalContactLoading(false)
		})
	}


	return (
		<Modal isShowing={parentShowing !== null ? parentShowing : isShowingContactUs}
			   isLoading={isLModalContactLoading}
			   hideSeparation
			   toggle={toggleModal}
			   className="modal-contact-us"
			   text={"Jean-Michel LAPOSTE"}
		>
			<ModalHeader closeButton>
				<ModalTitle>Vous souhaitez communiquer avec Jean-Michel ?</ModalTitle>
			</ModalHeader>

			<ModalSubTitle>
				Je jure de parler sans haine et sans crainte, de dire toute la vérité,<br/>rien que la vérité.
			</ModalSubTitle>

			<ModalBody>
				<Container>
					<Formik
						initialValues={{
							email: user?.email ? user.email : '',
							phoneNumber: user?.phone_number ? user.phone_number: '',
							message: text !== null ? text: ''
						}}
						validationSchema={ContactSchema}
						validateOnMount={true}
						enableReinitialize
						onSubmit={(values, actions) => onSubmit(values, actions)}
					>
						{({ errors, touched, isSubmitting, isValid, dirty }) => (
							<Form>
								<FormGroup controlId="email">
									<InputGroup>
										<Input name={"email"}
											   type={"email"}
											   placeholder={"Email pro"}
											   isValid={dirty && touched.email && !errors.email && !errors.global}
											   isInvalid={dirty && touched.email && (errors.email || errors.global)}
										/>
										{errors.email && <InputError>{errors.email}</InputError>}
									</InputGroup>
								</FormGroup>

								<FormGroup controlId="phoneNumber">
									<InputGroup>
										<Input name={"phoneNumber"}
											   type={"tel"}
											   placeholder={"Téléphone"}
											   isValid={dirty && touched.phoneNumber && !errors.phoneNumber && !errors.global}
											   isInvalid={dirty && touched.phoneNumber && (errors.phoneNumber || errors.global)}/>
										{errors.phoneNumber && <InputError>{errors.phoneNumber}</InputError>}
									</InputGroup>
								</FormGroup>

								<FormGroup controlId="message">
									<InputGroup>
										<TextAreaInput name="message"
													   type="textarea"
													   placeholder="Votre message"
													   className={"message"}
													rows={10}
										/>
										{errors.message && <InputError>{errors.message}</InputError>}
									</InputGroup>
								</FormGroup>

								{errors.global && <div className="form-error"><p>{errors.global}</p></div>}

								<Row>
									<Col className='text-center my-2'>
										<Button type="submit" variant='cta secondary' className={"mx-3"}
												disabled={(!user?.email && !user?.phone_number && text === null && !(isValid && dirty)) || isSubmitting}>
											Envoyer
										</Button>

										<Button variant={"link"} className={"mx-3"} onClick={toggleModal}>
											Annuler
										</Button>
									</Col>
								</Row>
							</Form>
						)}
					</Formik>
					<p className={"phone-contact"}>
						Jean-Michel est aussi joignable au &nbsp;<CopyToClipBoard toCopy={"+33755540503"} valueClassName={"phone-number"}>+33 7 55 54 05 03</CopyToClipBoard>
					</p>
				</Container>
			</ModalBody>
		</Modal>
	)
}