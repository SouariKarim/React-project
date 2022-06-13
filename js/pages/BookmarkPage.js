import {Helmet} from "react-helmet";
import React, {useContext, useEffect} from "react";
import {SearchFreelanceContext} from "../contexts/SearchFreelanceContext";
import Search from "../components/Search/Search";


export default function BookmarkPage(props) {

    const { setSearchKey } = useContext(SearchFreelanceContext);


    useEffect(() => {
        setSearchKey("BOOKMARK");
        // eslint-disable-next-line
    }, []);


    return (
        <>
            <Helmet>
                <title>Mes favoris | Jean-Michel.io</title>
            </Helmet>

            <Search searchOnBookmark={true} {...props}/>
        </>
    )
};