// create the toggle show or close methods for each modal used in this project (see the modals component folder)

import React, { useEffect } from 'react';
import useModal from '../hooks/useModal'; // toggle the modal show or close it
import { useLocation } from 'react-router-dom';

// create the context
export const ModalContext = React.createContext({});
ModalContext.displayName = 'ModalContext';
// the context consumer
export const ModalConsumer = ModalContext.Consumer;
// the provider
export const ModalProvider = ({ children }) => {
  const browserLocation = useLocation();

  // create different modals to use methods based on the useModal hook
  // every one of the below methods has its own build modal component in the modals forlder
  const [
    isShowingRegistration,
    toggleRegistration,
    optionRegistration,
    forceCloseRegistration,
  ] = useModal();
  const [isShowingLogin, toggleLogin, optionLogin, forceCloseLogin] =
    useModal();
  const [
    isShowingFreelanceContact,
    toggleFreelanceContact,
    optionFreelanceContact,
    forceCloseFreelanceContact,
  ] = useModal();
  const [
    isShowingContactUs,
    toggleContactUs,
    optionContactUs,
    forceCloseContactUs,
  ] = useModal();
  const [
    isShowingFreelancePremium,
    toggleModalFreelancePremium,
    optionFreelancePremium,
    forceCloseFreelancePremium,
  ] = useModal();
  const [
    isShowingContactUsToSubscribe,
    toggleContactUsToSubscribe,
    optionContactUsToSubscribe,
  ] = useModal();
  const [
    isShowingRegistrationConfirmation,
    toggleRegistrationConfirmation,
    optionRegistrationConfirmation,
  ] = useModal();
  const [
    isShowingPremiumFonctionality,
    togglePremiumFonctionality,
    optionPremiumFonctionality,
    forceClosePremiumFonctionality,
  ] = useModal();
  const [
    isShowingPasswordRecovery,
    togglePasswordRecovery,
    optionPasswordRecovery,
    forceClosePasswordRecovery,
  ] = useModal();
  const [
    isShowingFreelanceTJM,
    toggleFreelanceTJM,
    optionFreelanceTJM,
    forceFreelanceTJM,
  ] = useModal();
  const [isShowingJokes, toggleJokes, optionJokes, forceCloseJokes] =
    useModal();
  const [
    isShowingModeration,
    toggleModeration,
    optionModeration,
    forceCloseModeration,
  ] = useModal();
  const [
    isShowingFreelanceReport,
    toggleFreelanceReport,
    optionFreelanceReport,
    forceCloseFreelanceReport,
  ] = useModal();
  const [
    isShowingSurprise,
    toggleSurprise,
    optionSurprise,
    forceCloseSurprise,
  ] = useModal();
  const [isShowingHelp, toggleHelp, optionHelp, forceCloseHelp] = useModal();
  const [
    isShowingContactUsToRemove,
    toggleContactUsToRemove,
    optionContactUsToRemove,
    forceCloseContactUsToRemove,
  ] = useModal();
  const [
    isShowingSuccessRemove,
    toggleSuccessRemove,
    optionSuccessRemove,
    forceCloseSuccessRemove,
  ] = useModal();

  // close or modals on mount of the component
  useEffect(() => {
    forceCloseRegistration();
    forceCloseModeration();
    forceCloseLogin();
    forceCloseFreelanceContact();
    forceCloseContactUs();
    forceCloseFreelancePremium();
    forceClosePremiumFonctionality();
    forceClosePasswordRecovery();
    forceFreelanceTJM();
    forceCloseJokes();
    forceCloseFreelanceReport();
    forceCloseSurprise();
    forceCloseHelp();
    forceCloseContactUsToRemove();
    forceCloseSuccessRemove();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [browserLocation]);

  // each modal will use it own methods to toggle or the pass options etc (see the useModal hook)
  return (
    <ModalContext.Provider
      value={{
        isShowingLogin,
        toggleLogin,
        optionLogin,
        isShowingRegistration,
        toggleRegistration,
        optionRegistration,
        isShowingFreelanceContact,
        toggleFreelanceContact,
        optionFreelanceContact,
        isShowingContactUs,
        toggleContactUs,
        optionContactUs,
        isShowingFreelancePremium,
        toggleModalFreelancePremium,
        optionFreelancePremium,
        isShowingContactUsToSubscribe,
        toggleContactUsToSubscribe,
        optionContactUsToSubscribe,
        isShowingRegistrationConfirmation,
        toggleRegistrationConfirmation,
        optionRegistrationConfirmation,
        isShowingPremiumFonctionality,
        togglePremiumFonctionality,
        optionPremiumFonctionality,
        isShowingPasswordRecovery,
        togglePasswordRecovery,
        optionPasswordRecovery,
        isShowingFreelanceTJM,
        toggleFreelanceTJM,
        optionFreelanceTJM,
        isShowingJokes,
        toggleJokes,
        optionJokes,
        isShowingModeration,
        toggleModeration,
        optionModeration,
        isShowingFreelanceReport,
        toggleFreelanceReport,
        optionFreelanceReport,
        isShowingSurprise,
        toggleSurprise,
        optionSurprise,
        isShowingHelp,
        toggleHelp,
        optionHelp,
        isShowingContactUsToRemove,
        toggleContactUsToRemove,
        optionContactUsToRemove,
        isShowingSuccessRemove,
        toggleSuccessRemove,
        optionSuccessRemove,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
