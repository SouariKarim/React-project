import React, {useContext} from 'react';
import './PricingDetails.scss';
import Table from 'react-bootstrap/Table';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import PricingPrice from '../PricingPrice/PricingPrice';
import Button from '../../Buttons/Button';
import {ModalContext} from '../../../contexts/ModalContext';
import useAuthManager from "../../../hooks/useAuthManager";
import ScrollIcon from "../../../res/icons/scroll.svg"
import Constant from "../../../constant";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import valueWithSpaces from "../../../utils/valueWithSpaces";


const Checked = () => {
    return <FontAwesomeIcon style={{color: '#00DDD0'}} icon={faCheck}/>;
}

const NotChecked = () => {
    return <FontAwesomeIcon style={{color: 'red'}} icon={faTimes}/>
}


export default function PricingDetails({metrics}) {

    const {toggleRegistration, toggleContactUsToSubscribe} = useContext(ModalContext);
    const {isLogged, user} = useAuthManager();
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
        <div className='pricing-details w-100'>
            <Table>
                <thead className={"price-table-name"}>
                <tr>
                    <th/>
                    <th>Radin</th>
                    <th>Smart</th>
                    <th>Tout-Puissant</th>
                </tr>
                </thead>

                <thead className={"price-table-cvtheque"}>
                <tr>
                    <th><h3>cvth??que</h3></th>
                    <th/>
                    <th/>
                    <th/>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <th>Acc??s au LinkedIn des freelances</th>
                    <th><Checked/></th>
                    <th><Checked/></th>
                    <th><Checked/></th>
                </tr>

                <tr>
                    <th>Liens vers les r??seaux sociaux des freelances</th>
                    <th><Checked/></th>
                    <th><Checked/></th>
                    <th><Checked/></th>
                </tr>

                <tr>
                    <th>Acc??s aux coordonn??es des freelances (mail + t??l??phone)</th>
                    <th><NotChecked/></th>
                    <th><Checked/></th>
                    <th><Checked/></th>
                </tr>

                <tr>
                    <th>Poster des commentaires priv??s et des notations sur les freelances</th>
                    <th><Checked/></th>
                    <th><Checked/></th>
                    <th><Checked/></th>
                </tr>

                <tr>
                    <th>Acc??s aux Tarifs Journaliers des freelances</th>
                    <th><NotChecked/></th>
                    <th><Checked/></th>
                    <th><Checked/></th>
                </tr>

                <tr>
                    <th>Acc??s aux {valueWithSpaces(totalFreelances)} freelances standards</th>
                    <th><Checked/></th>
                    <th><Checked/></th>
                    <th><Checked/></th>
                </tr>

                <tr>
                    <th>Acc??s aux {valueWithSpaces(totalPremiumFreelances)} freelances premiums</th>
                    <th><NotChecked/></th>
                    <th><Checked/></th>
                    <th><Checked/></th>
                </tr>
                </tbody>


                <thead>
                <tr>
                    <th><h3>annonces et intercontrats</h3></th>
                    <th/>
                    <th/>
                    <th/>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <th>Diffuser des annonces de recherche de consultants</th>
                    <th>Bient??t</th>
                    <th>Bient??t</th>
                    <th>Bient??t</th>
                </tr>
                <tr>
                    <th>Diffuser vos intercontrats sur Jean-Michel.io</th>
                    <th>Bient??t</th>
                    <th>Bient??t</th>
                    <th>Bient??t</th>
                </tr>
                </tbody>


                <thead>
                <tr>
                    <th><h3>avanc??es</h3></th>
                    <th/>
                    <th/>
                    <th/>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <th>T??l??chargement des CV normalis??s</th>
                    <th>CV brand??s, format PDF</th>
                    <th>CV non brand??s, format DOCX</th>
                    <th>CV non brand??s, format DOCX</th>
                </tr>
                <tr>
                    <th>T??l??chargement des CV originaux (si publiques)</th>
                    <th><NotChecked/></th>
                    <th><Checked/></th>
                    <th><Checked/></th>
                </tr>
                </tbody>


                <thead>
                <tr>
                    <th><h3>Support</h3></th>
                    <th/>
                    <th/>
                    <th/>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <th>En ligne de 8h ?? 17h</th>
                    <th><Checked/></th>
                    <th><Checked/></th>
                    <th><Checked/></th>
                </tr>
                <tr>
                    <th>Courtoisie de l?????quipe support ?? votre ??gard</th>
                    <th>Un peu</th>
                    <th>Beaucoup</th>
                    <th>?? la folie</th>
                </tr>
                </tbody>


                <thead className={"pricing-table-rappel"}>
                <tr>
                    <th/>
                    <th>Radin</th>
                    <th>Smart</th>
                    <th>Tout-Puissant</th>
                </tr>
                </thead>

                <tbody>
                <tr className='no-bg-color'>
                    <th/>

                    <th>
                        <PricingPrice price={Constant.PRICING_RADIN} isSpanGrey={false}/>
                    </th>

                    <th>
                        <PricingPrice price={Constant.PRICING_SMART}
                                      priceWithReduction={Constant.PRICING_SMART_REDUCTION} isSpanGrey={false}/>
                    </th>

                    <th>
                        <PricingPrice price={Constant.PRICING_TOUT_PUISSANT}
                                      priceWithReduction={Constant.PRICING_TOUT_PUISSANT_REDUCTION}
                                      isSpanGrey={false}/>
                    </th>
                </tr>

                <tr className='no-bg-color'>
                    <th/>

                    <th>
                        <Button className='subscribe-button' variant={"action"}
                                onClick={() => {
                                    clickCta({subscriptionCode: Constant.SUBSCRIPTION_CODE_RADIN})
                                }}
                                disabled={disabledButton({code: Constant.SUBSCRIPTION_CODE_RADIN})}

                        >Souscrire</Button>
                    </th>
                    <th>
                        <Button className='subscribe-button' variant={"action"}
                                onClick={() => {
                                    clickCta({subscriptionCode: Constant.SUBSCRIPTION_CODE_SMART})
                                }}
                                disabled={disabledButton({code: Constant.SUBSCRIPTION_CODE_SMART})}
                        >Souscrire</Button>
                    </th>
                    <th>
                        <Button className='subscribe-button' variant={"action"}
                                onClick={() => {
                                    clickCta({subscriptionCode: Constant.SUBSCRIPTION_CODE_TOUT_PUISSANT})
                                }}
                                disabled={disabledButton({code: Constant.SUBSCRIPTION_CODE_TOUT_PUISSANT})}

                        >Souscrire</Button>
                    </th>
                </tr>
                </tbody>
            </Table>

            <div className={"scroll-indicator"}>
                <img src={ScrollIcon} alt={"Scroll icon"}/>
                <span>Scroll ?? droite pour plus d'informations</span>
            </div>
        </div>
    );
};