import React, {useEffect, useState} from "react";
import useSavedResearchApi from "../../hooks/useSavedResearchApi";
import "./SavedResearch.scss"
import SavedResearchItem from "./SavedResearchItem";
import {AnimatePresence} from "framer-motion";
import JmSpinner from "../JmSpinner/JmSpinner";


export default function SavedResearch() {

    const [savedResearch, setSavedResearch] = useState([])
    const [isPageLoading, setPageLoading] = useState(true)
    const {getAllSavedResearch, updateSavedResearch, deleteSavedResearch} = useSavedResearchApi();


    useEffect(() => {
        getAllSavedResearch()
            .then((response) => {
                setSavedResearch(response)
            })
            .finally(() => setPageLoading(false))
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const getSortedResearch = () => {
        if(savedResearch.length > 0){
            const pinnedResearch = savedResearch.filter((item) => item.isPinned === true)
                .sort((a, b) => a.creationDate.isBefore(b.creationDate))

            const normalResearch = savedResearch.filter((item) => item.isPinned === false)
                .sort((a, b) => a.creationDate.isBefore(b.creationDate))

            return pinnedResearch.concat(normalResearch)
        }

        return []
    }

    const handleItemUpdate = (payload) => {
        return updateSavedResearch(payload).then((response) => {
            setSavedResearch(response)
        })
    }



    const handleItemDelete = async (payload) => {
        return deleteSavedResearch(payload).then((response) => {
            setSavedResearch(response)
        })
    }


    return(
        <div className={"saved-research-container"}>
            <AnimatePresence>
                {isPageLoading ? (
                    <JmSpinner/>
                ) : (
                    <>
                        {savedResearch.length === 0 &&
                            <p className={"empty-message"}>Aucune recherche n'a été sauvegardé jusqu'à présent.</p>
                        }

                        {getSortedResearch().map((item, index) =>
                            <SavedResearchItem key={index} index={index} data={item} onUpdate={handleItemUpdate} onDelete={handleItemDelete}/>
                        )}
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}