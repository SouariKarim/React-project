import React, {useEffect} from "react";
import useModal from "../hooks/useModal";
import {useLocation} from "react-router-dom";

export const ModalContext = React.createContext({});
ModalContext.displayName = 'ModalContext';

export const ModalConsumer = ModalContext.Consumer;

export const ModalProvider = ({ children }) => {

	const browserLocation = useLocation();

	const [isShowingRegistration, toggleRegistration, optionRegistration, forceCloseRegistration] = useModal();
	const [isShowingLogin, toggleLogin, optionLogin, forceCloseLogin] = useModal();
	const [isShowingFreelanceContact, toggleFreelanceContact, optionFreelanceContact, forceCloseFreelanceContact] = useModal();
	const [isShowingContactUs, toggleContactUs, optionContactUs, forceCloseContactUs] = useModal();
	const [isShowingFreelancePremium, toggleModalFreelancePremium, optionFreelancePremium, forceCloseFreelancePremium] = useModal();
	const [isShowingContactUsToSubscribe, toggleContactUsToSubscribe, optionContactUsToSubscribe] = useModal();
	const [isShowingRegistrationConfirmation, toggleRegistrationConfirmation, optionRegistrationConfirmation] = useModal();
	const [isShowingPremiumFonctionality, togglePremiumFonctionality, optionPremiumFonctionality, forceClosePremiumFonctionality] = useModal();
	const [isShowingPasswordRecovery, togglePasswordRecovery, optionPasswordRecovery, forceClosePasswordRecovery] = useModal();
	const [isShowingFreelanceTJM, toggleFreelanceTJM, optionFreelanceTJM, forceFreelanceTJM] = useModal();
	const [isShowingJokes, toggleJokes, optionJokes, forceCloseJokes] = useModal();
	const [isShowingModeration, toggleModeration, optionModeration, forceCloseModeration] = useModal();
	const [isShowingFreelanceReport, toggleFreelanceReport, optionFreelanceReport, forceCloseFreelanceReport] = useModal();
	const [isShowingSurprise, toggleSurprise, optionSurprise, forceCloseSurprise] = useModal();
	const [isShowingHelp, toggleHelp, optionHelp, forceCloseHelp] = useModal();
	const [isShowingContactUsToRemove, toggleContactUsToRemove, optionContactUsToRemove, forceCloseContactUsToRemove] = useModal();
	const [isShowingSuccessRemove, toggleSuccessRemove, optionSuccessRemove, forceCloseSuccessRemove] = useModal();


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
	}, [browserLocation])


	return (
		<ModalContext.Provider value={
			{
				isShowingLogin, toggleLogin, optionLogin,
				isShowingRegistration, toggleRegistration, optionRegistration,
				isShowingFreelanceContact, toggleFreelanceContact, optionFreelanceContact,
				isShowingContactUs, toggleContactUs, optionContactUs,
				isShowingFreelancePremium, toggleModalFreelancePremium,optionFreelancePremium,
				isShowingContactUsToSubscribe,toggleContactUsToSubscribe, optionContactUsToSubscribe,
				isShowingRegistrationConfirmation, toggleRegistrationConfirmation, optionRegistrationConfirmation,
				isShowingPremiumFonctionality, togglePremiumFonctionality, optionPremiumFonctionality,
				isShowingPasswordRecovery, togglePasswordRecovery, optionPasswordRecovery,
				isShowingFreelanceTJM, toggleFreelanceTJM, optionFreelanceTJM,
				isShowingJokes, toggleJokes, optionJokes,
				isShowingModeration, toggleModeration, optionModeration,
				isShowingFreelanceReport, toggleFreelanceReport, optionFreelanceReport,
				isShowingSurprise, toggleSurprise, optionSurprise,
				isShowingHelp, toggleHelp, optionHelp,
				isShowingContactUsToRemove, toggleContactUsToRemove, optionContactUsToRemove,
				isShowingSuccessRemove, toggleSuccessRemove, optionSuccessRemove
			}
		}>
			{children}
		</ModalContext.Provider>
	);
};