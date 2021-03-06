import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import './Pricing.scss';
import Button from '../Buttons/Button';
import {ModalContext} from '../../contexts/ModalContext';
import PricingPrez from './PricingPrez/PricingPrez';
import PricingDetails from './PricingDetails/PricingDetails';
import jmSayRgpd from '../../res/illustrations/RGPD.jpg';
import MainTitle from "../Titles/MainTitle";
import BrandBand from "../Bands/BrandBand";
import useAxios from "../../hooks/useAxios";
import useMetricsApi from "../../hooks/useMetricsApi";
import Metric from "../../models/Metric";


export default function Pricing() {

    const [metrics, setMetrics] = useState(new Metric({}))
    const {getFreelancesMetric} = useMetricsApi()
    const {toggleContactUs} = useContext(ModalContext);
    const [cancelToken] = useState(useAxios().CancelToken.source())


    useEffect(() => {
        getFreelancesMetric({cancelToken: cancelToken.token}).then((metrics) => {
            setMetrics(metrics)
        }).catch(err => {
            console.error(err)
        });

        return () => {
            if (cancelToken) {
                cancelToken.cancel();
            }
        }

        // eslint-disable-next-line
    }, []);


    return (
        <div className={'pricing'}>
            <Container fluid className="section-1 mt-5">
                <MainTitle>
                    Quand le web devient votre vivier de Freelances
                </MainTitle>

                <PricingPrez className={"py-3"} metrics={metrics}/>
            </Container>

            <Container className="section-2 my-4 container-pricing-details">
                <Row>
                    <PricingDetails metrics={metrics}/>
                </Row>
            </Container>

            <BrandBand className={"pricing-band"}>
                <div className={"contact-us"}>
                    <h3 className={"more-credit-title"}>Vous souhaitez un devis personnalis√© ?</h3>
                    <p>ou nous t√©moigner votre gratitude d'avoir con√ßu un outil si incroyable ?</p>
                    <Button variant="action white" onClick={toggleContactUs}>
                        Contactez-nous
                    </Button>
                </div>
            </BrandBand>


            <Container fluid className={'speech py-5'}>
                <Row className={"mb-5"}>
                    <Col xs={12} className={"p"}>
                        <h2 className={'pb-4'}>ESN, ne ratez pas le virage du freelancing</h2>
                    </Col>
                </Row>
                <Row className={"justify-content-center"}>
                    <Col xs={12} lg={5} className={"pe-lg-5"}>
                        <p>
                            Qu‚Äôon le veuille ou non, le mod√®le traditionnel des SSII a r√©cemment pris du plomb dans
                            l‚Äôaile. La raison est simple : +15% de freelances en IT chaque ann√©e.
                        </p>

                        <p style={{margin: 0}}>
                            Le passage d‚Äôun statut de salari√© en ESN √† celui d‚Äôind√©pendant a de nombreux motifs pour
                            le consultant :
                        </p>
                        <ul className={'ul'}>
                            <li>un gain de l‚Äôordre de 50% sur le TJM.</li>
                            <li>un statut de portage salarial qui permet de conserver les avantages du salariat
                                (chomage, retaite, s√©cu).
                            </li>
                            <li>la possibilit√© de choisir ses missions.</li>
                            <li>une offre pl√©thorique due √† un virage √† 180¬į des services achats qui sont pass√©s
                                d‚Äôun refus syst√©matique des consultants ind√©pendants √† une forte app√©tence.
                            </li>
                        </ul>

                        <p>
                            Dans ce contexte certaines ESN se sont adapt√©es en restructurant leur service RH : d‚Äôun
                            objectif d‚Äôun nombre de recrutements mensuels on est pass√© √† des objectifs de staffing
                            de
                            freelances ou d‚Äôintercontrats.
                        </p>
                        <p>
                        <span className={"testimony"}>
                        ¬ę M√™me si la marge sur le TJM est moins √©lev√©e, on s‚Äôy retrouve sur l‚Äôabsence de risque
                        social et la possibilit√© de r√©pondre √† des besoins clients o√Ļ l‚Äôon ne disposait pas de
                            ressources en interne. ¬Ľ</span>, a t√©moign√© <span>Jean-Michel PRAGMATIQUE</span>.
                        </p>
                    </Col>
                    <Col xs={12} lg={5} className={"ps-lg-5"}>
                        <p>
                            Jean-Michel RECRUTEMENT a donc du √©voluer en Jean-Michel STAFFING&nbsp;! Malheureusement
                            pour
                            lui les consultants ind√©pendants sont bien cach√©s. Moins de la moiti√© sont inscrits sur
                            les plateformes de freelances et celles-ci ne sont pas toujours int√©ress√©es √† travailler
                            en sous-traitance des ESN.
                        </p>
                        <p>
                            En revanche, tous les freelances ont un profil sur un r√©seau social professionnel.
                            Jean-Michel MALIN a donc d√©cid√© de les r√©f√©rencer √† l‚Äôaide d‚Äôun algorithme m√™lant
                            Intelligence Artificielle, Machine Learning et Big Data : Jean-Michel.io est n√©&nbsp;!
                        </p>
                        <p>
                            Le principe est simple, fournir un outil Saas aux ESN pour leur faciliter le virage du
                            freelancing, √† commencer par une CVth√®que exhaustive et mise √† jour en temps r√©el de
                            tous les freelances recherchant des missions en AT.
                        </p>
                        <p>
                            L‚Äôub√©risation touche tous les secteurs et celui de la prestation IT n‚Äôest pas √©pargn√©.
                            Comme dans tous changements, il y a des gagnants et des perdants. L‚Äôanticipation et
                            l‚Äôadaptabilit√© d√©termineront qui appartiendra √† l‚Äôune ou l‚Äôautre de ces 2 cat√©gories.
                        </p>
                    </Col>
                </Row>
            </Container>

            <img alt={"rgpd freelance"} className="jm-say-rgpd" src={jmSayRgpd}/>
        </div>
    )
}