import "./DisponibilityMaker.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCheckCircle, faInfoCircle,
    faQuestionCircle,
    faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import {faDotCircle} from "@fortawesome/free-regular-svg-icons"
import useAuthManager from "../../hooks/useAuthManager";
import moment from "moment";
import IconTooltip from "../IconTooltip/IconTooltip";


const infoMarkerList = [
    'Inscription du freelance sur un site d\'emploi',
    'A candidaté à une annonce pour freelance',
    '"Open to work" sur LinkedIn',
    'Disponibilité renseignée par une ESN partenaire',
    'Inscription du Freelance sur Jean-Paul.io',
    'etc'
]


export default function DisponibilityMarker({freelance}) {

    const {canSeeDisponibilityMarkers} = useAuthManager()


    const getDisponibilityMarker = () => {
        const sortedMarkers = freelance.disponibility_markers_sort
        return sortedMarkers.map((marker, index) => {

            const previousMarkerDate = (index === 0)? moment() : moment(sortedMarkers[index - 1].date)
            // On affiche les points selon des trimestres
            const trimDiff = Math.floor(previousMarkerDate.diff(moment(marker.date), 'months') / 3)

            const opacity = 1 - moment().diff(moment(marker.date), 'months') / 20
            let temporalIllustration = (index === 0) ? [<span key={"0"} className={"temporal-dot"}/>] : []

            // 4 : on affiche un maximum de 4 points d'écart
            for (let i = 0; i < trimDiff && i < 4; i++) {
                temporalIllustration.push(<span key={"temporal-dot-" + i + 1} className={"temporal-dot"}/>)
            }

            return (
                <li key={"dispo_" + index} className={"marker"} style={{opacity: (opacity < 0.2)? 0.2 : opacity}}>
                    <div className={"marker-timeline"}>
                        {temporalIllustration}
                        {getDisponibilityIcon(marker)}
                    </div>
                    <span>{marker.label}</span>
                </li>
            )
        })
    }


    const getDisponibilityIcon = (marker) => {
        if (marker.code.includes("UNKNOWN")) {
            return <FontAwesomeIcon icon={faQuestionCircle} className={"marker-icon unknown"}/>
        } else if (marker.disponibility === true) {
            return <FontAwesomeIcon icon={faCheckCircle} className={"marker-icon dispo"}/>
        } else {
            return <FontAwesomeIcon icon={faTimesCircle} className={"marker-icon undispo"}/>
        }
    }


    return (
        <div className={"freelance-update-ago"}>
            <IconTooltip
                name={"disponibility"}
                htmlChildren={
                    <>
                        {freelance.marker_type !== "available" && freelance.marker_type !== "not_available" &&
                            <span className={"default-marker"} style={{fontStyle: "normal"}}>
                                Pas de disponibilité connue
                            </span>
                        }
                        {freelance.marker_type === "available" &&
                            <span
                                className={(freelance.marker_disponibility_day >= 28) ? "default-marker old-marker" : "default-marker available-marker"}>
                                Dispo il y a {freelance.marker_disponibility_date}
                            </span>
                        }
                        {freelance.marker_type === "not_available" &&
                            <span className={"unavailable-marker"}>
                                Non dispo depuis {freelance.marker_disponibility_date}
                            </span>
                        }

                        <FontAwesomeIcon className={"info-icon"} icon={faInfoCircle}/>
                    </>
                }
            >
                {canSeeDisponibilityMarkers() &&
                    <>
                        {freelance.disponibility_markers.length === 0 &&
                            <p style={{textAlign: 'left'}}>Pas de disponibilité connue.</p>
                        }
                        {freelance.disponibility_markers.length > 0 &&
                            <ul className={"dispo-markers"}>
                                <li className={"marker marker-today"}>
                                    <FontAwesomeIcon icon={faDotCircle}/>
                                </li>

                                {freelance.disponibility_markers.length > 0 &&
                                    getDisponibilityMarker()
                                }
                            </ul>
                        }
                    </>
                }

                {!canSeeDisponibilityMarkers() &&
                    <>
                        <p className={"mb-2"}>Jean-Michel.io scrute l'ensemble du web pour déterminer la disponibilité des freelances :</p>
                        <ul>
                            {infoMarkerList.map((marker, i) =>
                                <li key={"info_marker_dispo_" + i} style={{textAlign: 'left'}}>{marker}</li>
                            )}
                        </ul>
                    </>
                }
            </IconTooltip>
        </div>
    )
}