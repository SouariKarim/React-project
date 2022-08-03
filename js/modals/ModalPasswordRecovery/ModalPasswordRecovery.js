// modal for recovering passwords

import React, { useContext, useState } from 'react';
import { Col, Container, FormGroup, Row } from 'react-bootstrap';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../Modal';
import Button from '../../components/Buttons/Button';
import './ModalPasswordRecovery.scss';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import InputGroup from '../../components/Form/InputGroup';
import InputError from '../../components/Form/InputError';
import { Input } from '../../components/Form/Input';
import { ModalContext } from '../../contexts/ModalContext';
import useUsersApi from '../../hooks/useUsersApi';
import useToast from '../../hooks/useToast';

const PasswordRecoverySchema = Yup.object().shape({
  email: Yup.string().email('Email invalide').required('Emails requis'),
});

const ModalPasswordRecovery = () => {
  const [isLModalRecoveryLoading, setIsModalRecoveryLoading] = useState(false);
  const { generateNewPassword } = useUsersApi();
  const toast = useToast();
  const { toggleLogin, togglePasswordRecovery, isShowingPasswordRecovery } =
    useContext(ModalContext);

  const onSubmit = (values, { setSubmitting, setFieldError }) => {
    setIsModalRecoveryLoading(true);

    toast
      .promise({
        promise: generateNewPassword(values),
        loadingText: 'Réinitialisation de votre mot de passe',
        successText: 'Nouveau mot de passe envoyé !',
        errorText: 'Le formulaire semble invalide',
      })
      .then(() => {
        toggleLogin(true);
        togglePasswordRecovery(false);
      })
      .catch((errors) => {
        if (Array.isArray(errors)) {
          for (const formError of errors) {
            let field = formError.getField();
            setFieldError(field, formError.getMessages());
          }
        } else {
          toast.error({
            text: 'Une erreur inconnue est survenue',
          });
        }
        setSubmitting(false);
      })
      .finally(() => {
        setIsModalRecoveryLoading(false);
      });
  };

  return (
    <Modal
      isShowing={isShowingPasswordRecovery}
      isLoading={isLModalRecoveryLoading}
      hideSeparation
      toggle={togglePasswordRecovery}
      className='modal-password-recovery'
      text={'Jean-Michel LAPOSTE'}
    >
      <ModalHeader closeButton>
        <ModalTitle>Récupération du mot de passe</ModalTitle>
      </ModalHeader>

      <ModalBody>
        <Container>
          <Row className='justify-content-md-center'>
            <Col>
              <p>Merci d'indiquer l'email de votre compte.</p>
              <p>
                Jean-Michel vous enverra un mot de passe tout beau, tout neuf
              </p>
            </Col>
          </Row>
          <Formik
            initialValues={{ email: '' }}
            validationSchema={PasswordRecoverySchema}
            validateOnMount={true}
            enableReinitialize
            onSubmit={(values, actions) => onSubmit(values, actions)}
          >
            {({ errors, touched, isSubmitting, isValid, dirty }) => (
              <Form>
                <FormGroup controlId='email'>
                  <InputGroup>
                    <Input
                      name={'email'}
                      type={'email'}
                      placeholder={'Email'}
                      isValid={
                        dirty &&
                        touched.email &&
                        !errors.email &&
                        !errors.global
                      }
                      isInvalid={
                        dirty &&
                        touched.email &&
                        (errors.email || errors.global)
                      }
                    />
                    {errors.email && <InputError>{errors.email}</InputError>}
                  </InputGroup>
                </FormGroup>
                {errors.global && (
                  <div className='form-error'>
                    <p>{errors.global}</p>
                  </div>
                )}

                <Row>
                  <Col className='text-center my-2'>
                    <Button
                      type='submit'
                      variant='cta secondary'
                      disabled={!(isValid && dirty) || isSubmitting}
                    >
                      Envoyer
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Container>
      </ModalBody>
    </Modal>
  );
};

export default ModalPasswordRecovery;
