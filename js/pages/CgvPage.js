import {Helmet} from "react-helmet";
import Cgv from "../components/Cgv/Cgv";


export default function CgvPage(props) {

    return(
        <>
            <Helmet>
                <title>Conditions générales de vente du site Jean-Michel.io</title>
            </Helmet>

            <Cgv {...props}/>
        </>
    )
}