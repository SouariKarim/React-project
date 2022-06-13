import React, {useContext} from 'react';
import './PricingPrez.scss';
import {Card, Col, Row} from 'react-bootstrap';
import LogoLunetteCasse from '../../../res/logos/jean-michel-radin.png';
import LogoLunetteClasse from '../../../res/logos/jean-michel-smart.png';
import LogoLunettePixel from '../../../res/logos/jean-michel-tout-puissant.png';
import Button from '../../Buttons/Button';
import PricingPrice from '../PricingPrice/PricingPrice';
import {ModalContext} from "../../../contexts/ModalContext";
import useAuthManager from "../../../hooks/useAuthManager";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import Constant from "../../../constant";
import valueWithSpaces from "../../../utils/valueWithSpaces";


export default function PricingPrez({ className = '', metrics }) {

	const { toggleRegistration, toggleContactUsToSubscribe } = useContext(ModalContext);
	const { isLogged, user } = useAuthManager();
	const {totalPremiumFreelances, totalFreelances} = metrics


	const clickCta = ({subscriptionCode}) => {
		if (!isLogged()) {
			toggleRegistration({subscriptionCode: subscriptionCode});
		} else {
			toggleContactUsToSubscribe({subscriptionCode: subscriptionCode});
		}
	}


	const disabledButton = ({code}) => {
		if (!user || !user.subscription) {
			return false;
		}

		const subcriptionCode = user.subscription.code;

		if (subcriptionCode === Constant.SUBSCRIPTION_CODE_TOUT_PUISSANT) {
			return true;
		}

		const subscriptions = [Constant.SUBSCRIPTION_CODE_RADIN, Constant.SUBSCRIPTION_CODE_SMART, Constant.SUBSCRIPTION_CODE_TOUT_PUISSANT];

		const indexSubcriptionCode = subscriptions.findIndex(value => value === subcriptionCode);
		const indexCode = subscriptions.findIndex(value => value === code);

		if (indexCode === false || indexSubcriptionCode === false) {
			return false;
		}

		return indexSubcriptionCode >= indexCode;
	}


	return (
		<div className={'pricing-prez ' + className}>
			<Row className='py-3 align-items-center justify-content-center position-relative mb-6'>
				<Col as={Card} xs={12} lg={4} style={{left: 25}}
					 className='side-card border-right-0 text-center align-items-center my-3 p-3'>
					<div className="pricing-prez-title m-2">Radin</div>

					<img className="m-3 price-logo"
						 src={LogoLunetteCasse}
						 alt={'freelance + jean-michel + radin'}
					/>

					<PricingPrice price={Constant.PRICING_RADIN}/>

					<div className='pricing-prez-offers my-3'>
						<span className={"main-offer"}>1 accès restreint<sup>*</sup></span>
						<span><FontAwesomeIcon icon={faCheck}/>Accès aux {valueWithSpaces(totalFreelances)} profils standards</span>
						<span><FontAwesomeIcon icon={faCheck}/> Liens vers les profils LinkedIn</span>
						<span className={"not-include-offer"}><FontAwesomeIcon icon={faTimes}/>Accès aux coordonnées et TJM</span>
						<span className={"not-include-offer"}><FontAwesomeIcon icon={faTimes}/>Accès aux {valueWithSpaces(totalPremiumFreelances)} profils Premium</span>
					</div>

					<Button className='my-2' variant="cta secondary"
							onClick={() => clickCta({subscriptionCode: Constant.SUBSCRIPTION_CODE_RADIN})}
							disabled={disabledButton({code: Constant.SUBSCRIPTION_CODE_RADIN})}>
						ALLEZ
					</Button>
					<div className="further-info">
						<p>Pas de CB demandée</p>
					</div>
				</Col>

				<Col as={Card} className='main-card text-center align-items-center p-3' xs={12} lg={4}>
					<div className="pricing-prez-title m-2">Smart</div>

					<img className="m-3 price-logo"
						 src={LogoLunetteClasse}
						 alt={'freelance + jean-michel + smart'}
					/>

					<PricingPrice price={Constant.PRICING_SMART} priceWithReduction={Constant.PRICING_SMART_REDUCTION}/>

					<div className='pricing-prez-offers my-3'>
						<span className={"main-offer"}>1 accès illimité<sup>*</sup></span>
						<span><FontAwesomeIcon icon={faCheck}/>Accès aux {valueWithSpaces(totalFreelances)} profils standards</span>
						<span><FontAwesomeIcon icon={faCheck}/> Liens vers les profils LinkedIn</span>
						<span><FontAwesomeIcon icon={faCheck}/> Accès aux coordonnées et TJM</span>
						<span><FontAwesomeIcon icon={faCheck}/> Accès aux {valueWithSpaces(totalPremiumFreelances)} profils Premium</span>
					</div>

					<Button className='my-2' variant="cta secondary"
							onClick={() => clickCta({subscriptionCode: Constant.SUBSCRIPTION_CODE_SMART})}
							disabled={disabledButton({code: Constant.SUBSCRIPTION_CODE_SMART})}
					>
						VIENS
					</Button>

					<div className="further-info">
						<p>Un seul consultant signé grâce à <br/>Jean-Michel.io rentabilise 2 ans d'abonnement !</p>
					</div>
				</Col>

				<Col as={Card} xs={12} lg={4} style={{right: 25}}
					 className='side-card border-left-0 text-center align-items-center my-3 p-3'>
					<div className="pricing-prez-title m-2">Tout-Puissant</div>

					<img className="m-3 price-logo"
						 src={LogoLunettePixel}
						 alt={'freelance + jean-michel + tout-puissant'}
					/>

					<PricingPrice price={Constant.PRICING_TOUT_PUISSANT} priceWithReduction={Constant.PRICING_TOUT_PUISSANT_REDUCTION}/>

					<div className='pricing-prez-offers my-3'>
						<span className={"main-offer"}>3 accès illimités<sup>*</sup></span>
						<span><FontAwesomeIcon icon={faCheck}/>Accès aux {valueWithSpaces(totalFreelances)} profils standards</span>
						<span><FontAwesomeIcon icon={faCheck}/> Liens vers les profils LinkedIn</span>
						<span><FontAwesomeIcon icon={faCheck}/> Accès aux coordonnées et TJM</span>
						<span><FontAwesomeIcon icon={faCheck}/> Accès aux {valueWithSpaces(totalPremiumFreelances)} profils Premium</span>

					</div>

					<Button className='my-2' variant="cta secondary"
							onClick={() => clickCta({subscriptionCode: Constant.SUBSCRIPTION_CODE_TOUT_PUISSANT})}
							disabled={disabledButton({code: Constant.SUBSCRIPTION_CODE_TOUT_PUISSANT})}
					>
						ON EST BIEN
					</Button>

					<div className="further-info">
						<p>Jean-Michel recueille un chaton abandonné pour chaque souscription</p>
					</div>

					<p className={"licence-disclaimer"}>
						*&nbsp; 1 accès = 1 connexion simultanée par entreprise
					</p>
				</Col>
			</Row>

			{/*
			<Row className='flex-column text-center pt-3 mt-5 mb-5'>
				<Col>
					<p className={"exceptional-offer"}><sup>*</sup> Offre exceptionnelle de nouvelle année</p>
				</Col>
				<Col>
					<SubscriptionsLoader />
				</Col>
			</Row>
			*/}
		</div>
	)
}
