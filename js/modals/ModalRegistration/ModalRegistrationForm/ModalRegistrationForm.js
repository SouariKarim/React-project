import React, {useContext, useEffect, useRef} from 'react';
import "./ModalRegistrationForm.scss";
import {Col, Container, FormGroup, Row} from "react-bootstrap";
import {Formik} from "formik";
import Form from "../../../components/Form/Form";
import InputGroup from "../../../components/Form/InputGroup";
import {Input, SelectInput} from "../../../components/Form/Input";
import InputError from "../../../components/Form/InputError";
import Button from "../../../components/Buttons/Button";
import * as Yup from "yup";
import {ModalBody, ModalHeader, ModalSubTitle, ModalTitle} from "../../Modal";
import useGodzilla from '../../../hooks/useGodzilla';
import {ModalContext} from '../../../contexts/ModalContext';
import {UserContext} from "../../../contexts/UserContext";
import useRoutes from "../../../hooks/useRoutes";
import useToast from "../../../hooks/useToast";

const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .required('Prénom requis'),
    lastName: Yup.string()
        .required('Nom requis'),
    company: Yup.string()
        .required('Société requise'),
    companyType: Yup.string()
        .required('Type de Société requis'),
    jobTitle: Yup.string()
        .required('Fonction requise'),
    phoneNumber: Yup.string()
        .matches(phoneRegExp, 'Numéro de téléphone invalide')
        .required('Téléphone requis'),
    password: Yup.string()
        .min(6, 'Mot de passe trop court')
        .max(50, 'Mot de passe trop long')
        .required('Mot de passe requis'),
    email: Yup.string()
        .email('Email non valide')
        .required('Email requis'),
    confirmPassword: Yup.string()
        .required("Confirmation du mot de passe requise")
        .label('Confirmer le mot de passe')
        .test('passwords-match', 'Les mots de passe doivent correspondre', function (value) {
            return this.parent.password === value;
        })
});


export default function ModalRegistrationForm({option, setLoading}) {

    const {toggleRegistrationConfirmation, toggleRegistration} = useContext(ModalContext);
    const godzilla = useGodzilla();
    const {usersApi} = useGodzilla();
    const isMounted = useRef();
    const toast = useToast();
    const {setUser} = useContext(UserContext);
    const {redirect} = useRoutes()


    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const onSubmit = (values, {setSubmitting, setFieldError}) => {
        setLoading(true);

        toast.promise({
            promise: usersApi.registration({
                email: values.email,
                password: values.password,
                firstName: values.firstName,
                lastName: values.lastName,
                companyName: values.company,
                companyType: values.companyType,
                jobTitle: values.jobTitle,
                phoneNumber: values.phoneNumber
            }),
            loadingText: "Inscription en cours",
            successText: "Inscription terminée !",
            style: {minWidth: 230}
        }).then(() => {
            godzilla.authTokensApi.login({email: values.email, password: values.password})
                .then(user => {
                    setLoading(false);
                    if (values.companyType === "ESN/SSII" ||
                        values.companyType === "Cabinet de recrutement" ||
                        values.companyType === "Société de portage") {
                        toggleRegistrationConfirmation();
                    }
                    setUser(user);
                    toggleRegistration(false)
                }).finally(() => {
                redirect({key: "SEARCH"})
            });

            // logFromAuthToken({authToken: user.token});
        })
            .catch(errors => {
                if (Array.isArray(errors)) {
                    for (const formError of errors) {
                        let field = formError.getField();
                        if (field === 'plainPassword') {
                            field = 'password';
                        }
                        setFieldError(field, formError.getMessages());
                    }
                }
                setLoading(false);
            })
            .finally(() => {
                if (isMounted.current) {
                    setSubmitting(false);
                }
            });
    };


    return (
        <div className='modal-registration-form'>
            <ModalHeader closeButton>
                <ModalTitle>
                    Créer mon compte Recruteur
                    {option?.subtitle ?
                        <p className={"modal-subtitle"}>{option.subtitle}</p>
                        :
                        <ModalSubTitle>
                            Vous êtes Freelance ? <a href={"https://www.jean-paul.io/inscription"} target="_blank"
                                                     rel="noopener noreferrer">Devenir visible sur Jean-Michel.io</a>
                        </ModalSubTitle>
                    }
                </ModalTitle>
            </ModalHeader>

            <ModalBody>
                <Container>
                    <Row className={"justify-content-md-center"}>
                        <Col xs={12} md={12}>
                            <Formik
                                initialValues={{
                                    password: '',
                                    email: '',
                                    confirmPassword: '',
                                    firstName: '',
                                    lastName: '',
                                    company: '',
                                    jobTitle: '',
                                    phoneNumber: '',
                                    companyType: '',
                                    subscriptionId: '',
                                    subscriptionCode: '',
                                }}
                                validationSchema={SignupSchema}
                                onSubmit={(values, actions) => onSubmit(values, actions)}
                            >
                                {({
                                      values,
                                      handleChange,
                                      errors,
                                      touched,
                                      isSubmitting,
                                      isValid,
                                      dirty,
                                      handleBlur,
                                      setFieldValue
                                  }) => (
                                    <Form>
                                        <Input name={"subscriptionId"} type={"hidden"}/>
                                        <Input name={"subscriptionCode"} type={"hidden"}/>

                                        <FormGroup controlId="firstName">
                                            <InputGroup>
                                                <Input name={"firstName"} type={"text"}
                                                       placeholder={"Prénom"}
                                                       isValid={dirty && touched.firstName && !errors.firstName}
                                                       isInvalid={dirty && touched.firstName && errors.firstName}
                                                />
                                                <InputError><p>{errors.firstName}</p></InputError>
                                            </InputGroup>
                                        </FormGroup>

                                        <FormGroup controlId="lastName">
                                            <InputGroup>
                                                <Input name={"lastName"} type={"text"}
                                                       placeholder={"Nom"}
                                                       isValid={dirty && touched.lastName && !errors.lastName}
                                                       isInvalid={dirty && touched.lastName && errors.lastName}
                                                />
                                                <InputError><p>{errors.lastName}</p></InputError>
                                            </InputGroup>
                                        </FormGroup>

                                        <FormGroup controlId="company">
                                            <InputGroup>
                                                <Input name={"company"} type={"text"}
                                                       placeholder={"Société"}
                                                       isValid={dirty && touched.company && !errors.company}
                                                       isInvalid={dirty && touched.company && errors.company}
                                                />
                                                <InputError><p>{errors.company}</p></InputError>
                                            </InputGroup>
                                        </FormGroup>

                                        <FormGroup controlId="companyType">
                                            <InputGroup>
                                                <SelectInput
                                                    name={"companyType"}
                                                    value={values.companyType}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                    <option value={""}>Type de société</option>
                                                    <option value={"ESN/SSII"}>ESN/SSII</option>
                                                    <option value={"Société de portage"} label={"Société de portage"}/>
                                                    <option value={"Grand Compte"} label={"Grand Compte"}/>
                                                    <option value={"TPE/PME"} label={"TPE/PME"}/>
                                                    <option value={"Start-Up"} label={"Start-Up"}/>
                                                    <option value={"Cabinet de recrutement"}
                                                            label={"Cabinet de recrutement"}/>
                                                    <option value={"Agence"} label={"Agence"}/>
                                                    <option value={"Freelance"} label={"Freelance"}/>
                                                    <option value={"Autre"} label={"Autre"}/>
                                                </SelectInput>
                                                <InputError><p>{errors.companyType}</p></InputError>
                                            </InputGroup>
                                        </FormGroup>

                                        <FormGroup controlId="jobTitle">
                                            <InputGroup>
                                                <Input name={"jobTitle"} type={"text"}
                                                       placeholder={"Fonction"}
                                                       isValid={dirty && touched.jobTitle && !errors.jobTitle}
                                                       isInvalid={dirty && touched.jobTitle && errors.jobTitle}
                                                />
                                                <InputError><p>{errors.jobTitle}</p></InputError>
                                            </InputGroup>
                                        </FormGroup>

                                        <FormGroup controlId="phoneNumber">
                                            <InputGroup>
                                                <Input name={"phoneNumber"} type={"text"}
                                                       placeholder={"Tel"}
                                                       isValid={dirty && touched.phoneNumber && !errors.phoneNumber}
                                                       isInvalid={dirty && touched.phoneNumber && errors.phoneNumber}
                                                />
                                                <InputError><p>{errors.phoneNumber}</p></InputError>
                                            </InputGroup>
                                        </FormGroup>

                                        <FormGroup controlId="email">
                                            <InputGroup>
                                                <Input name={"email"} type={"email"}
                                                       autoComplete={"off"}
                                                       placeholder={"Email pro"}
                                                       isValid={dirty && touched.email && !errors.email}
                                                       isInvalid={dirty && touched.email && errors.email}
                                                />
                                                <InputError><p>{errors.email}</p></InputError>
                                            </InputGroup>
                                        </FormGroup>

                                        <FormGroup controlId="password">
                                            <InputGroup>
                                                <Input name={"password"}
                                                       type={"password"}
                                                       placeholder={"Mot de passe"}
                                                       autoComplete={"false"}
                                                       isValid={dirty && touched.password && !errors.password}
                                                       isInvalid={dirty && touched.password && errors.password}
                                                />
                                                <InputError><p>{errors.password}</p></InputError>
                                            </InputGroup>
                                        </FormGroup>

                                        <FormGroup controlId="confirmPassword">
                                            <InputGroup>
                                                <Input name={"confirmPassword"}
                                                       type={"password"}
                                                       placeholder={"Confirmer le mot de passe"}
                                                       autoComplete={"aze"}
                                                       isValid={dirty && touched.confirmPassword && !errors.confirmPassword}
                                                       isInvalid={dirty && touched.confirmPassword && errors.confirmPassword}
                                                />
                                                <InputError><p>{errors.confirmPassword}</p></InputError>
                                            </InputGroup>
                                        </FormGroup>

                                        <InputError><p className={'errors-globals'}>{errors.globals}</p></InputError>

                                        <div className={"text-center"}>
                                            <p className="condition-generale">En continuant votre
                                                inscription
                                                vous
                                                acceptez nos
                                                <Button
                                                    className="button-condition-generale"
                                                    variant={"link"} to={"/conditions-generales-de-vente"}
                                                    target={'_blank'}
                                                >
                                                    Conditions Générales
                                                </Button>
                                            </p>

                                            <Button type="submit" variant={"cta secondary"}
                                                    className="align-content-center"
                                                    disabled={!(isValid && dirty) || isSubmitting}>
                                                <span>Inscription</span>
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </Col>
                    </Row>
                </Container>
            </ModalBody>
        </div>
    )
}