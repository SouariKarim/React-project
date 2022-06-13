import {PulseLoader} from "react-spinners";
import React from "react";
import "./JmSpinner.scss";
import {motion} from "framer-motion"


const JmSpinner = ({text= "Jean-Michel Çacharge", customStyle}) => {

    return (
        <motion.div
            className={"jm-spinner"}
            style={customStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >

            <PulseLoader color={"#354255"}/>
            <p style={{textAlign: 'center'}}>{text}</p>
        </motion.div>
    )
};

export default JmSpinner;