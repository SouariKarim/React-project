import SearchCard, {CardInfo, CardLabel, CardUnit} from "../SearchCard";
import RangeInput from "../../../Form/RangeInput/RangeInput";
import React from "react";
import Switch from "../../../Form/Switch/Switch";


export default function SearchCardExperience({isOpen, searchProps}) {

    const {minExperience, maxExperience, setMinExperience, setMaxExperience, includeUnknownExperience, setIncludeUnknownExperience} = searchProps;
    const {isDefaultExperience} = searchProps;

    return (
        <SearchCard
            isOpen={isOpen}
            hasTextLabel
            isAdvanced
            optionChildren={
                <>
                    <Switch
                        id="include-unknown-experience"
                        inline
                        onChange={({ value }) => {
                            setIncludeUnknownExperience(value ? 1 : 0);
                        }}
                        checked={includeUnknownExperience()}
                    />
                    <CardInfo text={"Inclure les profils avec expérience inconnue"}/>
                </>
            }
        >
            <CardLabel label={"Expérience :"}/>
            <RangeInput
                hasChanged={isDefaultExperience() === false}
                minValue={0}
                maxValue={15}
                value={{
                    min:
                        parseInt(minExperience()) < 0
                            ? 0
                            : parseInt(minExperience()),
                    max: parseInt(maxExperience()),
                }}
                setMin={setMinExperience}
                setMax={setMaxExperience}
                formatLabel={(value, min, max) => {
                    if (value >= max) {
                        return value + " +";
                    }

                    return value;
                }}
            />
            <CardUnit unit={"ans"}/>
        </SearchCard>
    )
}