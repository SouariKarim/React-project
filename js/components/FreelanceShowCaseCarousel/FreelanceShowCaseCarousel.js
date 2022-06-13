import React, { useEffect, useRef, useState } from 'react';
import "./FreelanceShowCaseCarousel.scss";
import useFreelancesApi from "../../hooks/useFreelancesApi";
import FreelanceShowCaseCard from "../FreelanceShowCaseCard/FreelanceShowCaseCard";
import JmSpinner from "../JmSpinner/JmSpinner";


const FreelanceShowCaseCarousel = () => {
    const {getFreelances} = useFreelancesApi();
    const [freelances, setFreelances] = useState([]);
    const [loading, setLoading] = useState(false);
    const isMounted = useRef();

    useEffect(() => {
        setLoading(true);
        isMounted.current = true;

        getFreelances({showcase: true}).then((freelances) => {
            if (isMounted.current) {
                setFreelances(freelances.freelances);
            }
        }).finally(() => {
            if (isMounted.current) {
                setLoading(false);
            }
        });
        return () => {
            isMounted.current = false;
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className={"freelance-show-case-carousel"}>
                <div className=" py-4 px-md-3 justify-content-evenly d-flex flex-wrap">
                    {freelances.map((freelance) =>
                        <FreelanceShowCaseCard
                            key={ freelance.id }
                            freelance={ freelance }
                            setLoading={ setLoading }
                        />
                    )}
                </div>

                { loading && <JmSpinner text="Jean-Michel KELQUEPROFILS"/> }
            </div>
        </>
    )
};

export default FreelanceShowCaseCarousel;
