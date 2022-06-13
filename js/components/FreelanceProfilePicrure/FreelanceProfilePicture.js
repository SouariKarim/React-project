import React, { useEffect, useState } from "react";
import UnknownProfileImage from "../../res/images/freelance-default.jpg";
import "./FreelanceProfilePicture.scss";
import useFreelancesApi from "../../hooks/useFreelancesApi";
import padlock from "../../res/images/padlock.jpg";
import { LazyLoadImage } from 'react-lazy-load-image-component';


const FreelanceProfilePicture = ({ freelance, hover, fromSearchPage = false }) => {

  const {getProfileImageUrl} = useFreelancesApi();
  const [cssImage, setCssImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);


  useEffect(() => {
    if (freelance.premium && freelance.can_open_freelance === false) {
      setImageUrl(padlock)
    } else if (freelance.has_profile_image === false) {
      setImageUrl(UnknownProfileImage)
    } else {
      setImageUrl(getProfileImageUrl(freelance.id, true));
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [freelance])


  useEffect(() => {
    const css = ["profile-image"];
    if (hover) {
      css.push("hover");
    }

    setCssImage(css.join(" "));
  }, [hover]);


  return (
      <LazyLoadImage
          className={fromSearchPage ? cssImage + " freelance-profile-picture" : cssImage + " freelance-profile-picture from-search-page"}
          alt={"Freelance : " + freelance.title}
          src={imageUrl}
      />

  )
}

export default FreelanceProfilePicture;
