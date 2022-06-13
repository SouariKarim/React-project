import React, {useContext, useState} from "react";
import {Col, Row,} from "react-bootstrap";
import "./FreelanceCard.scss";
import FreelanceProfilePicture from "../FreelanceProfilePicture/FreelanceProfilePicture";
import {
    faMapMarkerAlt as LocationIcon,
    faCarSide as CardSideIcon,
    faEnvelope as IconEnvelope,
    faPhone as IconPhone,
    faLock, faFilePdf, faGlobe, faLaptopHouse
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub, faLinkedin as IconLinkedin} from "@fortawesome/free-brands-svg-icons";
import FreelanceSkill from "../FreelanceSkill/FreelanceSkill";
import FreelanceFunction from "../FreelanceFunction/FreelanceFunction";
import ViewStateIndicator from "../FreelanceIndicator/ViewStateIndicator/ViewStateIndicator";
import Button from "../Buttons/Button";
import {ModalContext} from "../../contexts/ModalContext";
import useAuthManager from "../../hooks/useAuthManager";
import {SearchFreelanceContext} from "../../contexts/SearchFreelanceContext";
import HighlightText from "../Text/Text";
import {FreelanceSectionCard} from "../FreelanceSectionCard/FreelanceSectionCard";
import FreelanceCtaCard from "../FreelanceProfile/FreelanceCtaCard/FreelanceCtaCard";
import MaltIcon from "../Icon/MaltIcon";
import ApecIcon from "../Icon/ApecIcon";
import {DisplayFreelanceContext} from "../../contexts/DisplayFreelanceContext";
import DisponibilityMarker from "../DisponibilityMarker/DisponibilityMarker";
import InfoIconWrapper from "../InfoIconWrapper/InfoIconWrapper";
import ProfileTypeIndicator from "../FreelanceIndicator/ProfileTypeIndicator/ProfileTypeIndicator";
import DoYourBuzzIcon from "../Icon/DoYourBuzzIcon";
import IconTooltip from "../IconTooltip/IconTooltip";
import CompanyIndicator from "../FreelanceIndicator/CompanyIndicator/CompanyIndicator";
import BookmarkIndicator from "../FreelanceIndicator/BookmarkIndicator/BookmarkIndicator";


const FreelanceCard = ({
   freelance,
   fromSearchPage = false,
   withName = false,
   withSkills = false,
   isUnLocked = false
}) => {
    const {openFreelanceDisplay} = useContext(DisplayFreelanceContext)
    const {toggleModalFreelancePremium, toggleFreelanceTJM} = useContext(ModalContext);
    const { canOpenFreelance, isLoggedWithPremiumEsnAccount, isCollaborator } = useAuthManager();
    const {query} = useContext(SearchFreelanceContext);


    const [queryParamsForOpenFreelance] = useState(() => {
        const queryParams = {};
        if (query() && query().length > 0) {
            queryParams.query = query();
        }
        return queryParams;
    })


    const openFreelance = (event) => {
        if(event.ctrlKey === false) {
            event.stopPropagation();
            event.preventDefault();

            if (freelance) {
                if (freelance.can_open_freelance) {
                    openFreelanceDisplay(freelance)
                    freelance.set_seen_during_session()
                }
                else {
                    toggleModalFreelancePremium();
                }
            }
        }
        else if(freelance && freelance.can_open_freelance){
            freelance.set_seen_during_session()
        }
    }


    const getLocationString = () => {
        let location = ""

        if (freelance.location) {
            location += freelance.location.mostAccurateLocationName
        }

        if (freelance.location) {
            if (freelance.location.countryName !== "france") {
                location += ` (${freelance.location.countryName})`
            } else if (freelance.location && freelance.location.zipCode) {
                location += ` (${freelance.location.zipCode})`
            }
        }

        return location !== "" ? location : "Inconnu"
    }


    const getLocationColumnSize = () => {
        if (freelance.mobilities.length > 0) {
            if (freelance.isRemote === true) {
                return {
                    city: 3,
                    remote: 3,
                    mobilities: 6
                }
            }

            return {
                city: 4,
                remote: 0,
                mobilities: 8
            }
        }

        if (freelance.isRemote === true) {
            return {
                city: 6,
                remote: 6,
                mobilities: 0
            }
        }

        return {
            city: 12,
            remote: 0,
            mobilities: 0
        }
    }


    return (
        <FreelanceSectionCard className={"freelance-card"}>
            <Row>
                <Col md={2} xs={12}>
                    <Row className={"text-align-center-mobile"}>
                        <Col xs={12}>
                            {fromSearchPage ? (
                                <Button
                                    onClick={openFreelance}
                                    variant={"link"}
                                    to={"FREELANCE_PROFILE"}
                                    toParams={{id: freelance.id}}
                                    queryParams={queryParamsForOpenFreelance}
                                    style={{padding: 0, border: "none", width: "100%", position: "relative"}}
                                >
                                    <FreelanceProfilePicture freelance={freelance} hover={true} fromSearchPage={fromSearchPage}/>

                                    <BookmarkIndicator freelance={freelance}/>
                                    <ViewStateIndicator freelance={freelance}/>
                                </Button>
                            ) : (
                                <div className={"position-relative"}>
                                    <FreelanceProfilePicture freelance={freelance} hover={false}/>
                                    <BookmarkIndicator freelance={freelance}/>
                                </div>
                            )}
                        </Col>

                        {withName && (
                            <Col xs={12} className={"freelance-name"}>
                                {canOpenFreelance({freelance}) ? (
                                    <p>{freelance.full_name}</p>
                                ) : (
                                    <p>Profil payant #{freelance.id}</p>
                                )}
                            </Col>
                        )}

                        <Col xs={12}>
                            <CompanyIndicator freelance={freelance}/>
                        </Col>
                    </Row>
                </Col>
                <Col md={{span: 10, offset: 0}} xs={12}>
                    <Row>
                        <Col xs={12}>
                            <Row>
                                <Col xs={{span: 12, order: 2}} md={{span: 9, order: 1}} style={{paddingRight: 0}}>
                                    {fromSearchPage === false ? (
                                        <p className="freelance-title">
                                            <HighlightText
                                                as={"span"}
                                                text={freelance.title}
                                                highlightWords={
                                                    freelance.keywords_cloud ? freelance.keywords_cloud.keywords : []
                                                }
                                            />
                                        </p>
                                    ) : (
                                        <Button
                                            variant={"link"}
                                            onClick={openFreelance}
                                            to={"FREELANCE_PROFILE"}
                                            toParams={{id: freelance.id}}
                                            queryParams={queryParamsForOpenFreelance}
                                            className={"freelance-title"}
                                        >
                                            <p className="freelance-title">
                                                <HighlightText
                                                    as={"span"}
                                                    text={freelance.title}
                                                    highlightWords={
                                                        freelance.keywords_cloud ? freelance.keywords_cloud.keywords : []
                                                    }
                                                />
                                            </p>
                                        </Button>
                                    )}
                                </Col>

                                <Col xs={{span: 12, order: 1}} md={{span: 3, order: 2}} style={{paddingLeft: 0}}>
                                    <DisponibilityMarker freelance={freelance}/>
                                </Col>
                            </Row>
                        </Col>

                        <Col xs={12} className={"freelance-localisation-container"}>
                            <Row>
                                <Col xs={12} xl={getLocationColumnSize().city} className={"freelance-localisation-info text-truncate"}>
                                    <FontAwesomeIcon icon={freelance.isForeign ? faGlobe : LocationIcon}/>
                                    {getLocationString()}
                                </Col>

                                {freelance.isRemote === true &&
                                    <Col xs={12} xl={getLocationColumnSize().remote} className={"freelance-localisation-info"}>
                                        <FontAwesomeIcon icon={faLaptopHouse}/>
                                        Télétravail exclusivement
                                    </Col>
                                }

                                {freelance.mobilities.length > 0 && (
                                    <Col xs={12} xl={getLocationColumnSize().mobilities} className={"freelance-localisation-info text-truncate"}>
                                        {freelance.mobilities.length > 2 ? (
                                            <IconTooltip name={"mobilities"} className={"tooltip-mobilities"} htmlChildren={
                                                <>
                                                    <FontAwesomeIcon icon={CardSideIcon}/>
                                                    &nbsp;Mobilité :&nbsp;
                                                    {freelance.mobilities.map(mobility => mobility.mostAccurateLocationName).join(
                                                        ", "
                                                    )}
                                                </>
                                            }>
                                                {freelance.mobilities.map(mobility => mobility.mostAccurateLocationName).join(
                                                    ", "
                                                )}
                                            </IconTooltip>
                                        ) : (
                                            <>
                                                <FontAwesomeIcon icon={CardSideIcon}/>
                                                &nbsp;Mobilité :&nbsp;
                                                {freelance.mobilities.map(mobility => mobility.mostAccurateLocationName).join(
                                                    ", "
                                                )}
                                            </>
                                        )}
                                    </Col>
                                )}
                            </Row>
                        </Col>

                        <Col xs={12} md={12} xl={11} className={"freelance-infos-container"}>
                            <Row className={"freelance-infos"}>
                                <Col xs={12} md={8} lg={4} className={"freelance-info"}>
                                    <p className={"title"}>Infos Disponibles</p>
                                    <div className={"info-icon-container"}>
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
                                        <InfoIconWrapper icon={faGithub} title={"GitHub"}
                                                         active={freelance.contacts_list.includes('github')}/>
                                        <InfoIconWrapper icon={<DoYourBuzzIcon/>} customIcon title={"DoYouBuzz"}
                                                         active={freelance.contacts_list.includes('doyourbuzz')}/>
                                        <InfoIconWrapper icon={faFilePdf} title={"CV original"}
                                                         active={freelance.hasOriginalResume}/>
                                    </div>
                                </Col>
                                <Col xs={12} md={4} lg={2} className={"freelance-info pb-2 pb-lg-0"}>
                                    <p className={"title"}>Age</p>
                                    <p className={!freelance.age ? "data no-data" : "data"}>
                                        {freelance.age ? freelance.age + " ans" : "inconnu"}
                                    </p>
                                </Col>
                                <Col xs={12} md={6} lg={3} className={"freelance-info pb-2 pb-lg-0"}>
                                    <p className={"title"}>Expérience</p>
                                    <p
                                        className={
                                            !freelance.experience ? "data no-data" : "data"
                                        }
                                    >
                                        {freelance.experience ? freelance.experience : "inconnu"}
                                    </p>
                                </Col>
                                <Col xs={12} md={6} lg={3} className={"freelance-info pb-2 pb-lg-0"}>
                                    <p className={"title"}>Tarif / jour</p>
                                    {(isLoggedWithPremiumEsnAccount() === true) ?
                                        <div className={(!freelance.price_max || !freelance.price_min) ? "data no-data" : "data"}>
                                            {(freelance.price_max && freelance.price_min) ?
                                                <>
                                                    {freelance.price_min + " - " + freelance.price_max + "€"}
                                                    <IconTooltip iconSize={"md"} placement={"top"} name={"tjm"} rootClassName={"ms-2"}>
                                                        {(isCollaborator() === true) ?
                                                            <ul>
                                                                {freelance.sources_prices.sort((a, b) => b._date - a._date).map((source, index) =>
                                                                    <li key={index}>{source.getLabel()}</li>
                                                                )}
                                                            </ul>
                                                            :
                                                            <>
                                                                <p>Le TJM (Tarif Journalier Moyen) affiché
                                                                    provient des sources suivantes :</p>
                                                                <ul>
                                                                    <li>TJM comuniqué directement par le
                                                                        freelance à Jean-michel.io
                                                                    </li>
                                                                    <li>TJM vu sur le web</li>
                                                                    <li>TJM indiqué par le freelance dans
                                                                        une
                                                                        réponse à annonce postée par
                                                                        Jean-Michel.io
                                                                    </li>
                                                                    <li>TJM communiqué par une ESN
                                                                        partenaire de
                                                                        Jean-Michel.io
                                                                    </li>
                                                                </ul>
                                                                <p style={{margin: "5px 0 0 0"}}>Attention,
                                                                    les
                                                                    TJM annoncés par les freelances peuvent
                                                                    être
                                                                    très variables <br/>selon la mission
                                                                    proposée.</p>
                                                            </>
                                                        }
                                                    </IconTooltip>
                                                </>
                                                :
                                                "NC"
                                            }
                                        </div>
                                        :
                                        <p>
                                            <FontAwesomeIcon onClick={() => toggleFreelanceTJM(true)} className={"price-locked-icon"} icon={faLock}/>
                                        </p>
                                    }
                                </Col>
                            </Row>
                        </Col>

                        {freelance && isUnLocked && fromSearchPage === false && (
                            <Col xs={12} md={12} xl={12}>
                                <FreelanceCtaCard freelance={freelance}/>
                            </Col>
                        )}
                        {withSkills && (
                            <>
                                <Col xs={12}>
                                    {freelance.skills.map((skill, key) => {
                                        if (key >= 10 || skill.length === 0) {
                                            return null;
                                        }
                                        return (
                                            <FreelanceSkill
                                                className={"mb-1 me-2"}
                                                skill={skill}
                                                key={"skill_" + key}
                                                keywords={freelance.keywords_cloud ? freelance.keywords_cloud.keywords : []}
                                            />
                                        );
                                    })}
                                </Col>
                                <Col xs={12} md={12} className={"mt-2"}>
                                    {freelance.functionsAndServices.map((fonction, key) => {
                                        if (key >= 10) {
                                            return null;
                                        }
                                        return (
                                            <FreelanceFunction
                                                className={"mb-1 me-2"}
                                                fonction={fonction}
                                                key={"function_" + key}
                                                keywords={freelance.keywords_cloud ? freelance.keywords_cloud.keywords : []}
                                            />
                                        );
                                    })}
                                </Col>
                            </>
                        )}
                    </Row>
                </Col>
            </Row>

            {freelance && isCollaborator() === true &&
                <ProfileTypeIndicator freelance={freelance}/>
            }
        </FreelanceSectionCard>
    );
};

export default FreelanceCard;
