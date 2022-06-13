import Constant from "../../../constant";


export function CommentParser({ children }) {
    if (typeof children === 'string' || children instanceof String){
        return parseComment(children);
    }
}


export function parseComment(text) {
    if (text.startsWith(Constant.COMMENT_PARSER_MARKUP) && text.endsWith(Constant.COMMENT_PARSER_MARKUP)) {
        const key = text.replaceAll(Constant.COMMENT_PARSER_MARKUP, '')
        const label = Constant.COMMENT_PARSER_LABEL[key];

        if (label) {
            return label;
        }
    }

    return text;
}


export function encodeKey(key) {
    return Constant.COMMENT_PARSER_MARKUP + key + Constant.COMMENT_PARSER_MARKUP;
}