import React, {useEffect, useState} from 'react';
import parse from 'html-react-parser';
import Button from "../../Buttons/Button";
import useTextHighlightText from "../../../hooks/useTextHighlightText";
import {FreelanceSectionCard, FreelanceSectionTitle} from "../../FreelanceSectionCard/FreelanceSectionCard";
import useAuthManager from "../../../hooks/useAuthManager";
import "./FreelanceDescription.scss"


const maxLines = 20


export default function FreelanceDescription({freelance, cloudKeywords = null}) {

    const [summaries, setSummaries] = useState([<Summary key={"unique"}/>]);
    const {highlightText} = useTextHighlightText();
    const {isCollaborator} = useAuthManager()


    useEffect(() => {
        if (freelance) {
            if(isCollaborator() && freelance.privateSummary){
                mountPrivateDescription()
            }
            else if(freelance.summary){
                mountPublicDescription()
            }
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [freelance, cloudKeywords]);


    const mountPublicDescription = () => {
        const lines = parse(highlightText(freelance.summary, cloudKeywords ? cloudKeywords.keywords : []));
        setSummaries([<Summary key={"unique"} content={lines}/>])
    }


    const mountPrivateDescription = () => {
        setSummaries(freelance.privateSummary.map((summary, index) => {
            const lines = parse(highlightText(summary, cloudKeywords ? cloudKeywords.keywords : []));
            return <Summary key={index} content={lines}/>
        }))
    }


    return (
        <FreelanceSectionCard>
            <FreelanceSectionTitle>Infos</FreelanceSectionTitle>
            <div className={"summaries"}>
                {summaries}
            </div>
        </FreelanceSectionCard>
    )
}


const Summary = (props) => {

    const [showMore, setShowMore] = useState(false);
    const content = props.content ? props.content : "Aucune description"
    const hasShowMore = (content.length > maxLines) && typeof content !== "string"
    const displayedContent = (hasShowMore && !showMore) ? content.slice(0, maxLines) : content


    const toggleShowMore = () => {
        setShowMore(!showMore);
    }


    return(
        <div className={"summary"}>
            <p className={"highlight-text"}>
                {displayedContent}
            </p>

            {hasShowMore &&
                <Button className={"show-more"} variant={"link"} onClick={toggleShowMore}>{showMore ? 'voir moins' : '... voir plus'}</Button>
            }
        </div>
    )
}