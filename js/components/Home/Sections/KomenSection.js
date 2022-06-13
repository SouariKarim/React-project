import SecondaryTitle from "../../Titles/SecondaryTitle";
import "./sections.scss"
import {Container, Row, Col} from "react-bootstrap";
import AboutCard from "../../AboutCard/AboutCard";
import {faMagic, faRobot, faUserNinja} from "@fortawesome/free-solid-svg-icons";
import {faSearchengin} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import TextTitle from "../../Titles/TextTitle";


const ABOUT_KEYS = [
    {
        icon: faRobot,
        title: "Scraping des freelances",
        content: "Nos robots recherchent les freelances sur le web et les ajoutent sur Jean-Michel.io."
    },
    {
        icon: faMagic,
        title: "Enrichissement des datas",
        content: "Nos équipes recherchent et ajoutent pour chaque freelance : tel, mail, tarif, mobilité et disponibilité."
    },
    {
        icon: faSearchengin,
        title: "Moteur de recherche",
        content: "Les freelances enrichis sont visibles dans un moteur de recherche avec des filtres multi-critères."
    },
]


export default function KomenSection({ className = ''}) {

    return(
        <section className={"komen " + className}>
            <SecondaryTitle title={"Jean-Michel KOMENKONFAIT"}/>
            <Container>
                <Row className={"about-keys"}>
                    {ABOUT_KEYS.map((key, index) =>
                        <Col key={index} lg={4} className={"mt-5"}>
                            <AboutCard {...key}/>
                        </Col>
                    )}
                </Row>
                <Row className={"justify-content-center"}>
                    <Col lg={12}>
                        <Container className={"about-freelances"}>
                            <Row className={"justify-content-center"}>
                                <Col lg={2} className={"icon-col"}>
                                    <FontAwesomeIcon className={"icon"} icon={faUserNinja}/>
                                </Col>

                                <Col lg={8}>
                                    <TextTitle title={"Les Freelances scrapés par Jean-Michel.io recherchent :"}/>
                                    <ul className={"list"}>
                                        <li>Missions IT : MOA, Systèmes & Réseaux, Cybersécurité, ERP, Exploitation, Devs ...</li>
                                        <li>Missions en Régie / AT</li>
                                        <li>Missions longues à temps plein (ou presque)</li>
                                        <li>Missions Grands Comptes par le biais des ESN/SSII</li>
                                    </ul>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
