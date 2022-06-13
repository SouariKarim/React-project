import SearchCard, {CardInfo, CardLabel, CardUnit} from "../SearchCard";
import RangeInput from "../../../Form/RangeInput/RangeInput";
import React from "react";
import Switch from "../../../Form/Switch/Switch";


export default function SearchCardTjm({isOpen, searchProps}) {

    const {minPrice, maxPrice, setMinPrice, setMaxPrice, isDefaultPrice, includeUnknownPrice, setIncludeUnknownPrice} = searchProps

    return (
        <SearchCard
            isOpen={isOpen}
            hasTextLabel
            optionChildren={
                <>
                    <Switch
                        id="include-location-mobility"
                        inline
                        onChange={({ value }) => {
                            setIncludeUnknownPrice(value ? 1 : 0);
                        }}
                        checked={includeUnknownPrice()}
                    />
                    <CardInfo text={"Inclure les profils avec tarif inconnu"}/>
                </>
            }
        >
            <CardLabel label={"Tarif journalier :"} />
            <RangeInput
                hasChanged={isDefaultPrice() === false}
                roundValue={true}
                minValue={0}
                maxValue={1500}
                value={{min: parseInt(minPrice()), max: parseInt(maxPrice())}}
                setMin={setMinPrice}
                setMax={setMaxPrice}
                formatLabel={(value, min, max) => value + "€"}
                step={50}
            />
            <CardUnit unit={"HT"}/>
        </SearchCard>
    )
}