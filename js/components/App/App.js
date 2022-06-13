import React, {useState} from "react";
import {BrowserRouter} from "react-router-dom";
import { ROUTES, RenderRoutes } from "../../routes";
import { UserProvider } from "../../contexts/UserContext";
import AppLoader from "../AppLoader/AppLoader";
import LoadingScreen from "../Loading/LoadingScreen/LoadingScreen";
import { LoadingProvider } from "../../contexts/LoadingContext";
import { SideBarProvider } from "../../contexts/SideBarContext";
import { SearchFreelanceProvider } from "../../contexts/SearchFreelanceContext";
import { ModalProvider } from "../../contexts/ModalContext";
import {ErrorCodeProvider,} from "../../contexts/ErrorCodeContext";
import {ScrollArrow} from "../ScrollArrow/ScrollArrow";
import {DisplayFreelanceProvider} from "../../contexts/DisplayFreelanceContext";
import JeanToaster from "../JeanToaster/JeanToaster";
import Konami from "react-konami-code";
import ModalKonami from "../../modals/ModalKonami/ModalKonami";


export default function App() {

    const [showingKonami, setShowingKonami] = useState(false);

    const triggerKonami = () => {
        setShowingKonami(true);

        let count = 1;
        const interval = setInterval(() => {
            document.getElementById("root").style.transform = `skewY(${count}deg)`;
            count++;
        }, 30, count);

        setTimeout(() => {
            clearInterval(interval);
            document.getElementById("root").style.transform = `skewY(0deg)`;
        }, 60000);
    };

    return (
        <ErrorCodeProvider>
            <BrowserRouter>
                <LoadingProvider>
                    <UserProvider>
                        <SearchFreelanceProvider>
                            <ModalProvider>
                                <LoadingScreen>
                                    <AppLoader>
                                        <SideBarProvider>
                                            <DisplayFreelanceProvider>

                                                <RenderRoutes routes={ROUTES} />
                                                <ScrollArrow/>
                                                <JeanToaster/>

                                                <Konami action={triggerKonami}/>
                                                <ModalKonami isShowing={showingKonami} toggle={() => setShowingKonami(!showingKonami)}/>

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
};
