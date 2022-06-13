import React from 'react';
import "./FreelanceFunction.scss";
import HighlightText from "../Text/Text";

const FreelanceFunction = ({fonction, className, keywords = []}) => {
    return (
        <HighlightText className={"freelance-function " + className} text={fonction} highlightWords={keywords}/>
    );
};

export default FreelanceFunction;