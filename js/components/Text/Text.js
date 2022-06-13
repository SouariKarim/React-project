import React, {useEffect, useState} from 'react';
import parse from 'html-react-parser';
import './Text.scss';
import useTextHighlightText from "../../hooks/useTextHighlightText";
import sanitizeHtml from 'sanitize-html';

const HighlightText = ({as = "p", className = '', text, highlightWords = []}) => {
    const [htmlText, setHtmlText] = useState(null);
    const {highlightText} = useTextHighlightText();

    useEffect(() => {
        let textWithHighlight = highlightText(text, highlightWords);
        setHtmlText(parse(sanitizeHtml(textWithHighlight, {
            allowedAttributes: {
                span: [ 'class' ]
            },
        })));

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [highlightWords, text]);

    return React.createElement(as, {className: "highlight-text " + className}, htmlText);
}

export default HighlightText;