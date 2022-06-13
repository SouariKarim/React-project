import "./sections.scss"
import SecondaryTitle from "../../Titles/SecondaryTitle";
import {Col, Container, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import CarouselRating from "../../CarouselRating/CarouselRating";
import React from "react";
import TextTitle from "../../Titles/TextTitle";


export default function TemoinSection({className = ''}) {

    return(
        <section className={"temoin " + className}>
            <SecondaryTitle title={"Jean-Michel TEMOIN"}/>
            <Container fluid className={"temoignage-container"}>
                <Row className="justify-content-center">
                    <Col xs={12} sm={10} xl={5} className='left-side text-xl-left text-center mt-5'>
                        <TextTitle title={"1000+ ESN utilisent Jean-Michel.io pour sourcer leurs freelances en régie"} className={"temoin-sub"}/>

                        <div className='review d-xl-flex'>
                            <div className='stars'>
                                <FontAwesomeIcon className="quote-mark-icon" icon={faStar}/>
                                <FontAwesomeIcon className="quote-mark-icon" icon={faStar}/>
                                <FontAwesomeIcon className="quote-mark-icon" icon={faStar}/>
                                <FontAwesomeIcon className="quote-mark-icon" icon={faStar}/>
                                <FontAwesomeIcon className="quote-mark-icon" icon={faStar}/>
                            </div>

                            <p>
                                5/5 d'après nous
                            </p>
                        </div>
                    </Col>
                    <Col xs={12} xl={5} className='right-side mt-5'>
                        <CarouselRating/>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}