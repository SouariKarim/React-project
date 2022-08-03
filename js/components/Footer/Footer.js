// render the footer based on the reduced value : if reduced render only one text and if not render every thing
import React, {useContext} from 'react';
import "./Footer.scss";
import {ModalContext} from '../../contexts/ModalContext'; // get the modalcontext containing the methods for a bunch of modals
import {Container, Row, Col} from "react-bootstrap";
import Brand from "../../res/logos/jean-michel-brand-white.svg"
import Button from "../Buttons/Button"; // button component
import ModalJokes from "../../modals/ModalJokes/ModalJokes"; // the joke modal component
import useAuthManager from "../../hooks/useAuthManager"; // auth methods


export default function Footer({ reduced = false }) {

	const { toggleContactUs, toggleRegistration, toggleJokes } = useContext(ModalContext);
	const { isLogged } = useAuthManager() // check if the user is logged

	return (
		<>
			<footer>
				<Container fluid className={"footer-container"}>
					{/* if the footer is not reduced render the price an so */}
					{reduced === false &&
						<Row className={"footer-top justify-content-center"}>
							<Col md={12} lg={5} className={"brand-col"}>
								<img src={Brand} alt={"logo jean-michel.io"}/>
								<p>CVthèque fun de freelances informatiques alimentée par des robots.</p>
							</Col>

							{(isLogged()) ?
								<Col sm={6} md={4} lg={2} className={"list-col"}>
									<p className={"list-title"}>NAVIGATION</p>
									<ul>
										<li><Button to={"SEARCH"} variant={"footer"}>CVthèque</Button></li>
										<li><Button to={"PRICING"} variant={"footer"}>Tarifs</Button></li>
									</ul>
								</Col>

								:

								<Col sm={6} md={4} lg={2} className={"list-col"}>
									<p className={"list-title"}>INSCRIPTION</p>
									<ul>
										<li><Button onClick={toggleRegistration} variant={"footer"}>Inscription ESN / SSII</Button></li>
										<li><Button href={"https://www.jean-paul.io/inscription"} target="_blank" rel="noopener noreferrer" variant={"footer"}>Inscription Freelance</Button></li>
									</ul>
								</Col>
							}


							<Col sm={6} md={4} lg={2} className={"list-col"}>
								<p className={"list-title"}>Général</p>
								<ul>
									<li><Button to={"RGPD_DPO"} variant={"footer"}>RGPD - DPO</Button></li>
									<li><Button to={"CGV"} variant={"footer"}>Mentions légales</Button></li>
									<li><Button onClick={toggleJokes} variant={"footer"}>Générateur de blagues</Button></li>
								</ul>
							</Col>

							<Col sm={12} md={4} lg={2} className={"list-col"}>
								<p className={"list-title"}>CONTACT</p>
								<ul>
									<li><Button variant={"footer"} onClick={toggleContactUs}>Nous contacter</Button></li>
									<li><Button href={"tel:+33755540503"} variant={"footer"}>+33 7 55 54 05 03</Button></li>
								</ul>
							</Col>
						</Row>
					}
{/*  render this anyway */}
					<Row>
						<Col className={"footer-bottom"}>
							© Jean-Michel.io 2019-2022 | Tous droits réservés
						</Col>
					</Row>
				</Container>
			</footer>

			<ModalJokes/>
		</>
	)
}
