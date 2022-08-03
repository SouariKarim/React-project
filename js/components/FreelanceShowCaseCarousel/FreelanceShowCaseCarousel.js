// render the freelancers profile cards as a carousel
import React, { useEffect, useRef, useState } from 'react';
import './FreelanceShowCaseCarousel.scss';
import useFreelancesApi from '../../hooks/useFreelancesApi'; // request methods for getting freelancers
import FreelanceShowCaseCard from '../FreelanceShowCaseCard/FreelanceShowCaseCard'; // render a link containg the freelancer picture and contact info
import JmSpinner from '../JmSpinner/JmSpinner'; // render a spinner

const FreelanceShowCaseCarousel = () => {
  const { getFreelances } = useFreelancesApi(); // get the freelancers
  const [freelances, setFreelances] = useState([]);
  const [loading, setLoading] = useState(false);
  const isMounted = useRef();

  useEffect(() => {
    setLoading(true);
    isMounted.current = true;

    getFreelances({ showcase: true })
      .then((freelances) => {
        if (isMounted.current) {
          setFreelances(freelances.freelances);
        }
      })
      .finally(() => {
        if (isMounted.current) {
          setLoading(false);
        }
      });
    return () => {
      isMounted.current = false;
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={'freelance-show-case-carousel'}>
        <div className=' py-4 px-md-3 justify-content-evenly d-flex flex-wrap'>
          {/* render the freelancers profile cards */}
          {freelances.map((freelance) => (
            <FreelanceShowCaseCard
              key={freelance.id}
              freelance={freelance}
              setLoading={setLoading}
            />
          ))}
        </div>

        {loading && <JmSpinner text='Jean-Michel KELQUEPROFILS' />}
      </div>
    </>
  );
};

export default FreelanceShowCaseCarousel;
