import {Helmet} from "react-helmet";
import CreditManage from "../components/CreditManage/CreditManage";


export default function CreditPage(props) {

    return(
        <>
            <Helmet>
                <title>Mes crédits | Jean-Michel.io</title>
            </Helmet>

            <CreditManage {...props}/>
        </>
    )
}