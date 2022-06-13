import React, {
    useEffect,
    useRef,
    useState,
    useContext, useReducer, useCallback
} from "react";
import "./Search.scss";
import SearchForm from "./SearchForm/SearchForm";
import FreelancesList from "../FreelancesList/FreelancesList";
import LogoSolar from "../../res/logos/jean-michel-solar.png";
import TextTransition, {presets} from "react-text-transition";
import {SearchFreelanceContext} from "../../contexts/SearchFreelanceContext";
import useAuthManager from "../../hooks/useAuthManager";
import Button from "../Buttons/Button";
import {ModalContext} from "../../contexts/ModalContext";
import RegisterToSeeProfile from "../RegisterToSeeProfil/RegisterToSeeProfil";
import useQueryString, {getQueryStringValue} from "../../hooks/useQueryString";
import useSyncQueryLocalstorage from "../../hooks/useSyncQueryLocalstorage";
import useAxios from "../../hooks/useAxios";
import useFreelancesApi from "../../hooks/useFreelancesApi";
import {useIntervalWhen} from "rooks";
import Constant from "../../constant";
import SearchSort from "./SearchSort/SearchSort";
import valueWithSpaces from "../../utils/valueWithSpaces";
import ReserverToPremiumUser from "../ReserveToPremiumUser/ReserveToPremiumUser";


const TEXTS = [
    "sur LinkedIn",
    "chez les Alcooliques anonymes",
    "sur Github",
    "sur Mars",
    "sur Google",
    "chez les ch'tis",
    "sous le pied d'un cheval",
    "derrière toi",
    "à la cave",
    "en prison",
    "sur l'APEC",
];

let cancelSearchToken = null;

function freelancesLoadingReducer(loading, action) {
    switch (action.type) {
        case 'increment': {
            return loading + 1;
        }
        case 'decrement': {
            return loading - 1;
        }
        default:
            return 0;
    }
}

const Search = ({searchOnBookmark = false}) => {
    const {user, isLogged} = useAuthManager();
    const freelancesApi = useFreelancesApi();
    const isMountedRef = useRef(null);
    const [index, setIndex] = useState(0);
    const {toggleRegistration} = useContext(ModalContext);
    const axios = useAxios();
    const [freelances, setFreelances] = useState([]);
    const [nbFreelancesTotal, setNbFreelancesTotal] = useState(0);
    const [researchAlreadySaved, setResearchAlreadySaved] = useState(false)
    const [querySuggestion, setQuerySuggestion] = useState(null)
    const [maxPages, setMaxPages] = useState(1);
    const [isFreelancesLoading, dispatchFreelancesLoading] = useReducer(freelancesLoadingReducer, 0, () => 0);

    const {
        query,
        setQuery,
        resetQuery,
        isDefaultQuery,
        searchKey,
        isOnSearchPage,
        setExtra
    } = useContext(SearchFreelanceContext);


    const setFreelancesLoading = useCallback((isLoading) => {
        if (isLoading) {
            dispatchFreelancesLoading({type: 'increment'});
        } else {
            dispatchFreelancesLoading({type: 'decrement'});
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatchFreelancesLoading]);

    const [page, setPage] = useQueryString("page", 1);
    const [minExperience, setMinExperience, resetMinExperience, isDefaultMinExperience] = useSyncQueryLocalstorage("min_experience", 0, isOnSearchPage());
    const [maxExperience, setMaxExperience, resetMaxExperience, isDefaultMaxExperience] = useSyncQueryLocalstorage("max_experience", 15, isOnSearchPage());
    const [includeUnknownExperience, setIncludeUnknownExperience, resetIncludeUnknownExperience, isDefaultIncludeUnknownExperience] = useSyncQueryLocalstorage("include_unknown_experience", 1, isOnSearchPage());
    const [minPrice, setMinPrice, resetMinPrice, isDefaultMinPrice] = useSyncQueryLocalstorage("min_price", 0, isOnSearchPage());
    const [maxPrice, setMaxPrice, resetMaxPrice, isDefaultMaxPrice] = useSyncQueryLocalstorage("max_price", 1500, isOnSearchPage());
    const [includeUnknownPrice, setIncludeUnknownPrice, resetIncludeUnknownPrice, isDefaultIncludeUnknownPrice] = useSyncQueryLocalstorage("include_unknown_price", 1, isOnSearchPage());
    const [city, setCity, resetCity, isDefaultCity] = useSyncQueryLocalstorage('city', "null", isOnSearchPage());
    const [includeLocationMobility, setIncludeLocationMobility, resetIncludeLocationMobility, isDefaultIncludeLocationMobility] = useSyncQueryLocalstorage("include_unknown_city", 1, isOnSearchPage());
    const [includeForeign, setIncludeForeign, resetIncludeForeign, isDefaultIncludeForeign] = useSyncQueryLocalstorage("include_foreign", 1, isOnSearchPage());
    const [includeUnknownEnglishLevel, setIncludeUnknownEnglishLevel, resetIncludeUnknownEnglishLevel, isDefaultIncludeUnknownEnglishLevel] = useSyncQueryLocalstorage("include_unknown_english_level", 1, isOnSearchPage());
    const [englishLevel, setEnglishLevel, resetEnglishLevel, isDefaultEnglishLevel] = useSyncQueryLocalstorage("english_level", 0, isOnSearchPage());
    const [locationRadius, setLocationRadius, resetLocationRadius, isDefaultLocationRadius] = useSyncQueryLocalstorage("location_radius", 40, isOnSearchPage());
    const [phoneFilter, setPhoneFilter, resetPhoneFiler, isDefaultPhoneFilter] = useSyncQueryLocalstorage("phone_filter", 0, isOnSearchPage());
    const [emailFilter, setEmailFilter, resetEmailFilter, isDefaultEmailFilter] = useSyncQueryLocalstorage("email_filter", 0, isOnSearchPage());
    const [notReadFilter, setNotReadFilter, resetNotReadFilter, isDefaultNotReadFilter] = useSyncQueryLocalstorage("not_read_filter", 0, isOnSearchPage());
    const [disponibilityDay, setDisponibilityDay, resetDisponibilityDay, isDefaultDisponibilityDay] = useSyncQueryLocalstorage("disponibility_day", 60, isOnSearchPage());
    const [includeRemote, setIncludeRemote, resetIncludeRemote, isDefaultIncludeRemote] = useSyncQueryLocalstorage("include_remote", 1, isOnSearchPage());
    const [filterBy, setFilterBy, resetFilterBy, isDefaultFilterBy] = useSyncQueryLocalstorage("filter_by", "date", isOnSearchPage());
    const [notation, setNotation, resetNotation, isDefaultNotation] = useSyncQueryLocalstorage("note", 0, isOnSearchPage());


    const resetFilters = () => {
        resetMinExperience();
        resetQuery();
        resetMaxExperience();
        resetIncludeUnknownExperience();
        resetMinPrice();
        resetMaxPrice();
        resetCity();
        resetIncludeLocationMobility();
        resetIncludeUnknownEnglishLevel();
        resetEnglishLevel();
        resetLocationRadius();
        resetPhoneFiler();
        resetEmailFilter();
        resetIncludeUnknownPrice();
        resetDisponibilityDay();
        resetNotReadFilter();
        resetIncludeForeign();
        resetIncludeRemote();
        resetFilterBy();
        resetNotation();
    }


    const hasMainFiltersChanged = () => {
        return !isDefaultQuery ||
            !isDefaultLocationRadius() ||
            !isDefaultCity() ||
            !isDefaultDisponibilityDay() ||
            !isDefaultMinPrice() || !isDefaultMaxPrice()
    }


    const hasAdvancedFiltersChanged = () => {
        return !isDefaultIncludeUnknownPrice() ||
            !isDefaultIncludeLocationMobility() ||
            !isDefaultMinExperience() || !isDefaultMaxExperience() || !isDefaultIncludeUnknownExperience() ||
            !isDefaultEnglishLevel() || !isDefaultIncludeUnknownEnglishLevel() ||
            !isDefaultNotReadFilter() ||
            !isDefaultPhoneFilter() ||
            !isDefaultIncludeRemote() ||
            !isDefaultEmailFilter() ||
            !isDefaultIncludeForeign() ||
            !isDefaultNotReadFilter() ||
            !isDefaultNotation()
     }


    const fetchFreelances = ({pageToFetch, onlyBookmark = false}) => {
        if (cancelSearchToken) {
            cancelSearchToken.cancel();
        }
        cancelSearchToken = axios.CancelToken.source();

        if (pageToFetch === 1) {
            setFreelances([]);
            setNbFreelancesTotal(0);
        }

        setFreelancesLoading(true);
        freelancesApi
            .getFreelances({
                cancelToken: cancelSearchToken.token,
                query: query(),
                page: pageToFetch,
                minExperience: minExperience(),
                maxExperience: maxExperience(),
                includeUnknownExperience: includeUnknownExperience(),
                minPrice: minPrice(),
                maxPrice: maxPrice(),
                includeUnknownPrice: includeUnknownPrice(),
                cityId: city(),
                includeLocationMobility: includeLocationMobility(),
                includeForeign: includeForeign(),
                includeUnknownEnglishLevel: includeUnknownEnglishLevel(),
                englishLevel: englishLevel(),
                locationRadius: locationRadius(),
                phoneFilter: phoneFilter(),
                emailFilter: emailFilter(),
                notReadFilter: notReadFilter(),
                onlyBookmark: onlyBookmark,
                disponibilityDay: disponibilityDay(),
                includeRemote: includeRemote(),
                filterBy: filterBy(),
                notation: notation()
            })
            .then((freelancesArray) => {
                setNbFreelancesTotal(freelancesArray.nb_items);
                setResearchAlreadySaved(freelancesArray.extra.researchAlreadySaved ?? false);
                setQuerySuggestion(freelancesArray.extra.query_suggestion ?? null);

                const curPage = freelancesArray.current_page !== undefined ? freelancesArray.current_page : 1;

                if (curPage <= 1) {
                    setFreelances(freelancesArray.freelances);
                } else {
                    setFreelances(freelances.concat(freelancesArray.freelances));
                }
                setPage(curPage);
                setMaxPages(freelancesArray.nb_pages !== undefined ? freelancesArray.nb_pages : 0);
                setExtra(freelancesArray.extra);
            })
            .catch((err) => {
            })
            .finally(() => {
                setFreelancesLoading(false);
            });
    }


    useEffect(() => {
        setFreelances([]);
        setPage(1);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchKey]);


    useEffect(() => {
        const value = getQueryStringValue("query");
        if (value) {
            setQuery(value);
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        if (!isDefaultQuery() && filterBy() === Constant.FILTER_BY_DATE) {
            setFilterBy(Constant.FILTER_BY_PERTINENCE)
        }
        else if (isDefaultQuery()) {
            setFilterBy(Constant.FILTER_BY_DATE)
        }
        else {
            fetchFreelances({pageToFetch: 1, onlyBookmark: searchOnBookmark});
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query()])


    useEffect(() => {
        fetchFreelances({pageToFetch: 1, onlyBookmark: searchOnBookmark});
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [emailFilter(), phoneFilter(), notReadFilter(), includeForeign(), locationRadius(), minExperience(), maxExperience(), includeUnknownExperience(), minPrice(), maxPrice(), includeUnknownPrice(), city(), includeLocationMobility(), disponibilityDay(), includeUnknownEnglishLevel(), englishLevel(), includeRemote(), filterBy(), notation()]);


    useIntervalWhen(() => {
        if (index >= TEXTS.length - 1) {
            setIndex(0);
        } else {
            setIndex((index) => index + 1);
        }
    }, 1000, true)


    useEffect(() => {
        isMountedRef.current = true;
        setPage(1);

        return () => {
            isMountedRef.current = false;
        };
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);


    return (
        <div className={searchOnBookmark ? "search search-bookmark" : "search"}>
            <SearchForm
                searchQuery={{
                    query,
                    setQuery,
                    querySuggestion
                }}
                searchExperience={{
                    setMinExperience,
                    setMaxExperience,
                    minExperience,
                    maxExperience,
                    includeUnknownExperience,
                    setIncludeUnknownExperience,
                    isDefaultExperience: () => isDefaultMinExperience() && isDefaultMaxExperience()
                }}
                searchPrice={{
                    setMinPrice,
                    setMaxPrice,
                    minPrice,
                    maxPrice,
                    includeUnknownPrice,
                    setIncludeUnknownPrice,
                    isDefaultPrice: () => isDefaultMinPrice() && isDefaultMaxPrice()
                }}
                searchCity={{
                    city,
                    setCity,
                    includeLocationMobility,
                    setIncludeLocationMobility,
                    locationRadius,
                    setLocationRadius,
                    isDefaultLocationRadius,
                }}
                searchNotation={{
                    notation,
                    setNotation,
                }}
                searchEnglish={{
                    englishLevel,
                    setEnglishLevel,
                    setIncludeUnknownEnglishLevel,
                    includeUnknownEnglishLevel,
                    isDefaultEnglishLevel,
                }}
                searchDisponibility={{
                    disponibilityDay,
                    setDisponibilityDay,
                    isDefaultDisponibilityDay
                }}
                searchPertinence={{
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
                }}
                searchOnBookmark={searchOnBookmark}
                isSearching={isFreelancesLoading}
                resetFilters={resetFilters}
                hasMainFiltersChanged={hasMainFiltersChanged}
                hasAdvancedFiltersChanged={hasAdvancedFiltersChanged}
                isResearchAlreadySaved={researchAlreadySaved}
            />

            <div className={"search-state"}>
                {isFreelancesLoading > 0 && (freelances.length === 0 || page === 1) &&
                    <div className={"search-loader"}>
                        <img className={"icon"} src={LogoSolar} alt={"logo jean-michel.io"}/>
                        <section className={"inline"} style={{fontSize: "18px"}}>
                            Jean-Michel recherche
                            <TextTransition
                                text={TEXTS[index % TEXTS.length]}
                                springConfig={presets.wobbly}
                                inline={true}
                                style={{margin: "0 5px"}}
                                overflow={true}
                            />
                        </section>
                    </div>
                }

                {(!isFreelancesLoading || freelances.length > 0) &&
                    <div className={"search-informations"}>
                        <img className={"icon"} src={LogoSolar} alt={"logo jean-michel.io"}/>
                        <section className={"inline"} style={{fontSize: "18px"}}>
                            <span className={"nb-freelances"}>{nbFreelancesTotal ? valueWithSpaces(nbFreelancesTotal) : 0}</span>
                            {searchOnBookmark ? "favoris correspondent à votre recherche" : "freelances ont été trouvés par Jean-Michel sur le web"}
                        </section>
                    </div>
                }
            </div>

            <SearchSort
                className={"sort-card"}
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                hasChanged={!isDefaultFilterBy()}
                hidden={!isLogged() || freelances.length === 0}
            />

            <div id={"result-list"}>
                {freelances.length > 0 &&
                    <FreelancesList freelances={freelances}/>
                }

                {nbFreelancesTotal > 0 && page < maxPages && freelances.length > 0 &&
                    <div className={"search-state"}>
                        {isFreelancesLoading ? (
                            <div className={"search-loader"}>
                                <img className={"icon"} src={LogoSolar} alt={"logo jean-michel.io"}/>
                                <section className={"inline"} style={{fontSize: "18px"}}>
                                    Jean-Michel recherche
                                    <TextTransition
                                        text={TEXTS[index % TEXTS.length]}
                                        springConfig={presets.wobbly}
                                        inline={true}
                                        style={{margin: "0 5px"}}
                                        overflow={true}
                                    />
                                </section>
                            </div>
                        ) : (
                            <div className={"show-more"}>
                                <Button
                                    variant={"cta-large-light-blue"}
                                    onClick={() => {
                                        if (user) {
                                            fetchFreelances({pageToFetch: page + 1, onlyBookmark: searchOnBookmark});
                                        } else {
                                            toggleRegistration();
                                        }
                                    }}
                                    disabled={user && page >= maxPages}
                                >
                                    Afficher plus
                                </Button>
                                <p>(<span>{page * 10}</span> / {nbFreelancesTotal} freelances affichés)</p>
                            </div>
                        )}
                    </div>
                }

                {!isFreelancesLoading && isLogged() === false && <RegisterToSeeProfile/>}
                {!isFreelancesLoading && isLogged() && user?.isCollaborator !== true && user?.subscription_code === "RADIN" && <ReserverToPremiumUser/>}
            </div>
        </div>
    );
};

export default Search;
