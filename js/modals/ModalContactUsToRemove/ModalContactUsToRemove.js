import Modal, {ModalBody, ModalHeader, ModalSubTitle, ModalTitle} from "../Modal";
import React, {useContext, useState} from "react";
import {ModalContext} from "../../contexts/ModalContext";
import {Col, Container, FormGroup, Row} from "react-bootstrap";
import {Form, Formik} from "formik";
import InputGroup from "../../components/Form/InputGroup";
import {Input, TextAreaInput} from "../../components/Form/Input";
import InputError from "../../components/Form/InputError";
import Button from "../../components/Buttons/Button";
import CopyToClipBoard from "../../components/CopyToClipBoard/CopyToClipBoard";
import useAuthManager from "../../hooks/useAuthManager";
import * as Yup from "yup";
import useToast from "../../hooks/useToast";
import useSiteApi from "../../hooks/useSiteApi";


const ContactSchema = Yup.object().shape({
    firstName: Yup.string().required("Prénom requis"),
    lastName: Yup.string().required("Nom requis"),
    clue: Yup.string().required("Informations supplémentaires requises"),
    message: Yup.string().min(1, 'Votre messsage est trop court').required(),
})



export default function ModalContactUsToRemove() {

    const {isShowingContactUsToRemove, toggleContactUsToRemove, toggleSuccessRemove} = useContext(ModalContext);
    const [isLModalContactLoading, setIsModalContactLoading] = useState(false);
    const {user} = useAuthManager();
    const toast = useToast();
    const { sendRemoveRequest } = useSiteApi();


    const onSubmit = (values, { setSubmitting, setFieldError }) => {
        setIsModalContactLoading(true)

        toast.promise({
            promise: sendRemoveRequest(values),
            loadingText: "Réception de votre requête ...",
            successText: "Demande de suppression bien reçue !",
            style: {minWidth: 280}
        }).then(() => {
            toggleContactUsToRemove();
            toggleSuccessRemove();
        }).catch(errors => {
            if (Array.isArray(errors)) {
                for (const formError of errors) {
                    const field = formError.getField();
                    setFieldError(field, formError.getMessages());
                }
            }
            setSubmitting(false);
        }).finally(() => {
            setIsModalContactLoading(false);
        })
    }


    return (
        <Modal isShowing={isShowingContactUsToRemove}
               isLoading={isLModalContactLoading}
               hideSeparation
               toggle={toggleContactUsToRemove}
               className="modal-contact-us"
               text={"Jean-Michel LAPOSTE"}
        >
            <ModalHeader closeButton>
                <ModalTitle>Demande de suppression de données freelances</ModalTitle>
            </ModalHeader>

            <ModalSubTitle>
                Je jure de parler sans haine et sans crainte, de dire toute la vérité,<br/>rien que la vérité.
            </ModalSubTitle>

            <ModalBody>
                <Container>
                    <Formik
                        initialValues={{
                            firstName: user?.firstName ?? '',
                            lastName: user?.lastName ?? '',
                            clue: '',
                            message: "Bonjour Jean-Mich',\n\nJe souhaite que tu fasses disparaitre toutes les données que tu as trouvé sur moi maintenant et à l'avenir ! Et plus vite que ca !\n\nJ'ai conscience que je ne serai alors plus visible des ESN qui voudraient me proposer des missions de freelances.\n\n A+"
                        }}
                        validationSchema={ContactSchema}
                        validateOnMount={true}
                        enableReinitialize
                        onSubmit={(values, actions) => onSubmit(values, actions)}
                    >
                        {({ errors, touched, isSubmitting, isValid, dirty }) => (
                            <Form>
                                <FormGroup controlId="firstName">
                                    <InputGroup>
                                        <Input name={"firstName"}
                                               type={"text"}
                                               placeholder={"Votre prénom"}
                                               isValid={dirty && touched.firstName && !errors.firstName && !errors.global}
                                               isInvalid={dirty && touched.firstName && (errors.firstName || errors.global)}
                                        />
                                        {errors.firstName && <InputError>{errors.firstName}</InputError>}
                                    </InputGroup>
                                </FormGroup>

                                <FormGroup controlId="lastName">
                                    <InputGroup>
                                        <Input name={"lastName"}
                                               type={"text"}
                                               placeholder={"Votre nom"}
                                               isValid={dirty && touched.lastName && !errors.lastName && !errors.global}
                                               isInvalid={dirty && touched.lastName && (errors.lastName || errors.global)}
                                        />
                                        {errors.lastName && <InputError>{errors.lastName}</InputError>}
                                    </InputGroup>
                                </FormGroup>

                                <FormGroup controlId="clue">
                                    <InputGroup>
                                        <Input name={"clue"}
                                               type={"text"}
                                               placeholder={"LinkedIn ou mail ou tel => pour vous retrouver"}
                                               isValid={dirty && touched.clue && !errors.clue && !errors.global}
                                               isInvalid={dirty && touched.clue && (errors.clue || errors.global)}
                                        />
                                        {errors.clue && <InputError>{errors.clue}</InputError>}
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
                                                disabled={(!user?.email && !user?.phone_number && !(isValid && dirty)) || isSubmitting}>
                                            Envoyer
                                        </Button>

                                        <Button variant={"link"} className={"mx-3"} onClick={toggleContactUsToRemove}>
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