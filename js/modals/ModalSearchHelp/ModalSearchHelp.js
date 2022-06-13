import React, {useContext} from "react";
import {ModalContext} from "../../contexts/ModalContext";
import Modal, {ModalBody, ModalHeader, ModalSubTitle, ModalTitle} from "../Modal";
import classes from "./help.module.scss"
import Button from "../../components/Buttons/Button";


export default function ModalSearchHelp() {

    const {isShowingHelp, toggleHelp} = useContext(ModalContext);

    return(
        <Modal
            isShowing={isShowingHelp}
            toggle={toggleHelp}
            className={"help-modal"}
            hideSeparation
        >
            <ModalHeader closeButton>
                <ModalTitle>Jean-Michel ALED</ModalTitle>
            </ModalHeader>

            <ModalSubTitle>
                Jean-Michel.io vous permet d'affiner vos recherches avec des opérateurs booléens :
            </ModalSubTitle>

            <ModalBody className={classes.container}>
                <ul>
                    <li><span>A ET B</span> :&nbsp;&nbsp;affiche les profils contenant obligatoirement les mots-clés A et B.</li>
                    <li><span>A OU B</span> :&nbsp;&nbsp;affiche les profils contenant soit A soit B soit les deux.</li>
                    <li><span>"A B"</span> :&nbsp;&nbsp;affiche les profils qui contiennent les mots-clés A et B dans cet ordre et séparés par un espace. Les profils avec le texte suivant n'apparaitront donc pas : texte A texte B.</li>
                    <li><span>A NOT B</span> :&nbsp;&nbsp;affiche les profils qui contiennent le mot-clé A en excluant les profils qui contiennent le mot-clé B.</li>
                </ul>
                <p>Vous pouvez aussi utiliser des parenthèses ( ) pour combiner vos opérateurs booléens. Si vous ne mettez pas d'opérateur booléen le système considèrera qu'il y a un <span>OU</span> entre chaque mot-clé.</p>
                <p className={"example"}>Exemple de requête booléenne : <span className={"citation"}>"Chef de projet PHP" ET (javascript OU js)</span></p>

                <Button variant={"cta secondary"} onClick={toggleHelp}>
                    MAIS OUI C'EST CLAIR
                </Button>
            </ModalBody>
        </Modal>
    )
}