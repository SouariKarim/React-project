// return methods for opening and  closing freelancer profile sections

import React, { useState, useEffect } from 'react';
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock'; // prevent the body from scrolling when there is a modal in the screen
import { useKey } from 'rooks'; // react costum hooks (important)
import { useLocation } from 'react-router-dom'; // return a location informations object

// create the context
export const DisplayFreelanceContext = React.createContext({});
DisplayFreelanceContext.displayName = 'DisplayFreelanceContext';
// create the consumer
export const DisplayFreelanceConsumer = DisplayFreelanceContext.Consumer;

// the provider
export const DisplayFreelanceProvider = ({ children }) => {
  const [profileToDisplay, setProfileToDisplay] = useState(null);
  const [searchUrl, setSearchUrl] = useState('/search');
  const location = useLocation();

  useEffect(() => {
    closeFreelanceDisplay(true);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // lock the body from scrolling
  const lockSearchScroll = () => {
    disableBodyScroll(document.body, {
      allowTouchMove: (el) => {
        while (el && el !== document.body) {
          if (
            el.getAttribute('body-scroll-lock-ignore') !== null ||
            el.id === 'freelance-display'
          ) {
            return true;
          }

          el = el.parentElement;
        }
      },
    });
  };

  // open the freelancer profile and lock the body
  const openFreelanceDisplay = (freelanceProfile) => {
    if (freelanceProfile) {
      lockSearchScroll(); // prevent the body from scrolling
      setProfileToDisplay(freelanceProfile); // set the freelancer profile
      setSearchUrl(window.location.href); // set the search url to the freelancer profile url
      window.history.replaceState(
        {},
        null,
        '/freelance/' + freelanceProfile.id
      ); // replace the history with the new found freelancer url
    }
  };

  // close the freelancer profile and free the body
  const closeFreelanceDisplay = (fromRouterRedirection = false) => {
    clearAllBodyScrollLocks(); // body lock method : make the body scroll
    setProfileToDisplay(null);

    if (fromRouterRedirection === false) {
      window.history.replaceState({}, null, searchUrl);
    }
  };

  useKey(['Escape'], () => closeFreelanceDisplay(false)); // when pressing the escape botton close the freelance display

  return (
    <DisplayFreelanceContext.Provider
      value={{ profileToDisplay, openFreelanceDisplay, closeFreelanceDisplay }}
    >
      {children}
    </DisplayFreelanceContext.Provider>
  );
};
