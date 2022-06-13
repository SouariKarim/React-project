import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleUp} from "@fortawesome/free-solid-svg-icons";
import classes from "./scrollarrow.module.scss"
import {useContext, useEffect, useRef, useState} from "react";
import {DisplayFreelanceContext} from "../../contexts/DisplayFreelanceContext";
import {motion, useViewportScroll} from "framer-motion";


export function ScrollArrow() {

    const {profileToDisplay} = useContext(DisplayFreelanceContext)
    const {scrollY} = useViewportScroll()
    const [isVisible, setVisible] = useState(profileToDisplay !== null)
    const isMount = useRef(true);

    const motionScrollArrow = {
        visible: { visibility: 'visible', opacity: 1 },
        hidden: { visibility: 'hidden', opacity: 0 },
    }


    useEffect(() => {
        if (isMount.current) {
            if (profileToDisplay === null) {
                scrollY.onChange((latest) => setVisible(latest > 60))
            } else {
                setVisible(true)
            }
        }

        return () => {
            isMount.current = false;
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profileToDisplay])


    const handleClick = (e) =>{
        e.preventDefault()
        
        if(profileToDisplay !== null){
            document.getElementById("freelance-display").scrollTo(0,0)
        }
        else{
            window.scrollTo(0,0)
        }
    }


    return(
        <motion.button className={classes.scrollTop} onClick={handleClick}
                       animate={isVisible? "visible" : "hidden"}
                       transition={{duration: 0.4}}
                       variants={motionScrollArrow}>

            <FontAwesomeIcon icon={faAngleUp} className={"icon"}/>
        </motion.button>
    )
}