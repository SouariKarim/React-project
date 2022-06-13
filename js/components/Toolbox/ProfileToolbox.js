import Toolbox from "./Toolbox";
import IconTooltip from "../IconTooltip/IconTooltip";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFlag, faPen} from "@fortawesome/free-solid-svg-icons";
import {useContext} from "react";
import {ModalContext} from "../../contexts/ModalContext";
import useAuthManager from "../../hooks/useAuthManager";


export default function ProfileToolbox({freelance, className}) {

    const {isShowingModeration, toggleModeration, isShowingFreelanceReport, toggleFreelanceReport} = useContext(ModalContext);
    const {isCollaborator} = useAuthManager()

    return(
        <Toolbox className={className} forceVisible>
            <IconTooltip placement={"left"} name={"hide-visited"} htmlChildren={
                <button className={isShowingFreelanceReport ? "tool-btn active" : "tool-btn"}
                        onClick={() => toggleFreelanceReport({freelance: freelance})}>

                    <FontAwesomeIcon icon={faFlag}/>
                </button>
            }>
                <p>Signaler le profil</p>
            </IconTooltip>

            {isCollaborator() === true &&
                <IconTooltip placement={"left"} name={"hide-visited"} htmlChildren={
                    <button className={isShowingModeration ? "tool-btn active" : "tool-btn"}
                            onClick={() => toggleModeration({freelance: freelance})}>

                        <FontAwesomeIcon icon={faPen}/>
                    </button>
                }>
                    <p>Modérer le profil</p>
                </IconTooltip>
            }
        </Toolbox>
    )
}