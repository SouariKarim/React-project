import classes from "./controls.module.scss"
import Button from "../../Buttons/Button";
import {useState} from "react";
import useAuthManager from "../../../hooks/useAuthManager";
import FreelanceComment from "../../../models/FreelanceComment";
import { v4 as uuidv4 } from 'uuid';
import SmartTextArea from "../../Form/SmartTextArea/SmartTextArea";
import Constant from "../../../constant";
import {encodeKey} from "../CommentParser/CommentParser";


export default function CommentsControls({ freelance, addComment }) {

    const [text, setText] = useState("");
    const {user} = useAuthManager();


    const createComment = (labelKey = null) => {
        const newComment = new FreelanceComment({
            id: uuidv4(),
            author: user,
            freelance: freelance,
            text: labelKey !== null ? encodeKey(labelKey) : text,
            created_at: new Date(),
            updated_at: new Date(),
            synchronized: false,
        });

        addComment(newComment);
        resetControls();
    }


    const resetControls = () => {
        setText("");
    }


    return (
        <div className={classes.controls}>
            <div className={classes.quickComment}>
                {Object.entries(Constant.COMMENT_PARSER_LABEL).map(([key, label], index) =>
                    <Button
                        key={"quick-" + index}
                        variant={"hint light"}
                        onClick={() => createComment(key)}
                    >
                        {label}
                    </Button>
                )}
            </div>

            <SmartTextArea
                value={text}
                placeholder={"Écrivez un commentaire privé ..."}
                onChange={setText}
            />

            <div className={classes.actions}>
                <Button
                    onClick={() => createComment()}
                    variant={"hint"}
                    className={classes.send}
                >
                    Enregistrer
                </Button>
            </div>
        </div>
    )
}