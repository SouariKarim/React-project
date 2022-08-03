// render the freelancer profile image after getting it from the backend

import React, { useEffect, useState } from 'react';
import UnknownProfileImage from '../../res/images/freelance-default.jpg'; // default freelncer pic
import './FreelanceProfilePicture.scss';
import useFreelancesApi from '../../hooks/useFreelancesApi'; // request methods  for freelancers
import padlock from '../../res/images/padlock.jpg';
import { LazyLoadImage } from 'react-lazy-load-image-component'; // lazy load image in react

const FreelanceProfilePicture = ({
  freelance,
  hover,
  fromSearchPage = false,
}) => {
  const { getProfileImageUrl } = useFreelancesApi(); // get the freelancer profile image
  const [cssImage, setCssImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (freelance.premium && freelance.can_open_freelance === false) {
      setImageUrl(padlock); // set the image url to padlock image
    } else if (freelance.has_profile_image === false) {
      setImageUrl(UnknownProfileImage); // set the freelancer profile image to the unknown image
    } else {
      setImageUrl(getProfileImageUrl(freelance.id, true)); // set the freelancer profile image to the getted image url from the backend request
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [freelance]);

  useEffect(() => {
    const css = ['profile-image'];
    if (hover) {
      css.push('hover');
    }

    setCssImage(css.join(' '));
  }, [hover]);

  return (
    <LazyLoadImage
      className={
        fromSearchPage
          ? cssImage + ' freelance-profile-picture'
          : cssImage + ' freelance-profile-picture from-search-page'
      }
      alt={'Freelance : ' + freelance.title}
      src={imageUrl}
    />
  );
};

export default FreelanceProfilePicture;
