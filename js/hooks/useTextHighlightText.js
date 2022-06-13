const useTextHighlightText = () => {

    const hasKeywordToHighlight = (text, highlightWords = []) => {
        if (!text || highlightWords === null || highlightWords.length === 0) {
            return false;
        }

        for (const word of highlightWords) {
            //eslint-disable-next-line no-useless-escape
            const escapeWordValue = word.value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            const reg = new RegExp(escapeWordValue, 'gi');
            const matches = text.match(reg);
            if (matches && matches.length > 0) {
                return true;
            }
        }

        return false;
    }

    const highlightText = (text, highlightWords = []) => {
        if (!text || !highlightWords) {
            return '';
        }

        let textWithHighlight = text;

        for (const word of highlightWords) {
            //eslint-disable-next-line no-useless-escape
            let escapeWordValue =   word.value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            escapeWordValue = escapeWordValue.replaceAll('é', '[é|**]');
            escapeWordValue = escapeWordValue.replaceAll('è', '[è|**]');
            escapeWordValue = escapeWordValue.replaceAll('e', '[è|e|é]');
            escapeWordValue = escapeWordValue.replaceAll('**', 'e');

            escapeWordValue = escapeWordValue.replaceAll('<', '');
            escapeWordValue = escapeWordValue.replaceAll('>', '');
            escapeWordValue = escapeWordValue.replaceAll('/>', '');

            //if (escapeWordValue !== ">" && escapeWordValue !== "<" && escapeWordValue !== "s" && escapeWordValue !== "p" && escapeWordValue !== "a" && escapeWordValue !== "n") {
                const reg = new RegExp(escapeWordValue, 'gi');
                textWithHighlight = textWithHighlight.replace(reg, function (str) {
                    return '<span class="highlight highlight-' + word.color + '">' + str + '</span>';
                });
            //}
        }
        return textWithHighlight;
    }

    return {
        highlightText,
        hasKeywordToHighlight
    }
}

export default useTextHighlightText;