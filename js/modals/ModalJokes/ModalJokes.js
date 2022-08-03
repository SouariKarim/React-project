// getting a joke from the backend an render it in a modal

import Modal, {ModalBody, ModalHeader, ModalTitle} from "../Modal";
import React, {useContext, useEffect, useState} from "react";
import {ModalContext} from "../../contexts/ModalContext";
import {Col, Container, Row} from "react-bootstrap";
import Button from "../../components/Buttons/Button";
import "./ModalJokes.scss"
import useApi from "../../hooks/useApi";
import JmSpinner from "../../components/JmSpinner/JmSpinner";


export default function ModalJokes() {

    const {isShowingJokes, toggleJokes} = useContext(ModalContext);
    const {get} = useApi({resourceName: "jokes"}) // provide the resource name to construct an url for the backend requests
    const [joke, setJoke] = useState("")
    const [answer, setAnswer] = useState("")
    const [isLoading, setLoading] = useState(false)


    const reloadJokes = () => {
        setLoading(true)
        get({url: ''}) // get the joke from the backend
            .then((res) => {
                setJoke(res.joke)
                setAnswer(res.answer)
                setLoading(false)
            })
    }


    useEffect(() => {
        if (isShowingJokes) {
            reloadJokes()
        }
        // eslint-disable-next-line
    }, [isShowingJokes])


    return (
        <Modal isShowing={isShowingJokes} toggle={toggleJokes}
               className={"jokes-modal"}
               hideSeparation>

            <ModalHeader closeButton>
                <ModalTitle>Jean-Michel KOMIQUE</ModalTitle>
            </ModalHeader>

            <ModalBody>
                <Container fluid className={"jokes"}>
                    <Row>
                        <Col className={"jokes-body"}>
                            {isLoading ?
                                <JmSpinner text={"Voyons ce qu'on a ..."}/>
                                :
                                <>
                                    <p className={"generator joke"}>
                                        {joke}
                                    </p>

                                    <p className={"generator answer"}>
                                        {answer}
                                    </p>
                                </>
                            }
                        </Col>
                    </Row>

                    <Row className="justify-content-center mt-4">
                        <Col>
                            <Button onClick={reloadJokes} variant={'cta secondary'}>Encore !</Button>
                        </Col>
                    </Row>

                    <div className={"disclaimer"}>
                        Jean-Michel.io n'est pas l'auteur du contenu affiché. Ce dernier ne traduit aucunement nos valeurs et ne pourra en aucun cas faire l'objet d'une quelconque affiliation.
                        Pour consulter le projet open-source derrière ce générateur, rendez-vous sur <span>www.blagues-api.fr</span>.
                    </div>
                </Container>
            </ModalBody>
        </Modal>
    );
}