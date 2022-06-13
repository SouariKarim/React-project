import React, {useContext, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import Modal, {ModalBody, ModalFooter, ModalHeader, ModalTitle} from "../Modal";
import FreelanceProfileContact from "../../components/FreelanceProfile/FreelanceProfileContact/FreelanceProfileContact";
import './ModalFreelanceContact.scss';
import {ModalContext} from "../../contexts/ModalContext";


const quotes = [
    "Je n'ai pas parle a ma belle-mere depuis 18 mois. Je n'aime pas l'interrompre.",
    "L'amour, c'est comme les cartes : si tu n'as pas de partenaire, il te faut une bonne main.",
    "L'ennemi est bete : il croit que c'est nous l'ennemi alors que c'est lui",
    "Quand un philosophe me repond, je ne comprends plus ma question",
    "Les hommes qui disent que les femmes sont frigides ne sont que des mauvaises langues",
    "Il etait tellement obsede qu'a la fin il sautait meme des repas",
    "Le chef d'orchestre a son utilite : quand il arrete de gigoter, les sourds savent qu'il faut applaudir",
    "Je me suis souvent demande ce qui peut bien differencier une bonne grippe d'une mauvaise",
    "En fait ce sont les voix a l'exterieur de ma tete qui me derangent le plus",
    "Je suis quelqu'un de simple mais avec un cerveau un peu complique",
    "D'apres les chimistes, l'alcool est une solution",
    "Selon une etude, 65% de la valise d'une femme est composee de 'on ne sait jamais'",
    "Si on pose un cameleon sur une robe desigual, est-ce qu'il meure d'epuisement ?",
    "J'ai un corps de reve, le reste du temps je suis reveille",
    "je vis la nuit parce qu'on m'a dit que j'allais mourir un jour",
    "La vie n'est pas un conte de fees. Si vous perdez une chaussure a minuit c'est que vous avez trop bu",
    "Attention, le nutella fait retrecir les jeans",
    "Bien sur que je me parle a moi meme. J'ai souvent besoin de l'avis d'un expert",
    "J'aimerais bien etre d'accord avec toi, mais alors nous serions 2 a avoir tort",
    "Nous sommes plusieurs dans ma tete mais c'est moi le chef",
    "Je bois pour rendre les autres plus interessants",
    "le lait noie les cereales donc le lait est un cereales-killer",
    "de temps en temps quelqu'un d'incroyable arrive... Et me voila",
    "les femmes se raveillent en baillant, les hommes se reveillent en erection. Coincidence ?",
    "si je mange un pepito la nuit, est-ce que ca devient un pepitard ?",
    "on peut rire de tout mais pas en mangeant de la semoule",
    "Je ne bois jamais a outrance, je ne sais meme pas ou c'est",
    "L'ouverture d'esprit n'est pas une fracture du crane",
    "Je n'ai jamais abuse de l'alcool, il a toujours ete consentant",
    "Si vous parlez a Dieux, vous etes croyant... S'il vous repond, vous etes schizophrene",
    "5 fruits et legumes par jour, ils me font marrer... Moi, a la troisieme pasteque, je cale",
    "L'alcool tue, mais combien sont nes grace a lui ?",
    "Un jour j'irai vivre en Theorie, car en Theorie tout se passe bien",
    "La medecine du travail est la preuve que le travail est bien une maladie !",
    "Le lundi, je suis comme Robinson Crusoe, j'attends Vendredi",
    "Dieux a donne un cerveau et un sexe a l'homme mais pas assez de sang pour irriguer les deux a la fois",
    "C'est avec les plus grands crus qu'on fait les meilleures cuites"
];

const footerQuotes = [
    "Ils sont scrappés sur le web.",
    "Jean-Michel.io est un agrégateur.",
    "Ils sont captés par nos robots depuis diverses sources.",
  ];

const Footer = ({style = {}, freelance}) => {
    const footerQuote = footerQuotes[Math.round(Math.random() * (footerQuotes.length-1))];
    const [sources] = useState(() => {
        const sources = [];

        if (freelance.premium) {
            sources.push('communiqué par une ESN partenaire');
        }
        if (freelance.isFromJeanPaul) {
            sources.push('Jean-Paul.io')
        }
        if (freelance.social_networks.linkedin) {
            sources.push('Linkedin');
        }
        if (freelance.social_networks.malt) {
            sources.push('Malt');
        }
        if (freelance.social_networks.apec) {
            sources.push('Apec');
        }

        return sources;
    });

    return (
        <div id="contact-footer" style={{...style, ...{paddingTop: "1rem", paddingBottom: '1rem', textAlign: "center", width: "100%"}}}>
            <p>ATTENTION</p>
            <p>Les freelances sur Jean-Michel.io ne s'y sont pas inscrits.<br />{footerQuote}</p>
            {sources.length > 0 && (
                <p style={{textAlign: 'left'}}><span className="font-weight-bold">Source(s) de ce profil :</span> {sources.join(', ')}</p>
            )}
        </div>
    )
}

const ModalFreelanceContact = () => {

    const {isShowingFreelanceContact, toggleFreelanceContact, optionFreelanceContact} = useContext(ModalContext);
    const freelance = optionFreelanceContact?.freelance ;
    const quote = quotes[Math.round(Math.random() * (quotes.length-1))];


    return (
        <Modal isShowing={isShowingFreelanceContact} toggle={toggleFreelanceContact} className={"freelance-contact-modal"}>
            <ModalHeader closeButton>
                <ModalTitle>Coordonnées de {freelance?.full_name}</ModalTitle>
            </ModalHeader>

            {freelance &&
                <>
                    <ModalBody>
                        <Container>
                            <Row>
                                <Col className="quote">
                                    <p className={"font-market-notes"}>"&nbsp;{quote}&nbsp;"</p>
                                    <p className={"font-market-notes signature"}>Jean-Michel</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FreelanceProfileContact freelance={freelance}/>
                                </Col>
                            </Row>
                        </Container>
                    </ModalBody>

                    <ModalFooter style={{backgroundColor: "rgb(44, 52, 63)"}}>
                        <Footer freelance={freelance}/>
                    </ModalFooter>
                </>
            }
        </Modal>
    );
};

export default ModalFreelanceContact;