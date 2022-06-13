import {motion, useTransform, useViewportScroll} from "framer-motion";
import "./Parallax.scss"


export default function Parallax({ innerClassName = '', outerClassName = '', xAxis = false, transform= [2000, 1300], children }){

    const axisTransform = xAxis ? [[transform[0], 0], [transform[1], 0]] : [[0, transform[0]], [0, transform[1]]]
    const { scrollY } = useViewportScroll();
    const motionValue = useTransform(scrollY, axisTransform[0], axisTransform[1]);


    return(
        <div className={"root-parallax-outer " + outerClassName}>
            <motion.div style={ xAxis ? { x: motionValue } : { y: motionValue}} className={"root-parallax-inner " + innerClassName}>
                {children}
            </motion.div>
        </div>
    )
}
