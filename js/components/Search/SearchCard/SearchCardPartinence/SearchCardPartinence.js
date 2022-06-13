import SearchCard, {CardLabel} from "../SearchCard";
import classes from "./pertinence.module.scss"
import CheckIcon from "../../../Form/CheckIcon/CheckIcon";
import {faEnvelope, faEye, faGlobe, faLaptopHouse, faPhone} from "@fortawesome/free-solid-svg-icons";


export default function SearchCardPertinence({isOpen, searchProps}) {

    const {
        phoneFilter,
        setPhoneFilter,
        emailFilter,
        setEmailFilter,
        notReadFilter,
        setNotReadFilter,
        includeRemote,
        setIncludeRemote,
        includeForeign,
        setIncludeForeign,
    } = searchProps;


    return (
        <SearchCard
            isOpen={isOpen}
            isAdvanced
            hasTextLabel
            className={classes.card}
            contentClassName={classes.cardContent}
        >
            <CardLabel label={"Gagnez du temps :"} className={classes.label}/>
            <div className={classes.pertinenceContainer}>
                <CheckIcon
                    id={"phone-filter"}
                    icon={faPhone}
                    label={"N’afficher que les profils avec téléphone"}
                    // eslint-disable-next-line eqeqeq
                    checked={phoneFilter() == 1}
                    onChange={(checked) => setPhoneFilter(checked ? 1 : 0)}
                    className={classes.check}
                />

                <CheckIcon
                    id={"remote-filter"}
                    icon={faLaptopHouse}
                    label={"Exclure les profils 100% remote"}
                    // eslint-disable-next-line eqeqeq
                    checked={includeRemote() == 0}
                    onChange={(checked) => setIncludeRemote(checked ? 0 : 1)}
                    className={classes.check}
                />

                <CheckIcon
                    id={"notRead-filter"}
                    icon={faEye}
                    label={"N’afficher que les profils non lus"}
                    // eslint-disable-next-line eqeqeq
                    checked={notReadFilter() == 1}
                    onChange={(checked) => setNotReadFilter(checked ? 1 : 0)}
                    className={classes.check}
                />

                <CheckIcon
                    id={"mail-filter"}
                    icon={faEnvelope}
                    label={"N’afficher que les profils avec mail"}
                    // eslint-disable-next-line eqeqeq
                    checked={emailFilter() == 1}
                    onChange={(checked) => setEmailFilter(checked ? 1 : 0)}
                    className={classes.check}
                />

                <CheckIcon
                    id={"foreign-filter"}
                    icon={faGlobe}
                    label={"Exclure les profils étrangers"}
                    // eslint-disable-next-line eqeqeq
                    checked={includeForeign() == 0}
                    onChange={(checked) => setIncludeForeign(checked ? 0 : 1)}
                    className={classes.check}
                />
            </div>
        </SearchCard>
    )
}