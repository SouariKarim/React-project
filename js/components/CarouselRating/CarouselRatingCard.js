import React from 'react';
import { Card, Col, Container, Row } from "react-bootstrap";
import { faQuoteLeft as QuoteLeft } from "@fortawesome/free-solid-svg-icons";
import "./CarouselRatingCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const CarouselRatingCard = ({quote, image, name, job, company, alt = "Jean-Michel.io"}) => {
    if(!job) job = 'freelance'
    if(!company) company = 'incognito'

    return (
        <Card body={ true } className={ "rating-card" }>
            <Container fluid>

                <Row>
                    <Col xs={ 1 }>
                        <FontAwesomeIcon className={ "quote-mark-icon" } icon={ QuoteLeft }/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={ {offset: 1} }>
                        <p className='quote'>{ quote }</p>
                    </Col>
                </Row>
                <Row>
                    <Col className="signature">
                        <img src={ image } alt={ alt }/>
                        <div  className="signature-text">
                            <div className="name">{ name }</div>
                            <div className="work">{ job } @{ company }</div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Card>
    )
};

export default CarouselRatingCard;