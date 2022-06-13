import React, { createRef } from 'react'
import "./CarouselRating.scss";
import { Carousel } from "react-bootstrap";
import CarouselRatingCard from "./CarouselRatingCard";
import JmApeure from "../../res/images/jm-apeupre.png";
import JmPlanque from "../../res/images/jm-planque.png";
import JmNulEnGeo from "../../res/images/jm-nulengeo.png";
import JmAMoitie from "../../res/images/jm-amoitie.png";

const CarouselRating = () => {
    const wrapper = createRef();

    return (
        <Carousel className={ " carousel-rating justify-content-md-center" }
                  indicators={ true }
                  interval={ 7000 }
                  nextIcon={ null }
                  prevIcon={ null }>
            <Carousel.Item ref={ wrapper }>
                <CarouselRatingCard quote={ "Je trouve plein de freelances qui collent à peu près à nos appels d'offres !" }
                                    job={"Ingénieur d'affaires"}
                                    name={ "Jean-Michel APEUPRE" } alt={ "Jean-Michel Esn" } image={ JmApeure } company={"ESN"}/>
            </Carousel.Item>
            <Carousel.Item>
                <CarouselRatingCard quote={ "Je ne sais pas comment ils ont fait, mais ils ont trouvé mon CV !" }
                                    name={ "Jean-Michel PLANQUE" } alt={ "Jean-Michel le Freelance" }
                                    image={ JmPlanque }/>
            </Carousel.Item>
            <Carousel.Item>
                <CarouselRatingCard quote={ "Ils m'ont géolocalisé alors que moi-même je ne savais pas où j'étais." }
                                    name={ "Jean-Michel NULENGEO" }
                                    company={"TOMTOM"}
                                    alt={ "Jean-Michel de la Plateforme freelance" } image={ JmNulEnGeo }/>
            </Carousel.Item>
            <Carousel.Item>
                <CarouselRatingCard
                    quote={ "Les 2 points forts de Jean-Michel.io sont la qualité des consultants référencés" }
                    name={ "Jean-Michel AMOITIE" } alt={ "Jean-Michel Consultant informatique" }
                    company={"La mairie de"} job={"Recruteur"}
                    image={ JmAMoitie }/>
            </Carousel.Item>
        </Carousel>

    )
};

export default CarouselRating;