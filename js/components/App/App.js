import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ROUTES, RenderRoutes } from '../../routes'; // the routes arr and the render method
import { UserProvider } from '../../contexts/UserContext'; // user context
import AppLoader from '../AppLoader/AppLoader'; // if the loading context is set to true load a spinner component otherwise load the app (the routes .. etc)
import LoadingScreen from '../Loading/LoadingScreen/LoadingScreen'; // the loading screen containing the spinner
import { LoadingProvider } from '../../contexts/LoadingContext'; // loading context
import { SideBarProvider } from '../../contexts/SideBarContext'; // side bar context
import { SearchFreelanceProvider } from '../../contexts/SearchFreelanceContext'; // searched freelancer context
import { ModalProvider } from '../../contexts/ModalContext'; // modal context
import { ErrorCodeProvider } from '../../contexts/ErrorCodeContext'; // error code context
import { ScrollArrow } from '../ScrollArrow/ScrollArrow'; // the scroll arrow component wich when clicked scroll to the top of the page
import { DisplayFreelanceProvider } from '../../contexts/DisplayFreelanceContext'; // display the freelacer profile and lock the body context
import JeanToaster from '../JeanToaster/JeanToaster'; // this is a toast component wich will be used when providing a clicking handler containing the toast text
import Konami from 'react-konami-code'; // set it so that when clicking a sequence of keys , the site will do something
import ModalKonami from '../../modals/ModalKonami/ModalKonami'; // a konami modal component containing a video

export default function App() {
  const [showingKonami, setShowingKonami] = useState(false);

  // show the konami modal handler when clicked and make the app root skew
  const triggerKonami = () => {
    setShowingKonami(true);

    let count = 1;
    const interval = setInterval(
      () => {
        document.getElementById('root').style.transform = `skewY(${count}deg)`;
        count++;
      },
      30,
      count
    );

    setTimeout(() => {
      clearInterval(interval);
      document.getElementById('root').style.transform = `skewY(0deg)`;
    }, 60000);
  };

  return (
    // set all the context providers so the app and its child components can use the context data
    <ErrorCodeProvider>
      <BrowserRouter>
        <LoadingProvider>
          <UserProvider>
            <SearchFreelanceProvider>
              <ModalProvider>
                {/* is loading is true load a spinner otherwise load the children component */}
                <LoadingScreen>
                  {/* load the app if the loading status is false */}
                  <AppLoader>
                    <SideBarProvider>
                      <DisplayFreelanceProvider>
                        {/* render the given route array */}
                        <RenderRoutes routes={ROUTES} />
                        {/* render the scroll arrow */}
                        <ScrollArrow />
                        {/* render the toaster witch will wait for the toast function to give the text to display in the component wich ill use this toast */}
                        <JeanToaster />
                        {/* the konami component witch will skew the body when invoked to be rendered */}
                        <Konami action={triggerKonami} />
                        <ModalKonami
                          isShowing={showingKonami}
                          toggle={() => setShowingKonami(!showingKonami)}
                        />
                      </DisplayFreelanceProvider>
                    </SideBarProvider>
                  </AppLoader>
                </LoadingScreen>
              </ModalProvider>
            </SearchFreelanceProvider>
          </UserProvider>
        </LoadingProvider>
      </BrowserRouter>
    </ErrorCodeProvider>
  );
}
