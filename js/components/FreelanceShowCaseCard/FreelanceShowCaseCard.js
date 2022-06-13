import "./FreelanceShowCaseCard.scss";
import FreelanceProfilePicture from "../FreelanceProfilePicture/FreelanceProfilePicture";
import Link from "../Link/Link";
import {faEnvelope as IconEnvelope, faFilePdf, faPhone as IconPhone} from "@fortawesome/free-solid-svg-icons";
import {faLinkedin as IconLinkedin} from "@fortawesome/free-brands-svg-icons";
import MaltIcon from "../Icon/MaltIcon";
import ApecIcon from "../Icon/ApecIcon";
import React from "react";
import InfoIconWrapper from "../InfoIconWrapper/InfoIconWrapper";


export default function FreelanceShowCaseCard({freelance}) {
    return (
        <Link to={"FREELANCE_PROFILE"} toParams={{id: freelance.id}} className={"freelance-showcase-card mt-4"}>
            <FreelanceProfilePicture freelance={ freelance }/>

            <div className={"freelance-showcase-info"}>
                <p className={"freelance-title"}>{ freelance.title }</p>
                <p className={"freelance-subtitle"}>
                    { freelance.price_min } - { freelance.price_max }€ / jour
                </p>
                <div className={"container-info"}>
                    <InfoIconWrapper icon={IconEnvelope} title={"Mail"}
                                     active={freelance.contacts_list.includes('email')}/>
                    <InfoIconWrapper icon={IconPhone} title={"Téléphone"}
                                     active={freelance.contacts_list.includes('phone')}/>
                    <InfoIconWrapper icon={IconLinkedin} title={"LinkedIn"}
                                     active={freelance.contacts_list.includes('linkedin')}/>
                    <InfoIconWrapper icon={<MaltIcon/>} customIcon title={"Malt"}
                                     active={freelance.contacts_list.includes('malt')}/>
                    <InfoIconWrapper icon={<ApecIcon/>} customIcon title={"Apec"}
                                     active={freelance.contacts_list.includes('apec')}/>
                    <InfoIconWrapper icon={faFilePdf} title={"CV original"}
                                     active={freelance.hasOriginalResume}/>
                </div>
            </div>
        </Link>
    )
}