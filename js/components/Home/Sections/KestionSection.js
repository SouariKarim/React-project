import "./sections.scss"
import SecondaryTitle from "../../Titles/SecondaryTitle";
import {Col, Container, Row} from "react-bootstrap";
import React, {useContext} from "react";
import {ModalContext} from "../../../contexts/ModalContext";


export default function KestionSection({className = ''}) {

    const {toggleContactUsToRemove} = useContext(ModalContext);


    return(
        <section className={"kestion " + className}>
            <SecondaryTitle title={"Jean-Michel KESTION"} theme={"dark"}/>
            <Container fluid className={"kestion-container"}>
                <Row>
                    <Col xs={12} lg={4} className={"kestion-col"}>
                        <h6> Pourquoi Jean-Michel.io ?</h6>
                        <p>
                            Parce que Jean-Michel c’est le prénom du consultant à la pointe de l’innovation que l’on
                            rêve d’envoyer chez son client !
                        </p>

                        <h6>Est-ce que Jean-Michel.io est RGPD compatible ?</h6>
                        <p>Oui tout à fait !</p>
                        <p>Les CV que nous affichons sont fabriqués à partir de données publiques sur les freelances accessibles aux moteurs de recherche comme le nôtre.</p>
                        <p>Par ailleurs, la RGPD autorise aussi l'exploitation des datas de freelances considérées comme des datas professionnelles.</p>
                        <p>
                            Vous êtes consultant et souhaitez que l’on supprime vos données ? Demandez-le nous simplement et gentiment via le formulaire dédié (<span onClick={toggleContactUsToRemove}>cliquez ici</span>) et Jean-Michel se chargera lui-même de supprimer vos datas ! Mais avouez que ce serait dommage de rater la mission de vos rêves à cause de ça !
                        </p>
                    </Col>

                    <Col xs={12} lg={4} className={"kestion-col"}>
                        <h6> Comment ça marche ?</h6>

                        <p>
                            Contrairement aux autres plateformes de freelances où les consultants s’inscrivent pour être
                            visibles, Jean-Michel.io fonctionne comme un moteur de recherche et collecte les
                            informations visibles des freelances sur le web.
                        </p>

                        <p>
                            98% des freelances sont présents sur un réseau social professionnel, cela permet à
                            Jean-Michel.io d’avoir la plus grande base de freelances de France.
                        </p>

                        <h6>Est-ce que votre webdesigner se drogue ?</h6>

                        <p>On pourrait croire, impossible de trouver du bon personnel à notre époque.</p>
                    </Col>

                    <Col xs={12} lg={4} className={"kestion-col"} style={{paddingRight: 0}}>
                        <h6> Comment vous assurez-vous que
                            les datas affichées sont à jour ?</h6>

                        <p>
                            N’afficher que des freelances disponibles, avec un CV et un TJM à jour est notre priorité.
                            Pour cela, nous avons développé des algorithmes prédictifs capables d’interpréter l’activité
                            des freelances sur le web.
                        </p>
                        <p>
                            En cas de doute, nous contactons directement les freelances pour valider leur disponibilité
                            et s’assurer de la validité de nos datas.
                        </p>

                        <h6>Qui est derrière Jean-Michel ?</h6>
                        <p>
                            Une équipe d’anciens ingénieurs d’affaires et des freelances qui travaillent quotidiennement
                            à améliorer nos algorithmes et l’expérience utilisateur de Jean-Michel.io.
                        </p>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}