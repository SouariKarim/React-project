// returns methods for highlight some keywords in a text :
const useTextHighlightText = () => {
  // check if a text contains at least one of the keywords in highlightWords
  const hasKeywordToHighlight = (text, highlightWords = []) => {
    // this function will return true if the text contains at least one of the keywords: highlightWords
    if (!text || highlightWords === null || highlightWords.length === 0) {
      return false; // if there is no text to highlight or no keywords
    }

    for (const word of highlightWords) {
      //eslint-disable-next-line no-useless-escape
      const escapeWordValue = word.value.replace(
        /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
        '\\$&'
      ); // discard any symbol in the keyword
      const reg = new RegExp(escapeWordValue, 'gi');
      const matches = text.match(reg);
      if (matches && matches.length > 0) {
        return true; // when the text contains
      }
    }

    return false; // when the text doest not contain any of the keywords
  };

  const highlightText = (text, highlightWords = []) => {
    if (!text || !highlightWords) {
      return ''; //
    }

    let textWithHighlight = text;

    for (const word of highlightWords) {
      //eslint-disable-next-line no-useless-escape
      let escapeWordValue = word.value.replace(
        /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
        '\\$&'
      ); // discard any symbol in the keyword
      // discard of any special frensh caracter in the keyword
      escapeWordValue = escapeWordValue.replaceAll('é', '[é|**]');
      escapeWordValue = escapeWordValue.replaceAll('è', '[è|**]');
      escapeWordValue = escapeWordValue.replaceAll('e', '[è|e|é]');
      escapeWordValue = escapeWordValue.replaceAll('**', 'e');

      escapeWordValue = escapeWordValue.replaceAll('<', '');
      escapeWordValue = escapeWordValue.replaceAll('>', '');
      escapeWordValue = escapeWordValue.replaceAll('/>', '');

      //if (escapeWordValue !== ">" && escapeWordValue !== "<" && escapeWordValue !== "s" && escapeWordValue !== "p" && escapeWordValue !== "a" && escapeWordValue !== "n") {
      const reg = new RegExp(escapeWordValue, 'gi');
      // after creating a regex with the keyword , we will replace it in the actual text with a span wich has a special class to highlight it
      textWithHighlight = textWithHighlight.replace(reg, function (str) {
        return (
          '<span class="highlight highlight-' +
          word.color +
          '">' +
          str +
          '</span>'
        );
      });
      //}
    }
    return textWithHighlight; // return the text containing a span if it matches a keyword
  };

  return {
    highlightText,
    hasKeywordToHighlight,
  };
};

export default useTextHighlightText;
