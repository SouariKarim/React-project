import {Helmet} from "react-helmet";
import MyAccount from "../components/MyAccount/MyAccount";


export default function AccountPage(props) {

    return(
        <>
            <Helmet>
                <title>Mon compte | Jean-Michel.io</title>
            </Helmet>

            <MyAccount {...props}/>
        </>
    )
}