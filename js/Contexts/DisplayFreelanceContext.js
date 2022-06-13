import React, {useState, useEffect} from "react";
import {clearAllBodyScrollLocks, disableBodyScroll} from "body-scroll-lock";
import {useKey} from "rooks";
import {useLocation} from "react-router-dom";


export const DisplayFreelanceContext = React.createContext({});
DisplayFreelanceContext.displayName = 'DisplayFreelanceContext';

export const DisplayFreelanceConsumer = DisplayFreelanceContext.Consumer;


export const DisplayFreelanceProvider = ({children}) => {

    const [profileToDisplay, setProfileToDisplay] = useState(null)
    const [searchUrl, setSearchUrl] = useState("/search")
    const location = useLocation()


    useEffect(() => {
        closeFreelanceDisplay(true)
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])


    const lockSearchScroll = () => {
        disableBodyScroll(document.body, {
            allowTouchMove: el => {
                while (el && el !== document.body) {
                    if (el.getAttribute('body-scroll-lock-ignore') !== null || el.id === "freelance-display") {
                        return true;
                    }

                    el = el.parentElement;
                }
            },
        })
    }


    const openFreelanceDisplay = (freelanceProfile) => {
        if (freelanceProfile) {
            lockSearchScroll()
            setProfileToDisplay(freelanceProfile)
            setSearchUrl(window.location.href)
            window.history.replaceState({}, null, "/freelance/" + freelanceProfile.id)
        }
    }


    const closeFreelanceDisplay = (fromRouterRedirection = false) => {
        clearAllBodyScrollLocks()
        setProfileToDisplay(null)

        if(fromRouterRedirection === false){
            window.history.replaceState({}, null, searchUrl)
        }
    }


    useKey(["Escape"], () => closeFreelanceDisplay(false))


    return (
        <DisplayFreelanceContext.Provider value={{profileToDisplay, openFreelanceDisplay, closeFreelanceDisplay}}>
            {children}
        </DisplayFreelanceContext.Provider>
    )
}