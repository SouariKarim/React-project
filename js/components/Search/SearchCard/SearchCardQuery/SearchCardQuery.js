import SearchCard, {CardLabel} from "../SearchCard";
import {faQuestionCircle, faSearch} from "@fortawesome/free-solid-svg-icons";
import {Form} from "react-bootstrap";
import classes from "./query.module.scss"
import Button from "../../../Buttons/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import {useContext} from "react";
import {ModalContext} from "../../../../contexts/ModalContext";
import { motion } from "framer-motion"


export default function SearchCardQuery({isOpen, query, setQuery, querySuggestion = null}) {

    const {toggleHelp} = useContext(ModalContext);
    const suggestionMotion = {
        visible: { opacity: 1, width: "auto", pointerEvents: "auto" },
        hidden: { opacity: 0, width: 0, pointerEvents: "none" }
    }


    const handleSuggestionClick = () => {
        setQuery(querySuggestion);
    }


    return (
        <SearchCard
            isOpen={isOpen}
            className={classes.card}
        >
            <CardLabel icon={faSearch} />
            <Form.Control
                type={"text"}
                value={query}
                className={classNames("inputText", classes.queryInput)}
                placeholder='Ex : ("Product Owner" ET Javascript) OU React.JS'
                onChange={(event) =>
                    setQuery(event.target.value)
                }
            />

            <motion.div
                className={classes.suggestion}
                variants={suggestionMotion}
                initial={"hidden"}
                animate={querySuggestion ? "visible" : "hidden"}
                exit={"hidden"}
                transition={{
                    duration: 0.2,
                    opacity: { type: "linear", duration: 0.12 },
                }}
            >
                Essayez plutôt :
                <Button variant={"link"} onClick={handleSuggestionClick}>
                    {querySuggestion}
                </Button>
            </motion.div>

            <Button variant={"hint light"} className={classes.help} onClick={toggleHelp}>
                <FontAwesomeIcon icon={faQuestionCircle}/>
                ASTUCE
            </Button>
        </SearchCard>
    )
}