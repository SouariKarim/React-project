import classes from "./sort.module.scss"
import Constant from "../../../constant";
import {faSort} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {motion} from "framer-motion"


export default function SearchSort ({filterBy, setFilterBy, hidden}) {

    const motionVariant = {
        visible: {opacity: 1},
        hidden: {opacity: 0},
    }


    const handleFilterByClick = () => {
        if (filterBy() === Constant.FILTER_BY_DATE) {
            setFilterBy(Constant.FILTER_BY_PERTINENCE);
        } else {
            setFilterBy(Constant.FILTER_BY_DATE)
        }
    }


    return (
        <motion.div
            className={classes.container}
            variants={motionVariant}
            initial={"hidden"}
            animate={hidden ? "hidden" : "visible"}
            exit={"hidden"}
            transition={{duration: 0.17}}
        >
            <span className={classes.filterBy}>
                Trier par :
                <button name={"filterBy"} onClick={handleFilterByClick}>
                    {filterBy() === Constant.FILTER_BY_DATE ? "Date de dispo" : "Pertinence"}
                    <FontAwesomeIcon icon={faSort}/>
                </button>
            </span>
        </motion.div>
    );
};