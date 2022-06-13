import {Helmet} from "react-helmet";
import SavedResearch from "../components/SavedResearch/SavedResearch";


export default function SavedResearchPage(props) {

    return(
        <>
            <Helmet>
                <title>Recherches sauvegardées | Jean-Michel.io</title>
            </Helmet>

            <SavedResearch/>
        </>
    )
}