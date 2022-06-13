import "./band.scss"
import IllustrationTop from "../../res/illustrations/jean-michel-illustration-haut.png"
import IllustrationBottom from "../../res/illustrations/jean-michel-illustration-bas.png"
import Parallax from "../Parallax/Parallax";


export default function BrandBand({ children, className = '' }) {

    const parallaxTransform = [15000, 1200];

    return(
        <div className={"band brand " + className}>
            <Parallax transform={[parallaxTransform[0], parallaxTransform[1]]} xAxis
                      innerClassName={"inner-parallax-top"} outerClassName={"outer-parallax-top"}>
                <img src={IllustrationTop} alt={"jean-michel.io illustration logo haut"}/>
            </Parallax>

            <div className={"content-wrapper"}>
                {children}
            </div>

            <Parallax transform={[parallaxTransform[0], -1 * parallaxTransform[1]]} xAxis
                      innerClassName={"inner-parallax-bottom"} outerClassName={"outer-parallax-bottom"}>
                <img src={IllustrationBottom} alt={"jean-michel.io illustration logo bas"}/>
            </Parallax>
        </div>
    )
}