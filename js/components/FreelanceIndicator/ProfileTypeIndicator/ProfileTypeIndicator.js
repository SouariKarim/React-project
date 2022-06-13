import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCrown, faGhost as GhostIcon} from "@fortawesome/free-solid-svg-icons";
import "./ProfileTypeIndicator.scss"
import useAuthManager from "../../../hooks/useAuthManager";


export default function ProfileTypeIndicator({ freelance }){

    const { isCollaborator } = useAuthManager();
    let profileTypeIcon = null

    if(freelance.tags.includes('g')){
        profileTypeIcon = <FontAwesomeIcon icon={GhostIcon} style={{marginRight: 9}}
                                           title={"Profil non visible par nos clients"}/>
    }
    else if(freelance.premium === true){
        profileTypeIcon = <FontAwesomeIcon icon={faCrown} style={{marginRight: 6}}
                                           title={"Profil premium"}/>
    }


    if(isCollaborator() === true && profileTypeIcon !== null) {
        return (
            <div className={"profile-type-indicator"}>
                {profileTypeIcon}
            </div>
        )
    }
    else{
        return null
    }
}