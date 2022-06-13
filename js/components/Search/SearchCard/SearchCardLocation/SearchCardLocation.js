import React, {useEffect, useState} from "react";
import SearchCard, {CardInfo, CardLabel} from "../SearchCard";
import classes from "./location.module.scss"
import {faBullseye, faLocationDot} from "@fortawesome/free-solid-svg-icons";
import {Form} from "react-bootstrap";
import {AsyncPaginate} from "react-select-async-paginate";
import useAxios from "../../../../hooks/useAxios";
import useCitiesApi from "../../../../hooks/useCitiesApi";
import classNames from "classnames";
import Switch from "../../../Form/Switch/Switch";


let cancelCitySearchToken = null;


export default function SearchCardLocation({isOpen, searchProps}) {

    const {city, setCity, locationRadius, setLocationRadius, includeLocationMobility, setIncludeLocationMobility} = searchProps;
    const {isDefaultLocationRadius} = searchProps;
    const axios = useAxios();
    const { getCities, getCity } = useCitiesApi();
    const [currentCity, setCurrentCity] = useState(null);
    const [loadingCity, setLoadingCity] = useState(false);


    useEffect(() => {
        //"null" normal
        if (city() && city() !== "null") {
            setLoadingCity(true);
            getCity({ id: city() })
                .then((city) => {
                    setCurrentCity(
                        getCityOption({
                            cityId: city.id,
                            cityName: city.name,
                            zipCode: city.zipCode,
                            countryIso2: city.countryIso2
                        })
                    );
                })
                .catch(() => {
                })
                .finally(() => {
                    setLoadingCity(false);
                });
        } else {
            setCurrentCity(null);
        }

        return () => {
            cancelCitySearchToken = null;
        };
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [city()]);


    const onCityChange = (data) => {
        data ? setCity(data.value) : setCity(null);
        setCurrentCity(data);
    };


    const getCityOption = ({ cityId, cityName, zipCode, countryIso2 }) => {
        return { label: `${zipCode} - ${cityName} (${countryIso2})`, value: cityId };
    };


    const promiseCities = (inputValue) => {
        if (inputValue === "") {
            return {options: []};
        }
        if (cancelCitySearchToken) {
            cancelCitySearchToken.cancel();
        }
        cancelCitySearchToken = axios.CancelToken.source();

        return getCities({
            query: inputValue,
            cancelToken: cancelCitySearchToken.token,
        }).then((cities) => {
            const citiesMap = cities.map((city) => {
                return getCityOption({
                    cityId: city.id,
                    cityName: city.name,
                    zipCode: city.zipCode,
                    countryIso2: city.countryIso2
                })
            });
            return {options: citiesMap};
        })
    };


    return (
        <SearchCard
            isOpen={isOpen}
            contentClassName={classes.content}
            optionChildren={
                <>
                    <Switch
                        id="include-location-mobility"
                        inline
                        onChange={({ value }) => {
                            setIncludeLocationMobility(value ? 1 : 0);
                        }}
                        checked={includeLocationMobility()}
                    />
                    <CardInfo text={"Inclure les profils mobiles dans la localisation choisie"}/>
                </>
            }
        >
            <div className={classes.radius}>
                <CardLabel icon={faBullseye} />
                <Form.Control
                    className={classNames("inputText")}
                    type="text"
                    value={isDefaultLocationRadius() ? "" : locationRadius()}
                    placeholder={"40"}
                    onChange={(event) => {
                        setLocationRadius(event.target.value);
                    }}
                />
                <span className={classes.unit}>
                    km autour de
                </span>
            </div>

            <div className={classes.city}>
                <CardLabel icon={faLocationDot} />
                <AsyncPaginate
                    isClearable={true}
                    noOptionsMessage={() => "Tapez votre ville"}
                    className={classes.citySelect}
                    onChange={(event) => {
                        onCityChange(event);
                    }}
                    placeholder="France & frontaliers"
                    classNamePrefix={"select-city"}
                    loadOptions={promiseCities}
                    isLoading={loadingCity}
                    value={currentCity}
                    cacheOptions={true}
                    defaultOptions
                    autoComplete={"off"}
                    debounceTimeout={300}
                />
            </div>
        </SearchCard>
    )
}