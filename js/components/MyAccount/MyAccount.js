import React, { useContext, useEffect, useRef } from 'react';
import { Card, Col, Container, FormGroup, Row } from 'react-bootstrap';
import * as Yup from 'yup'; // used with formik for form validation
import Button from '../Buttons/Button';
import { Formik } from 'formik'; // a react form handler witch provide easy form handlers methods
import Form from '../Form/Form'; // render a form
import InputGroup from '../Form/InputGroup'; // render inputgroup of a form
import { Input } from '../Form/Input'; // render a form input
import InputError from '../Form/InputError'; // render a form error meassage and field
import useAuthManager from '../../hooks/useAuthManager'; // return methods for authentication
import useGodzilla from '../../hooks/useGodzilla'; // return a godzilla url
import './MyAccount.scss';
import useModal from '../../hooks/useModal'; // return methods for modals
import ModalConfirmDeleteAccount from '../../modals/ModalConfirmDeleteAccount/ModalConfirmDeleteAccount'; // render a modal for deleting an account
import { ModalContext } from '../../contexts/ModalContext'; // return methods for displaying modals
import useToast from '../../hooks/useToast'; // render a toast

// a validation schema for form inputs
const UserSchema = Yup.object().shape({
  firstName: Yup.string().min(1, 'Trop court !').required('Prénom requis'),
  lastName: Yup.string().min(1, 'Trop court !').required('Nom requis'),
  jobTitle: Yup.string().min(1, 'Trop court !').required('Fonction requis'),
  phoneNumber: Yup.string().min(9, 'Trop court !').required('Téléphone requis'),
  email: Yup.string().email('Email non valid').required('Email requis'),
  plainPassword: Yup.string()
    .min(6, 'Mot de passe trop court')
    .max(50, 'Mot de passe trop long'),
  confirmPassword: Yup.string().when('plainPassword', {
    is: (password) => password && password.length > 0,
    then: Yup.string().test(
      'passwords-match',
      'Les mots de passe doivent correspondre',
      function (value) {
        return this.parent.plainPassword === value;
      }
    ),
  }),
});

const MyAccount = () => {
  const { user, setUser } = useAuthManager();
  const toast = useToast();
  const godzilla = useGodzilla();
  const [showingConfirm, toggleConfirm] = useModal(); // methods for showing or not the delete account modal
  const { toggleContactUs } = useContext(ModalContext);
  // Unused variable
  const isMountedRef = useRef();

  const onSubmit = (values, { setSubmitting, setFieldError }) => {
    const valuesFormatted = { ...values };

    //Si on entre pas de mdp c'est vide donc on l'envoie pas car l'user veut pas le modifier
    if (valuesFormatted.plainPassword.length === 0) {
      valuesFormatted.plainPassword = null;
    }

    toast
      .promise({
        promise: godzilla.usersApi.updateUser({
          id: user.id,
          ...valuesFormatted,
        }),
        loadingText: 'Mise à jour de vos données',
        successText: 'Vos données sont à jour !',
        style: { minWidth: 250 },
      })
      .then((user) => {
        setUser(user);
      })
      .catch((errors) => {
        if (Array.isArray(errors)) {
          for (const formError of errors) {
            let field = formError.getField();

            setFieldError(field, formError.getMessages());
          }
        } else {
          setFieldError(
            'global',
            'Une erreur est survenue lors de la modification.'
          );
        }
      })
      .finally(() => setSubmitting(false));
  };

  useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  }, []);

  return (
    <Container className={'my-account'} fluid>
      <ModalConfirmDeleteAccount
        toggle={toggleConfirm}
        isShowing={showingConfirm}
      />
      <Row>
        <Col xs={12} md={9}>
          <Card>
            <Card.Body>
              <Formik
                initialValues={{
                  email: user.email,
                  firstName: user.first_name,
                  lastName: user.last_name,
                  jobTitle: user.job_title,
                  phoneNumber: user.phone_number,
                  confirmPassword: '',
                  plainPassword: '',
                }}
                // yup validation schema
                validationSchema={UserSchema}
                onSubmit={(values, actions) => onSubmit(values, actions)}
              >
                {({ errors, touched, isSubmitting, isValid, dirty }) => (
                  // this is the rendered form
                  <Form>
                    <FormGroup controlId='firstName'>
                      <InputGroup>
                        <Input
                          name={'firstName'}
                          type={'text'}
                          placeholder={'Prénom'}
                          isValid={
                            dirty && touched.firstName && !errors.firstName
                          }
                          isInvalid={
                            dirty && touched.firstName && errors.firstName
                          }
                        />
                        <InputError>
                          <p>{errors.firstName}</p>
                        </InputError>
                      </InputGroup>
                    </FormGroup>

                    <FormGroup controlId='lastName'>
                      <InputGroup>
                        <Input
                          name={'lastName'}
                          type={'text'}
                          placeholder={'Nom'}
                          isValid={
                            dirty && touched.lastName && !errors.lastName
                          }
                          isInvalid={
                            dirty && touched.lastName && errors.lastName
                          }
                        />
                        <InputError>
                          <p>{errors.lastName}</p>
                        </InputError>
                      </InputGroup>
                    </FormGroup>

                    <FormGroup controlId='jobTitle'>
                      <InputGroup>
                        <Input
                          name={'jobTitle'}
                          type={'text'}
                          placeholder={'Fonction'}
                          isValid={
                            dirty && touched.jobTitle && !errors.jobTitle
                          }
                          isInvalid={
                            dirty && touched.jobTitle && errors.jobTitle
                          }
                        />
                        <InputError>
                          <p>{errors.jobTitle}</p>
                        </InputError>
                      </InputGroup>
                    </FormGroup>

                    <FormGroup controlId='phoneNumber'>
                      <InputGroup>
                        <Input
                          name={'phoneNumber'}
                          type={'text'}
                          placeholder={'Tél'}
                          isValid={
                            dirty && touched.phoneNumber && !errors.phoneNumber
                          }
                          isInvalid={
                            dirty && touched.phoneNumber && errors.phoneNumber
                          }
                        />
                        <InputError>
                          <p>{errors.phoneNumber}</p>
                        </InputError>
                      </InputGroup>
                    </FormGroup>

                    <FormGroup controlId='email'>
                      <InputGroup>
                        <Input
                          name={'email'}
                          type={'email'}
                          placeholder={'Email'}
                          isValid={dirty && touched.email && !errors.email}
                          isInvalid={dirty && touched.email && errors.email}
                        />
                        <InputError>
                          <p>{errors.email}</p>
                        </InputError>
                      </InputGroup>
                    </FormGroup>

                    <FormGroup controlId='plainPassword'>
                      <InputGroup>
                        <Input
                          name={'plainPassword'}
                          type={'password'}
                          placeholder={'Nouveau mot de passe'}
                          autoComplete={'false'}
                          isValid={
                            dirty &&
                            touched.plainPassword &&
                            !errors.plainPassword
                          }
                          isInvalid={
                            dirty &&
                            touched.plainPassword &&
                            errors.plainPassword
                          }
                        />
                        <InputError>
                          <p>{errors.plainPassword}</p>
                        </InputError>
                      </InputGroup>
                    </FormGroup>

                    <FormGroup controlId='confirmPassword'>
                      <InputGroup>
                        <Input
                          name={'confirmPassword'}
                          type={'password'}
                          placeholder={'Confirmer le mot de passe'}
                          autoComplete={'false'}
                          isValid={
                            dirty &&
                            touched.confirmPassword &&
                            !errors.confirmPassword
                          }
                          isInvalid={
                            dirty &&
                            touched.confirmPassword &&
                            errors.confirmPassword
                          }
                        />
                        <InputError>
                          <p>{errors.confirmPassword}</p>
                        </InputError>
                      </InputGroup>
                    </FormGroup>
                    {errors.global ? (
                      <div className={'form-error'}>
                        <p>{errors.global}</p>
                      </div>
                    ) : null}
                    <div className={'text-center'}>
                      <Button
                        variant={'cta secondary'}
                        type='submit'
                        className={'align-content-center mt-3'}
                        disabled={!(isValid && dirty) || isSubmitting}
                      >
                        <span> Mettre à jour mes données</span>
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={3}>
          <Card>
            <Card.Body style={{ textAlign: 'center' }}>
              <Button variant={'action'} onClick={toggleContactUs}>
                Contacter Jean-Michel
              </Button>
            </Card.Body>
          </Card>

          <Card className={'mt-3'}>
            <Card.Body style={{ textAlign: 'center' }}>
              <Button variant={'cta secondary'} onClick={toggleConfirm}>
                Supprimer mon compte
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MyAccount;
