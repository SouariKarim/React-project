import SearchCard, {CardInfo, CardLabel} from "../SearchCard";
import Switch from "../../../Form/Switch/Switch";
import React from "react";
import Select from 'react-select'
import classes from "./english.module.scss"
import Constant from "../../../../constant";
import classNames from "classnames/bind";


const buildClasses = classNames.bind(classes);
const englishLevelOptions = [
    {value: Constant.ENGLISH_LEVEL_DEFAULT, label: "Aucun"},
    {value: Constant.ENGLISH_LEVEL_GOOD, label: "Bon niveau"},
    {value: Constant.ENGLISH_LEVEL_FLUENT, label: "Courant"},
    {value: Constant.ENGLISH_LEVEL_NATIVE, label: "Bilingue"}
];


export default function SearchCardEnglish({isOpen, searchProps}) {

    const {englishLevel, setEnglishLevel, setIncludeUnknownEnglishLevel, includeUnknownEnglishLevel} = searchProps;
    const {isDefaultEnglishLevel} = searchProps;
    // eslint-disable-next-line eqeqeq
    const selectedOption = englishLevelOptions.find((option) => option.value == englishLevel())

    return (
        <SearchCard
            isOpen={isOpen}
            isAdvanced
            hasTextLabel
            optionChildren={
                <>
                    <Switch
                        id="include-unknown-english"
                        inline
                        onChange={({ value }) => {
                            setIncludeUnknownEnglishLevel(value ? 1 : 0);
                        }}
                        checked={includeUnknownEnglishLevel()}
                    />
                    <CardInfo text={"Inclure les profils avec anglais inconnu"}/>
                </>
            }
        >
            <CardLabel label={"Niveau anglais minimal :"}/>
            <Select
                id={"select-english-level"}
                value={selectedOption}
                placeholder={"Niveau"}
                classNamePrefix={"english-filter"}
                className={buildClasses(classes.select, {notDefault: !isDefaultEnglishLevel()})}
                onChange={({ value }) => {
                    setEnglishLevel(value)
                }}
                options={englishLevelOptions}
            />
        </SearchCard>
    )
}