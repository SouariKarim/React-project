import React from 'react';
import "./FreelanceSkill.scss";
import HighlightText from "../Text/Text";

const FreelanceSkill = ({className = '', skill, keywords = []}) => {
    return (
        <HighlightText className={"freelance-skill " + className} text={skill} highlightWords={keywords}/>
    )
}

export default FreelanceSkill;