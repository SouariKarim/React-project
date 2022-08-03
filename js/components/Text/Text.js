// return the highlighted text as a react element using the below parser
import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser'; // transform html with react.createElement
import './Text.scss';
import useTextHighlightText from '../../hooks/useTextHighlightText'; // returns some methods for highlighting keywords in a text
import sanitizeHtml from 'sanitize-html';

const HighlightText = ({
  as = 'p',
  className = '',
  text,
  highlightWords = [],
}) => {
  const [htmlText, setHtmlText] = useState(null); // the text to be highlighted
  const { highlightText } = useTextHighlightText(); //method hightlight keywords in a text

  useEffect(() => {
    let textWithHighlight = highlightText(text, highlightWords); // this is the text with the highlighted keywords
    setHtmlText(
      parse(
        sanitizeHtml(textWithHighlight, {
          allowedAttributes: {
            span: ['class'],
          },
        })
      )
    );

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlightWords, text]);

  return React.createElement(
    as,
    { className: 'highlight-text ' + className },
    htmlText
  );
};

export default HighlightText;
