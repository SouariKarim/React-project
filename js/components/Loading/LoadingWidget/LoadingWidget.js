import "./LoadingWidget.scss"
import {motion} from "framer-motion"
import {PulseLoader} from "react-spinners";
import React from "react";
import classNames from "classnames";


export default function LoadingWidget({active = false, text= "Jean-Michel Çacharge", className = '', delay = 0.17 }) {

    const loadingMotion = {
        visible: {opacity: 1, visibility: "visible"},
        hidden: {opacity: 0, visibility: "hidden"}
    }

    return(
        <motion.div
            animate={active ? "visible" : "hidden"}
            variants={loadingMotion}
            transition={{duration: delay}}
            className={classNames("loadingWidget", {active: active}, className)}
        >
            <PulseLoader color={"#354255"}/>

            {text !== null &&
                <p className={"text"}>{text}</p>
            }
        </motion.div>
    )
}