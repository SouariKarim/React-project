import React, {useState, useEffect} from "react";
import {Col, Container, Row} from "react-bootstrap";
import Button from "../../Buttons/Button";
import {faAngleDown, faAngleUp, faCheck, faRotateRight, faSave} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SearchCardQuery from "../SearchCard/SearchCardQuery/SearchCardQuery";
import useAuthManager from "../../../hooks/useAuthManager";
import LoadingWidget from "../../Loading/LoadingWidget/LoadingWidget";
import useSavedResearchApi from "../../../hooks/useSavedResearchApi";
import useToast from "../../../hooks/useToast";
import SearchCardLocation from "../SearchCard/SearchCardLocation/SearchCardLocation";
import SearchCardDisponibility from "../SearchCard/SearchCardDisponibility/SearchCardDisponibility";
import SearchCardTjm from "../SearchCard/SearchCardTjm/SearchCardTjm";
import classNames from "classnames/bind";
import SearchCardNotation from "../SearchCard/SearchCardNotation/SearchCardNotation";
import classes from "./form.module.scss";
import SearchCardExperience from "../SearchCard/SearchCardExperience/SearchCardExperience";
import SearchCardEnglish from "../SearchCard/SearchCardEnglish/SearchCardEnglish";
import SearchCardPertinence from "../SearchCard/SearchCardPertinence/SearchCardPertinence";


const bindClasses = classNames.bind(classes)


export default function SearchForm({
    isSearching,
    searchQuery,
    searchExperience,
    searchPrice,
    searchCity,
    searchEnglish,
    searchNotation,
    searchPertinence,
    resetFilters,
    searchOnBookmark,
    searchDisponibility,
    isResearchAlreadySaved,
    hasMainFiltersChanged,
    hasAdvancedFiltersChanged,
}) {

    const toast = useToast();
    const {isLogged} = useAuthManager();
    const {createSavedResearch} = useSavedResearchApi();
    const [isLoading, setLoading] = useState(false);
    const shouldBeOpen = isLogged() && (hasAdvancedFiltersChanged() || localStorage.getItem("advanced_filters_open") === "1");
    const [isOpen, setOpen] = useState(shouldBeOpen);

    const {query, setQuery, querySuggestion} = searchQuery;
    const [typingTimeout, setTypingTimeout] = useState(null);
    const [originalQuery, setOriginalQuery] = useState(query)
    const [typingQuery, setTypingQuery] = useState(originalQuery);

    const [currentResearchSaved, setCurrentResearchSaved] = useState(false)


    useEffect(() => {
        localStorage.setItem("advanced_filters_open", isOpen ? "1" : "0");
    }, [isOpen])


    useEffect(() => {
        setCurrentResearchSaved(isResearchAlreadySaved)
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSearching, isResearchAlreadySaved])


    useEffect(() => {
        return () => {
            if (typingTimeout !== null) {
                clearTimeout(typingTimeout);
            }
        };
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        if (query !== originalQuery) {
            if (typingQuery === originalQuery) {
                setTypingQuery(query)
            }
            setOriginalQuery(query)
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])


    const handleQueryChange = (newQuery) => {
        setTypingQuery(newQuery);
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        setTypingTimeout(setTimeout(function () {
            setQuery(newQuery);
        }, 500));
    };


    const handleResetFilters = () => {
        setTypingQuery("")
        resetFilters()
    }


    const saveFilters = () => {
        setLoading(true)
        toast.promise({
            promise: createSavedResearch({
                typingQuery,
                searchPrice,
                searchExperience,
                searchCity,
                searchEnglish,
                searchPertinence,
                searchDisponibility
            }),
            loadingText: "Sauvegarde de votre recherche",
            successText: "Votre recherche est sauvegardée !",
            style: {minWidth: 300}
        }).then((result) => {
            setCurrentResearchSaved(true)
        }).finally(() => setLoading(false))
    }


    return (
        <div className={classes.searchForm}>
            <Container fluid className={bindClasses("container", {isOpen, searchOnBookmark})}>
                <Row className={"gy-3 mb-3"}>
                    <Col className={classes.queryCol}>
                        <SearchCardQuery
                            isOpen={isOpen}
                            query={typingQuery}
                            querySuggestion={querySuggestion}
                            setQuery={handleQueryChange}
                        />

                        <div className={classNames("ms-3", classes.actions)}>
                            <LoadingWidget
                                active={isSearching || isLoading}
                                text={null}
                                className={classes.loader}
                            />

                            {currentResearchSaved ?
                                <Button variant={"hint light"} to={"SAVED_RESEARCH"} disabled={!isLogged() || isSearching}>
                                    <FontAwesomeIcon icon={faCheck}/>
                                    Sauvegardé
                                </Button>
                                :
                                <Button variant={"hint secondary"} onClick={saveFilters} disabled={!isLogged() || isSearching}>
                                    <FontAwesomeIcon icon={faSave}/>
                                    Sauvegarder
                                </Button>
                            }

                            <Button
                                variant={hasAdvancedFiltersChanged() || hasMainFiltersChanged() ? "hint" : "hint secondary"}
                                onClick={handleResetFilters}
                                disabled={isSearching}
                            >
                                <FontAwesomeIcon icon={faRotateRight}/>
                                Réinitialiser
                            </Button>
                        </div>
                    </Col>
                </Row>

                <Row className={"g-3"}>
                    <Col lg={6} xxl={4}>
                        <SearchCardLocation isOpen={isOpen} searchProps={searchCity}/>
                    </Col>

                    <Col lg={6} xxl={4}>
                        <SearchCardDisponibility isOpen={isOpen} searchProps={searchDisponibility}/>
                    </Col>

                    <Col lg={6} xxl={4}>
                        <SearchCardTjm isOpen={isOpen} searchProps={searchPrice}/>
                    </Col>

                    <Col lg={6} xxl={4} className={bindClasses("advancedCol", {isOpen})}>
                        <SearchCardNotation isOpen={isOpen} searchProps={searchNotation}/>
                    </Col>

                    <Col lg={6} xxl={4} className={bindClasses("advancedCol", {isOpen})}>
                        <SearchCardExperience isOpen={isOpen} searchProps={searchExperience}/>
                    </Col>

                    <Col lg={6} xxl={4} className={bindClasses("advancedCol", {isOpen})}>
                        <SearchCardEnglish isOpen={isOpen} searchProps={searchEnglish}/>
                    </Col>

                    <Col xs={12} className={bindClasses("advancedCol", {isOpen})}>
                        <SearchCardPertinence isOpen={isOpen} searchProps={searchPertinence}/>
                    </Col>
                </Row>
            </Container>

            <Button className={classes.showFilterBtn} onClick={() => setOpen(!isOpen)}>
                {isOpen ?
                    <>
                        <FontAwesomeIcon icon={faAngleUp}/>
                        Moins de filtres
                    </>
                    :
                    <>
                        <FontAwesomeIcon icon={faAngleDown}/>
                        Plus de filtres
                    </>
                }
            </Button>
        </div>
    );
};