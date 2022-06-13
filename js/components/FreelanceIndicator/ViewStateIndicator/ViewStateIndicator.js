import React from 'react';
import "./ViewStateIndicator.scss";
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-regular-svg-icons";
import moment from "moment";


const ViewStateIndicator = ({freelance}) => {

    if(freelance.last_seen || freelance.session_seen){

        let date = moment().format("DD/MM/YY")

        if(freelance.session_seen) date = freelance.session_seen
        else if(freelance.last_seen) date = freelance.last_seen

        return (
            <div className={"freelance-state"}>
                Vu le {date}
            </div>
        )
    }
    else if(freelance.is_new){
        return (
            <div className={"freelance-state state-new"}>
                <FontAwesomeIcon icon={faExclamationTriangle}/> Nouveau
            </div>
        )
    }
    else{
        return (
            <div className={"freelance-state state-not-read"}>
                <FontAwesomeIcon icon={faEye}/> Non lu
            </div>
        )
    }
}

export default ViewStateIndicator;