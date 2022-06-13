import classes from "./social.module.scss"
import {FreelanceSectionCard} from "../../FreelanceSectionCard/FreelanceSectionCard";
import FreelanceNotation from "../../FreelanceNotation/FreelanceNotation";
import CommentsContainer from "../../Comments/CommentsContainer/CommentsContainer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";


export default function CompanySocial({freelance}) {

    return (
        <FreelanceSectionCard className={classes.socialContainer} title={"Votre espace privé"}>
            <p className={classes.warning}>
                <FontAwesomeIcon icon={faInfoCircle}/>
                Visible uniquement par vous et votre entreprise.
            </p>

            <div className={classes.notation}>
                <FreelanceNotation
                    freelance={freelance}
                    label={"Votre appréciation :"}
                />
            </div>

            <div className={classes.comments}>
                <CommentsContainer
                    freelance={freelance}
                    withControls
                />
            </div>
        </FreelanceSectionCard>
    )
}