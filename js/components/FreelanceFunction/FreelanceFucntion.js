import React from 'react';
import "./FreelanceFunction.scss";
import HighlightText from "../Text/Text"; // an utilities to highlight some keywords in a given text

const FreelanceFunction = ({fonction, className, keywords = []}) => {
    // pass to the props the text and the keywords that will be highlighted
    return (
        <HighlightText className={"freelance-function " + className} text={fonction} highlightWords={keywords}/>
    );
};

export default FreelanceFunction;