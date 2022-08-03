// render some functionlaties based on the user if he is premium or noraml user or if is not registred

import React, { useContext } from 'react';
import './TextPremium.scss';
import useAuthManager from '../../../hooks/useAuthManager';
import Button from '../../Buttons/Button';
import { ModalContext } from '../../../contexts/ModalContext';

const TextPremium = ({ children, isPremium }) => {
  const { user } = useAuthManager();
  const { toggleRegistration, toggleContactUsToSubscribe } =
    useContext(ModalContext);
  s;
  if (isPremium) {
    return <div className={'content-premium'}>{children}</div>;
  }

  if (user) {
    return (
      <span className='hidden-no-premium'>
        Fonctionnalité payante (
        <Button
          variant={'link'}
          onClick={toggleContactUsToSubscribe}
          className={'button-upgrade no-padding-important'}
        >
          upgrader mon compte
        </Button>
        )
      </span>
    );
  }

  return (
    <span className='hidden-no-premium'>
      Inscription nécéssaire (
      <Button
        variant={'link'}
        className={'button-upgrade no-padding-important'}
        onClick={toggleRegistration}
      >
        créer un compte
      </Button>
      )
    </span>
  );
};
export default TextPremium;
