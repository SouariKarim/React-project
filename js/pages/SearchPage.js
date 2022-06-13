import React, { useContext, useEffect } from "react";
import {SearchFreelanceContext} from "../contexts/SearchFreelanceContext";
import Search from "../components/Search/Search";
import {Helmet} from "react-helmet";


export default function SearchPage(props) {

    const { setSearchKey } = useContext(SearchFreelanceContext);


    useEffect(() => {
        setSearchKey("SEARCH_PAGE");
        // eslint-disable-next-line
    }, []);


    return (
        <>
            <Helmet>
                <title>Résultats de recherche | Jean-Michel.io</title>
                <link rel="canonical" href="https://www.jean-michel.io/search?disponibility_day=60&email_filter=0&include_unknown_english_level=1&include_unknown_city=1&include_unknown_experience=1&include_unknown_price=1&location_radius=40&max_experience=15&max_price=1500&min_experience=0&min_price=0&page=1&phone_filter=0&query=" />
            </Helmet>

            <Search searchOnBookmark={false} {...props} />
        </>
    )
}