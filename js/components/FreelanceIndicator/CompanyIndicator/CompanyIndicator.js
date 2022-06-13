import classes from "./company-indicator.module.scss";
import {faMessage, faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import IconTooltip from "../../IconTooltip/IconTooltip";


export default function CompanyIndicator({ freelance }) {

    if (freelance && (freelance.note !== 0 || freelance.nbComments !== 0)) {
        return (
            <IconTooltip
                rootClassName={classes.tooltipRoot}
                placement={"right"}
                htmlChildren={
                    <>
                        <div className={classes.stars}>
                            {[...Array(freelance.note)].map((e, i) =>
                                <FontAwesomeIcon key={"star-" + i} icon={faStar}/>
                            )}
                            {[...Array(5 - freelance.note)].map((e, i) =>
                                <FontAwesomeIcon className={classes.disabled} key={"star-" + i} icon={faStar}/>
                            )}
                        </div>

                        {freelance.nbComments !== 0 &&
                            <div className={classes.comments}>
                                <FontAwesomeIcon icon={faMessage}/>
                                {freelance.nbComments}
                            </div>
                        }
                    </>
                }
            >
                {`Votre entreprise a attribué la note de ${freelance.note}/5
                et à renseigné ${freelance.nbComments} commentaires sur le profil de ${freelance.full_name}.`}
            </IconTooltip>
        )
    }
}