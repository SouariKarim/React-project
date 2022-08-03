// render the contact us modal to pass to premium user

import React, { useContext } from 'react';
import Button from '../Buttons/Button';
import { ModalContext } from '../../contexts/ModalContext';

const ReserverToPremiumUser = () => {
  const { toggleContactUsToSubscribe } = useContext(ModalContext);

  return (
    <div className='text-center register-profile'>
      <p>Réservé aux abonnés payants</p>
      <Button
        variant={'cta-large'}
        onClick={() => toggleContactUsToSubscribe({ askFreeTrial: true })}
      >
        Demander un test gratuit
      </Button>
    </div>
  );
};

export default ReserverToPremiumUser;
