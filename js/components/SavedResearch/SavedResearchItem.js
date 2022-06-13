import {motion} from "framer-motion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {
    faEnvelope,
    faEye,
    faLaptopHouse,
    faPhone,
    faStar as faStarFull,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import {faStar} from "@fortawesome/free-regular-svg-icons";
import Link from "../Link/Link";
import {useState} from "react";
import LoadingWidget from "../Loading/LoadingWidget/LoadingWidget";
import useToast from "../../hooks/useToast";


export default function SavedResearchItem ({index, data, onUpdate, onDelete}) {

    const [isLoading, setLoading] = useState(false)
    const toast = useToast()
    const motionVariants = {
        visible: {
            opacity: 1,
            transition: {
                delay: index * 0.1
            },
        },
        hidden: {
            opacity: 0,
            transition: {
                delay: index * 0.1
            },
        }
    }


    const handlePinClick = (e) => {
        e.preventDefault()
        e.stopPropagation()

        onUpdate({
            savedResearchId: data.id,
            pinned: !data.isPinned
        }).finally(() => {
            if (data.isPinned) {
                toast.success({
                    text: "La recherche n'est plus en favoris"
                })
            }
            else {
                toast.success({
                    text: "Recherche ajouté en favoris !",
                    icon: '⭐'
                })
            }
        })
    }


    const handleDelete = (e) => {
        e.preventDefault()
        e.stopPropagation()

        setLoading(true)
        toast.promise({
            promise : onDelete({
                savedResearchId: data.id
            }),
            loadingText: "Suppression de la recherche",
            successText: "La recherche est supprimée !",
            style: {minWidth: 250}
        }).finally(() => setLoading(false))
    }


    const getEnglishLevelLabel = () => {
        switch(data.englishLevel) {
            case 0: return "Notions et +"
            case 2: return "Bon niveau et +"
            case 3: return "Courant et +"
            case 5: return "Bilingue"
            default: return "-"
        }
    }


    const getExperienceLabel = () => {
        let string = `${data.minExperience} - ${data.maxExperience} ans`
        if (data.maxExperience === 15) string += " et +"

        return string
    }


    const generateQueryParams = () => {

        const queryParams = {}

        queryParams.query = data.query !== undefined ? data.query : "*"
        queryParams.city = data.city ? data.city.id : null
        if(data.disponibilityDay !== undefined) queryParams.disponibility_day = data.disponibilityDay

        queryParams.email_filter = data.emailFilter ? 1 : 0
        queryParams.phone_filter = data.phoneFilter ? 1 : 0
        queryParams.not_read_filter = data.notReadFilter ? 1 : 0
        queryParams.include_foreign = data.includeForeign ? 1 : 0
        queryParams.include_remote = data.includeRemote ? 1 : 0

        queryParams.include_unknown_english_level = data.includeUnknownEnglishLevel ? 1 : 0
        queryParams.include_unknown_city = data.includeLocationMobility ? 1 : 0
        queryParams.include_unknown_experience = data.includeUnknownExperience ? 1 : 0
        queryParams.include_unknown_price = data.includeUnknownPrice ? 1 : 0

        if(data.englishLevel !== undefined) queryParams.english_level = data.englishLevel
        if(data.radius !== undefined) queryParams.location_radius = data.radius
        if(data.maxExperience !== undefined) queryParams.max_experience = data.maxExperience
        if(data.maxPrice !== undefined) queryParams.max_price = data.maxPrice
        if(data.minExperience !== undefined) queryParams.min_experience = data.minExperience
        if(data.minPrice !== undefined) queryParams.min_price = data.minPrice

        return queryParams
    }


    return (
        <Link to={"SEARCH"} queryParams={generateQueryParams()}>
            <motion.div
                className={data.isPinned ? "saved-research-item fav" : "saved-research-item"}
                variants={motionVariants}
                initial={"hidden"}
                animate={"visible"}
                exit={"hidden"}
            >
                <LoadingWidget active={isLoading} text={null}/>

                <div className={"stage"}>
                    <button onClick={handlePinClick} className={"action-icon pinned"}>
                        <FontAwesomeIcon icon={data.isPinned ? faStarFull : faStar}/>
                    </button>
                    <div className={"query"}>
                        <span>Recherche : </span>
                        <p>{data.query !== undefined ? data.query : "*"}</p>
                    </div>
                    <p className={"date"}>{data.creationDate.format("DD/MM/YYYY")}</p>
                    <button onClick={handleDelete} className={"action-icon delete"}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                </div>

                <div className={"stage"}>
                    <SearchParam title={"Localisation"} value={data.cityName}/>
                    <SearchParam title={"Rayon"} value={data.radius !== undefined ? `${data.radius} km` : "-"}/>
                    <SearchParam title={"Disponibilité"} value={data.disponibilityDay < 60 ? `Il y a ${data.disponibilityDay} jours max` : '∞'}/>
                    <SearchParam title={"Expérience"} value={getExperienceLabel()}/>
                    <SearchParam title={"Tarif journalier"} value={`${data.minPrice} - ${data.maxPrice} €`}/>
                    <SearchParam title={"Niveau d'anglais"} value={getEnglishLevelLabel()}/>
                    <SearchParam title={"Filtrer par"} value={
                        <>
                            {data.phoneFilter && <FontAwesomeIcon icon={faPhone}/>}
                            {data.emailFilter && <FontAwesomeIcon icon={faEnvelope}/>}
                            {data.notReadFilter && <FontAwesomeIcon icon={faEye}/>}
                            {!data.includeForeign && <span className={"filter-label"}>FR</span>}
                            {!data.includeRemote && <FontAwesomeIcon icon={faLaptopHouse}/>}
                            {!data.emailFilter && !data.phoneFilter && !data.notReadFilter && data.includeRemote && data.includeForeign && "-"}
                        </>
                    }/>
                </div>
            </motion.div>
        </Link>
    )
}


const SearchParam = ({title, value}) => {

    return(
        <div className={"param"}>
            <p className={"title"}>{title}</p>
            <span className={"value"}>{value}</span>
        </div>
    )
}