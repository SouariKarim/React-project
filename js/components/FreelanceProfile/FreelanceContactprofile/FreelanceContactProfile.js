import React, {useContext, useEffect, useState} from "react";
import "./FreelanceProfileContact.scss";
import {UserContext} from "../../../contexts/UserContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faTwitterSquare as IconTwitter,
    faLinkedin as IconLinkedin,
    faGithub as IconGithub,
} from "@fortawesome/free-brands-svg-icons";
import {
    faEnvelope as IconEnvelope,
    faPhone as IconPhone,
    faHome as IconHome
} from "@fortawesome/free-solid-svg-icons";

import TextPremium from "../../Premium/TextPremium/TextPremium";
import MaltIcon from "../../Icon/MaltIcon";
import DoYourBuzzIcon from "../../Icon/DoYourBuzzIcon";
import ApecIcon from "../../Icon/ApecIcon";
import CopyToClipboard from "../../CopyToClipBoard/CopyToClipBoard";


const ContactItem = ({title, children, icon, isPremium}) => {
    if (children === null || children.length === 0) {
        return null;
    }

    return (
        <div className={"contact-item"}>
            {icon}
            <p className={"contact-title"}>
                {title} :
            </p>
            <TextPremium isPremium={isPremium}>{children}</TextPremium>
        </div>
    )
}


const EmailLink = ({children}) => {
    return <a href={"mailto:" + children}>{children}</a>
}

const FreelanceProfileContact = ({freelance}) => {
    const {loggedUser} = useContext(UserContext);

    const [canSeeFreelanceContact, setCanSeeFreelanceContact] = useState(false);
    const [twitterUrl, setTwitterUrl] = useState(null);
    const [githubUrl, setGithubUrl] = useState(null);
    const [maltUrl, setMaltUrl] = useState(null);
    const [doYourBuzzUrl, setSoYourBuzzUrl] = useState(null);
    const [apecUrl, setApecUrl] = useState(null);
    const [emails, setEmails] = useState([]);
    const [websites, setWebsites] = useState([]);

    const [linkedInUrl, setLinkedInUrl] = useState(null);

    useEffect(() => {
        setCanSeeFreelanceContact(
            loggedUser ? loggedUser.can_see_freelance_contact : false
        );

        const socialNetworks = freelance.social_networks;

        if (socialNetworks.linkedin) {
            setLinkedInUrl(socialNetworks.linkedin);
        }
        if (socialNetworks.twitter) {
            setTwitterUrl(socialNetworks.twitter);
        }
        if (socialNetworks.github) {
            setGithubUrl(socialNetworks.github);
        }
        if (socialNetworks.malt) {
            setMaltUrl(socialNetworks.malt);
        }
        if (socialNetworks.doYourBuzz) {
            setSoYourBuzzUrl(socialNetworks.doYourBuzz);
        }
        if (socialNetworks.apec) {
            setApecUrl(socialNetworks.apec);
        }

        if (socialNetworks.websites) {
            setWebsites(socialNetworks.websites);
        }

        if (freelance.emails) {
            setEmails(freelance.emails.map((email, index) =>
                <span key={"email-" + index}>
                    <EmailLink>{email}</EmailLink>
                    {index < freelance.emails.length - 1 && ', '}
                    &nbsp;
                </span>
            ))
        }

        // eslint-disable-next-line
    }, [freelance]);

    return (
        <div className={"freelance-profile-contact"}>
            <ContactItem
                icon={<FontAwesomeIcon icon={IconPhone}/>}
                title={"Tel"}
                isPremium={canSeeFreelanceContact}
            >
                {freelance.phones.length > 0 ?
                    freelance.formattedPhones.map((phone, index) =>
                        <CopyToClipboard key={index} toCopy={phone}>
                            <p className={"phone-item"} key={index}>{phone}</p>
                        </CopyToClipboard>
                    )
                    :
                    "pas (encore) trouvé"
                }
            </ContactItem>

            <ContactItem
                icon={<FontAwesomeIcon icon={IconEnvelope}/>}
                title={"Mail"}
                isPremium={canSeeFreelanceContact}
            >
                {emails.length > 0 ? emails : "pas (encore) trouvé"}
            </ContactItem>

            <ContactItem
                icon={<FontAwesomeIcon icon={IconLinkedin}/>}
                title={"LinkedIn"}
                isPremium={true}
            >
                {linkedInUrl ? (
                    <a
                        rel="noopener noreferrer"
                        target={"_blank"}
                        href={"https://" + linkedInUrl}
                    >
                        {linkedInUrl}
                    </a>
                ) : null}
            </ContactItem>

            <ContactItem
                icon={<MaltIcon/>}
                title={"Malt"}
                isPremium={true}
            >
                {maltUrl ? (
                    <a
                        rel="noopener noreferrer"
                        target={"_blank"}
                        href={"https://www." + maltUrl}
                    >
                        {maltUrl}
                    </a>
                ) : null}
            </ContactItem>

            <ContactItem
                icon={<DoYourBuzzIcon/>}
                title={"DoYouBuzz"}
                isPremium={canSeeFreelanceContact}
            >
                {doYourBuzzUrl ? (
                    <a
                        rel="noopener noreferrer"
                        target={"_blank"}
                        href={"https://" + doYourBuzzUrl}
                    >
                        {doYourBuzzUrl.replace("https://", "")}
                    </a>
                ) : null}
            </ContactItem>

            <ContactItem
                icon={<ApecIcon/>}
                title={"Apec"}
                isPremium={canSeeFreelanceContact}
            >
                {apecUrl ? (
                    <a
                        rel="noopener noreferrer"
                        target={"_blank"}
                        href={apecUrl}
                    >
                        Lien vers le profil APEC
                        {/*{apecUrl.replace("https://", "")}*/}
                    </a>
                ) : null}
            </ContactItem>

            <ContactItem
                icon={<FontAwesomeIcon icon={IconGithub}/>}
                title={"Github"}
                isPremium={canSeeFreelanceContact}
            >
                {githubUrl ? (
                    <a
                        rel="noopener noreferrer"
                        target={"_blank"}
                        href={"https://" + githubUrl}
                    >
                        {githubUrl.replaceAll("https://", "")}
                    </a>
                ) : null}
            </ContactItem>

            <ContactItem
                icon={<FontAwesomeIcon icon={IconTwitter}/>}
                title={"Twitter"}
                isPremium={true}
            >
                {twitterUrl ? twitterUrl : null}
            </ContactItem>

            {websites.map((website, index) => (
                <ContactItem icon={<FontAwesomeIcon icon={IconHome}/>}
                    title={"Site web personel"} isPremium={true} key={'website-' + index}>
                    <a
                        rel="noopener noreferrer"
                        target={"_blank"}
                        href={"https://" + website.trim()}
                    >
                        {website.trim()}
                    </a>
                </ContactItem>
            ))}
        </div>
    );
};

export default FreelanceProfileContact;
