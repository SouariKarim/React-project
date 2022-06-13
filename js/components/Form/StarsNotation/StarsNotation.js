import classes from "./notation.module.scss"
import {faStar, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";
import classNames from "classnames/bind";


const bindClasses = classNames.bind(classes);
const starLabel = [
    "1 - naze",
    "2 - bof",
    "3 - moyen",
    "4 - bon niveau",
    "5 - topissime !",
];


export default function StarsNotation({value, setValue, className, disabled = false, readOnly = false, nbStars = 5}) {

    const [hoveredStarId, setHoveredStarId] = useState(0);
    const formattedValue = parseInt(value);


    const onHover = (starId) => {
        if (!disabled && !readOnly) {
            setHoveredStarId(starId);
        }
    }


    const resetHover = () => {
        setHoveredStarId(0);
    }


    const resetNotation = () => {
        setValue(0);
    }


    const setNotation = (note) => {
        if (!disabled && !readOnly) {
            setValue(note);
        }
    }


    return (
        <div
            className={bindClasses(classes.container, {disabled, readOnly}, className)}
            onMouseLeave={resetHover}
        >
            {starLabel.map((label, index) =>
                <FontAwesomeIcon
                    title={label}
                    onClick={() => setNotation(index + 1)}
                    onMouseEnter={() => onHover(index + 1)}
                    className={bindClasses(classes.star, {
                        hovered: index + 1 <= hoveredStarId,
                        selected: index + 1 <= formattedValue
                    })}
                    key={"star-" + index}
                    icon={faStar}
                />
            )}

            {formattedValue !== 0 && readOnly === false &&
                <FontAwesomeIcon
                    className={classes.reset}
                    onClick={resetNotation}
                    icon={faTimes}
                />
            }
        </div>
    )
}