import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./InfoIconWrapper.scss"


export default function InfoIconWrapper({
        icon,
        customIcon = false,
        active = false,
        title = null,
        className = '',
        style={}
}) {

    const [isHovered, setHovered] = useState(false)


    const onIconHover = () => {
        if(title !== null){
            setHovered(true)
        }
    }


    return(
        <div onMouseEnter={onIconHover} onMouseLeave={() => setHovered(false)}
             className={(active)? "icon-wrapper active " + className :  "icon-wrapper " + className}
             style={{...style}}>

            {(customIcon === true)?
                <>{icon}</>
                :
                <FontAwesomeIcon icon={icon}/>
            }

            {isHovered && title !== null &&
                <span className={"info-popup"}>
                    {title}
                </span>
            }
        </div>
    )
}