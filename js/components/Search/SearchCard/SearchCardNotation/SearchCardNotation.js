import SearchCard, {CardInfo, CardLabel} from "../SearchCard";
import React from "react";
import useAuthManager from "../../../../hooks/useAuthManager";
import StarsNotation from "../../../Form/StarsNotation/StarsNotation";


export default function SearchCardNotation({isOpen, searchProps}) {

    const {notation, setNotation} = searchProps;
    const {user} = useAuthManager();
    const nbNotedProfiles = user?.company?.nb_freelance_notations ?? 0;


    return (
        <SearchCard
            isOpen={isOpen}
            isAdvanced
            hasTextLabel
            disabled={nbNotedProfiles === 0}
            optionChildren={
                <CardInfo
                    withIcon
                    text={nbNotedProfiles > 0 ?
                        `Votre entreprise a noté ${nbNotedProfiles} freelances` :
                        "Votre entreprise n'a noté aucun freelance"
                }
                />
            }
        >
            <CardLabel label={"Note freelance minimale :"}/>
            <StarsNotation
                value={notation()}
                setValue={setNotation}
                disabled={nbNotedProfiles === 0}
            />
        </SearchCard>
    )
}