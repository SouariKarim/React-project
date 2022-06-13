import SearchCard, {CardInfo, CardLabel, CardUnit} from "../SearchCard";
import RangeInput from "../../../Form/RangeInput/RangeInput";
import React from "react";


export default function SearchCardDisponibility({isOpen, searchProps}) {

    const {disponibilityDay, setDisponibilityDay, isDefaultDisponibilityDay} = searchProps;

    return (
        <SearchCard
            isOpen={isOpen}
            hasTextLabel
            optionChildren={
                <CardInfo withIcon text={"Nos robots scrapent quotidiennement les dispos sur le web"}/>
            }
        >
            <CardLabel label={"Dernière dispo connue :"}/>
            <RangeInput
                hasChanged={isDefaultDisponibilityDay() === false}
                doubleTrack={false}
                roundValue={true}
                minValue={1}
                maxValue={60}
                value={{min: parseInt(disponibilityDay())}}
                setMin={(v) => setDisponibilityDay(v)}
                formatLabel={(value, min, max) => value >= max ? "∞" : value + "j"}
            />
            <CardUnit unit={"max"}/>
        </SearchCard>
    )
}