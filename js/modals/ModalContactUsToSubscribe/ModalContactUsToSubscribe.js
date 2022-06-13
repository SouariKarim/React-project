import React, {useContext, useEffect, useState} from 'react';
import {ModalContext} from "../../contexts/ModalContext";
import ModalContactUs from "../ModalContactUs/ModalContactUs";
import useAuthManager from "../../hooks/useAuthManager";
import Constant from "../../constant";


export default function ModalContactUsToSubscribe() {

	const { isShowingContactUsToSubscribe, toggleContactUsToSubscribe, optionContactUsToSubscribe } = useContext(ModalContext);
	const askFreeTrial = optionContactUsToSubscribe?.askFreeTrial? optionContactUsToSubscribe.askFreeTrial : false
	const subscriptionCode = optionContactUsToSubscribe?.subscriptionCode ? optionContactUsToSubscribe.subscriptionCode : null
	const {user} = useAuthManager();
	const [text, setText] = useState(null);


	useEffect(() => {
		if(askFreeTrial === false){
			let subscriptionText = "[choisir Smart ou Tout-Puissant]";

			if (subscriptionCode) {
				if (subscriptionCode === Constant.SUBSCRIPTION_CODE_RADIN) {
					subscriptionText = "Radin";
				} else if (subscriptionCode === Constant.SUBSCRIPTION_CODE_SMART) {
					subscriptionText = "Smart";
				} else if (subscriptionCode === Constant.SUBSCRIPTION_CODE_TOUT_PUISSANT) {
					subscriptionText = "Tout-Puissant";
				}
			}

			if (user && askFreeTrial === false) {
				setText("" +
					"Bonjour Jean-Michel,\n\n" +
					"Je souhaite upgrader mon compte en souscrivant à l'option payante " + subscriptionText + " et m'engage à régler dans les 48h après avoir reçu ma facture par email.\n\n" +
					"ID de mon compte : " + user.id + "\n\n" +
					"Je t'embrasse bien fort.");
			}
		}
		else{
			setText("" +
				"Bonjour Jean-Michel,\n\n" +
				"Je souhaite essayer gratuitement et sans engagement l'option Smart pour découvrir plus en profondeur votre sublime outil.\n\n" +
				"ID de mon compte : " + user.id + "\n\n" +
				"La bizz.");
		}

		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [subscriptionCode, user, askFreeTrial]);


	return (
		<ModalContactUs parentShowing={isShowingContactUsToSubscribe} parentToggle={toggleContactUsToSubscribe} text={text}/>
	)
}
