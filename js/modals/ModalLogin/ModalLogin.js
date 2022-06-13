import React, {createRef, useContext, useEffect, useRef, useState} from 'react';
import {Col, Container, FormGroup, Row} from "react-bootstrap";
import {Formik} from "formik";
import Form from "../../components/Form/Form";
import InputGroup from "../../components/Form/InputGroup";
import {Input} from "../../components/Form/Input";
import InputError from "../../components/Form/InputError";
import Button from "../../components/Buttons/Button";
import "./ModalLogin.scss";
import * as Yup from "yup";
import Modal, {ModalBody, ModalHeader, ModalTitle} from '../Modal';
import useGodzilla from '../../hooks/useGodzilla';
import {UserContext} from '../../contexts/UserContext';
import {ModalContext} from '../../contexts/ModalContext';
import {useLocation} from "react-router-dom";
import useRoutes from "../../hooks/useRoutes";
import useToast from "../../hooks/useToast";
import {useKey} from "rooks";


const SigninSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, 'Mot de passe trop court')
        .max(50, 'Mot de passe trop long')
        .required('Mot de passe requis'),
    email: Yup.string()
        .email('Email invalide')
        .required('Emails requis'),
});


const ModalLogin = () => {

    const formRef = createRef();
    const godzilla = useGodzilla();
    const toast = useToast();
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const userContext = useContext(UserContext);
    const isMountedRef = useRef(null);
    const {toggleLogin, isShowingLogin, togglePasswordRecovery} = useContext(ModalContext);
    const {redirect} = useRoutes();
    const location = useLocation()


    const onPasswordForgetClick = () => {
        toggleLogin();
        togglePasswordRecovery();
    }


    useKey("Enter", (e) => {
        e.preventDefault();
        if (formRef.current) {
            formRef.current.handleSubmit()
        }
    }, {
        target: formRef.current
    })


    const onSubmit = (values, {setSubmitting, setFieldError}) => {
        setIsLoginLoading(true);

        godzilla.authTokensApi.login({email: values.email, password: values.password})
            .then(user => {
                toggleLogin();
                userContext.setUser(user);
                toast.success({
                    text: "Connecté !"
                })

                if(location.pathname === '/'){
                    redirect({key: "SEARCH"})
                }
            })
            .catch(error => {
                if (!error.response) {
                    toast.error({
                        text: "Une erreur inconnue est survenue"
                    })
                    return;
                }

                const data = error.response.data;

                if (data.code && data.code === 401) {
                    setFieldError('email', '');
                    setFieldError('password', '');
                    setFieldError('global', 'Les identifiants ne semblent pas valides.')
                } else {
                    if (data.code === 'USER_NOT_ENABLE') {
                        setFieldError('global', 'Votre compte n\'a pas encore été activé.');
                    } else {
                        setFieldError('global', 'Une erreur inconue est survenue.');
                    }
                }

                setSubmitting(false);
            })
            .finally(() => {
                if (isMountedRef.current) {
                    setIsLoginLoading(false);
                }
            });
    };


    useEffect(() => {
        isMountedRef.current = true;
        return () => isMountedRef.current = false;
    }, [])


    return (
        <Modal isShowing={isShowingLogin}
               isLoading={isLoginLoading}
               text={"Jean-Michel Sconnecte"}
               toggle={toggleLogin}
               hideSeparation
               className={"login-modal"}>

            <ModalHeader closeButton>
                <ModalTitle>Bon retour parmi nous !</ModalTitle>
            </ModalHeader>

            <ModalBody>
                <Container className={"login-form"}>
                    <Row className={"justify-content-md-center"}>

                        <Col xs={12} md={12}>
                            <Formik
                                innerRef={formRef}
                                initialValues={{password: '', email: ''}}
                                validationSchema={SigninSchema}
                                onSubmit={(values, actions) => onSubmit(values, actions)}
                            >
                                {({errors, touched, isSubmitting, isValid, dirty}) => (
                                    <Form>
                                        <FormGroup controlId="email">
                                            <InputGroup>
                                                <Input name={"email"} type={"email"}
                                                       placeholder={"Email"}
                                                       isValid={dirty && touched.email && !errors.email && !errors.global}
                                                       isInvalid={dirty && touched.email && (errors.email || errors.global)}
                                                />
                                                {errors.email &&
                                                <InputError><p>{errors.email}</p></InputError>}
                                            </InputGroup>
                                        </FormGroup>

                                        <FormGroup controlId="password">
                                            <InputGroup>
                                                <Input name={"password"}
                                                       type={"password"}
                                                       placeholder={"Mot de passe"}
                                                       autoComplete={"false"}
                                                       isValid={dirty && touched.password && !errors.password && !errors.global}
                                                       isInvalid={dirty && touched.password && (errors.password || errors.global)}
                                                />
                                                {errors.password &&
                                                <InputError><p>{errors.password}</p></InputError>}
                                            </InputGroup>
                                        </FormGroup>
                                        {errors.global &&
                                        <div className={"form-error"}><p>{errors.global}</p></div>}

                                        <div className="text-center">
                                            <p className="m-0">
                                                <Button autoFocus={false} variant={'link'} onClick={onPasswordForgetClick}>
                                                    Mot de passe oublié ?
                                                </Button>
                                            </p>

                                            <Button
                                                autoFocus={true}
                                                type={"submit"}
                                                variant={"cta secondary"}
                                                className={"mt-4"}
                                                disabled={!(isValid && dirty) || isSubmitting}
                                            >
                                                Connexion
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </Col>
                    </Row>
                </Container>
            </ModalBody>
        </Modal>

    );
};

export default ModalLogin;