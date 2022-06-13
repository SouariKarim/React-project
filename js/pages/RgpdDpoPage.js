import {Helmet} from "react-helmet";
import RgpdDpo from "../components/RgpdDpo/RgpdDpo";


export default function RgpdDpoPage(props) {

    return(
        <>
            <Helmet>
                <title>RGPD & DPO | Jean-Michel.io</title>
            </Helmet>

            <RgpdDpo {...props}/>
        </>
    )
}