import './layout.scss';
import ModalRegistration from '../modals/ModalRegistration/ModalRegistration';
import ModalLogin from '../modals/ModalLogin/ModalLogin';
import ModalPasswordRecovery from '../modals/ModalPasswordRecovery/ModalPasswordRecovery';
import useAuthManager from '../hooks/useAuthManager';
import React, { useContext, useEffect } from 'react';
import { ErrorCodeContext } from '../contexts/ErrorCodeContext';
import NotFound from '../components/NotFound/NotFound';
import ModalContactUs from '../modals/ModalContactUs/ModalContactUs';
import ModalContactUsToSubscribe from '../modals/ModalContactUsToSubscribe/ModalContactUsToSubscribe';
import ModalSearchHelp from '../modals/ModalSearchHelp/ModalSearchHelp';
import ModalContactUsToRemove from '../modals/ModalContactUsToRemove/ModalContactUsToRemove';
import ModalSuccessRequestRemove from '../modals/ModalContactUsToRemove/ModalSuccessRequestRemove/ModalSuccessRequestRemove';

export default function PageWrapper({ children, style }) {
  const { isLogged, user } = useAuthManager();
  const { errorCode, setErrorCode } = useContext(ErrorCodeContext);

  useEffect(() => {
    setErrorCode(null);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <div className={'page-wrapper'} style={style}>
        {/* render the child component if there is no code */}
        {(errorCode === undefined || errorCode === null) && children}
        {/* if there is an erro render the not found component */}
        {errorCode === 404 && <NotFound />}
      </div>
      {/* if the user is not logged in*/}
      {!isLogged() && (
        <>
          <ModalRegistration />
          <ModalLogin />
          <ModalPasswordRecovery />
        </>
      )}
      {/* render this anyway */}
      <ModalContactUsToSubscribe />
      <ModalContactUs />
      <ModalSearchHelp />
      <ModalContactUsToRemove />
      <ModalSuccessRequestRemove />
    </>
  );
}
