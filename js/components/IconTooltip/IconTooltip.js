import {OverlayTrigger, Tooltip} from "react-bootstrap";
import "./IconTooltip.scss"
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


export default function IconTooltip ({
    children,
    name = "undefined",
    className = '',
    childrenClassName = '',
    rootClassName = '',
    style,
    icon = faInfoCircle,
    iconSize = null,
    htmlChildren = null,
    placement = "left",
}) {

    if(childrenClassName === ''){
        childrenClassName = className
    }

    let iconStyle
    switch (iconSize){
        case 'lg': iconStyle = {width: 19, height: 19}; break;
        case 'md': iconStyle = {width: 16, height: 16}; break;
        case 'sm': iconStyle = {width: 12, height: 12}; break;
        default: break;
    }


    return(
        <OverlayTrigger
            placement={placement}
            style={{textAlign: 'left'}}
            overlay={
                <Tooltip id={`tooltip-${name}`}>
                    <div className={"tooltip-node " + childrenClassName}>
                        {children}
                    </div>
                </Tooltip>
            }
        >
            {({ ref, ...triggerHandler }) => (
                <div
                    {...triggerHandler}
                    ref={ref}
                    className={"tooltip-html-root " + rootClassName}
                    style={{...style}}
                >
                    {htmlChildren !== null ?
                        htmlChildren
                        :
                        <FontAwesomeIcon icon={icon} style={{...iconStyle}}/>
                    }
                </div>
            )}

        </OverlayTrigger>
    )
}