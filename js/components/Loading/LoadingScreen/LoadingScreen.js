import React, {useContext} from 'react';
import "./LoadingScreen.scss";
import {LoadingContext} from "../../../contexts/LoadingContext";
import JmSpinner from "../../JmSpinner/JmSpinner";


export default function LoadingScreen({children}) {

    const {isLoading} = useContext(LoadingContext);

    return (
        <>
            {isLoading() &&
                <div className={"loading-screen"}>
                    <JmSpinner/>
                </div>
            }
            {children}
        </>
    )
}