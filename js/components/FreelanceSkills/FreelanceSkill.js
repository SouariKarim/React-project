import React from 'react';
import './FreelanceSkill.scss';
import HighlightText from '../Text/Text'; // the highlighted text as a react element

const FreelanceSkill = ({ className = '', skill, keywords = [] }) => {
  return (
    <HighlightText
      className={'freelance-skill ' + className}
      text={skill}
      highlightWords={keywords}
    />
    // the text is the text to highlight
    // the keywords are the keywords in the text
    // this component render a react element
  );
};

export default FreelanceSkill;
