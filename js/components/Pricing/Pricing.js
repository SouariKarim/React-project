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
                    <h3 className={"more-credit-title"}>Vous souhaitez un devis personnalisé ?</h3>
                    <p>ou nous témoigner votre gratitude d'avoir conçu un outil si incroyable ?</p>
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
                            Qu’on le veuille ou non, le modèle traditionnel des SSII a récemment pris du plomb dans
                            l’aile. La raison est simple : +15% de freelances en IT chaque année.
                        </p>

                        <p style={{margin: 0}}>
                            Le passage d’un statut de salarié en ESN à celui d’indépendant a de nombreux motifs pour
                            le consultant :
                        </p>
                        <ul className={'ul'}>
                            <li>un gain de l’ordre de 50% sur le TJM.</li>
                            <li>un statut de portage salarial qui permet de conserver les avantages du salariat
                                (chomage, retaite, sécu).
                            </li>
                            <li>la possibilité de choisir ses missions.</li>
                            <li>une offre pléthorique due à un virage à 180° des services achats qui sont passés
                                d’un refus systématique des consultants indépendants à une forte appétence.
                            </li>
                        </ul>

                        <p>
                            Dans ce contexte certaines ESN se sont adaptées en restructurant leur service RH : d’un
                            objectif d’un nombre de recrutements mensuels on est passé à des objectifs de staffing
                            de
                            freelances ou d’intercontrats.
                        </p>
                        <p>
                        <span className={"testimony"}>
                        « Même si la marge sur le TJM est moins élevée, on s’y retrouve sur l’absence de risque
                        social et la possibilité de répondre à des besoins clients où l’on ne disposait pas de
                            ressources en interne. »</span>, a témoigné <span>Jean-Michel PRAGMATIQUE</span>.
                        </p>
                    </Col>
                    <Col xs={12} lg={5} className={"ps-lg-5"}>
                        <p>
                            Jean-Michel RECRUTEMENT a donc du évoluer en Jean-Michel STAFFING&nbsp;! Malheureusement
                            pour
                            lui les consultants indépendants sont bien cachés. Moins de la moitié sont inscrits sur
                            les plateformes de freelances et celles-ci ne sont pas toujours intéressées à travailler
                            en sous-traitance des ESN.
                        </p>
                        <p>
                            En revanche, tous les freelances ont un profil sur un réseau social professionnel.
                            Jean-Michel MALIN a donc décidé de les référencer à l’aide d’un algorithme mêlant
                            Intelligence Artificielle, Machine Learning et Big Data : Jean-Michel.io est né&nbsp;!
                        </p>
                        <p>
                            Le principe est simple, fournir un outil Saas aux ESN pour leur faciliter le virage du
                            freelancing, à commencer par une CVthèque exhaustive et mise à jour en temps réel de
                            tous les freelances recherchant des missions en AT.
                        </p>
                        <p>
                            L’ubérisation touche tous les secteurs et celui de la prestation IT n’est pas épargné.
                            Comme dans tous changements, il y a des gagnants et des perdants. L’anticipation et
                            l’adaptabilité détermineront qui appartiendra à l’une ou l’autre de ces 2 catégories.
                        </p>
                    </Col>
                </Row>
            </Container>

            <img alt={"rgpd freelance"} className="jm-say-rgpd" src={jmSayRgpd}/>
        </div>
    )
}