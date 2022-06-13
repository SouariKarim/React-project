import {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import {useParams} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import "./FreelanceProfile.scss";
import useGodzilla from "../../hooks/useGodzilla";
import {LoadingContext} from "../../contexts/LoadingContext";
import FreelanceResume from "./FreelanceResume/FreelanceResume";
import FreelanceCard from "../FreelanceCard/FreelanceCard";
import {SearchFreelanceContext} from "../../contexts/SearchFreelanceContext";
import {useLocation} from "react-router-dom";
import {ErrorCodeContext} from "../../contexts/ErrorCodeContext";
import FreelanceDescription from "./FreelanceDescription/FreelanceDescription";
import FreelanceExperience from "./FreelanceExperience/FreelanceExperience";
import useAuthManager from "../../hooks/useAuthManager";
import FreelanceSkills from "./FreelanceSkills/FreelanceSkills";
import useRoutes from "../../hooks/useRoutes";
import ContentComptePayant from "../Premium/ContentComptePayant/ContentComptePayant";
import {ModalContext} from "../../contexts/ModalContext";
import FreelanceLanguages from "./FreelanceLanguages/FreelanceLanguages";
import {Helmet} from "react-helmet";
import ProfileToolbox from "../Toolbox/ProfileToolbox";
import CompanySocial from "./CompanySocial/CompanySocial";


export default function FreelanceProfile({
                                             freelanceId = null,
                                             insideFreelanceDisplay = false,
                                             setDisplayLoading
                                         }) {
    const location = useLocation();
    const {freelancesApi} = useGodzilla();
    const {canOpenFreelance, isLoggedWithEsnAccount, isCollaborator} = useAuthManager();
    const {toggleContactUsToSubscribe} = useContext(ModalContext);
    const {setLoading} = useContext(LoadingContext);
    const {setErrorCode} = useContext(ErrorCodeContext);
    const isMounted = useRef();
    const {query} = useContext(SearchFreelanceContext);
    const {redirect} = useRoutes();

    const [freelance, setFreelance] = useState(null);
    const [isUnLocked, setIsUnlocked] = useState(true);
    const {id} = useParams();


    const toggleLoading = (bool) => {
        if (insideFreelanceDisplay) {
            setDisplayLoading(bool)
        } else {
            setLoading(bool)
        }
    }

    const fetchFreelance = useCallback(({freelanceId}) => {
        toggleLoading(true);
        freelancesApi
            .getFreelance({freelanceId, query: query()})
            .then((freelance) => {
                setFreelance(freelance);
                setIsUnlocked((freelance !== null) ? canOpenFreelance({freelance}) : true);
            })
            .catch(() => {
                setErrorCode(404);
            }).finally(() => toggleLoading(false));

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        isMounted.current = true;

        if (freelanceId) {
            fetchFreelance({freelanceId});
        } else {
            fetchFreelance({freelanceId: id});
        }

        return () => {
            isMounted.current = false;
        };
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [freelanceId, location]);


    if (freelance !== null) {
        const title = (freelance.first_name !== null) ?
            `${freelance.first_name} ${freelance.title} | Jean-Michel.io` :
            `${freelance.title} | Jean-Michel.io`

        return (
            <>
                <Helmet>
                    <title>{title}</title>
                </Helmet>

                <Container className={"freelance-profile"} fluid>
                    <Row className="justify-content-md-center no-padding-left-mobile no-padding-right-mobile">
                        <Col xs={12} style={{maxWidth: '1400px'}}>
                            {isUnLocked === false &&
                                <Col xs={12} md={12} xl={12} style={{paddingBottom: "15px"}}>
                                    <ContentComptePayant
                                        handleClose={() => redirect({key: "SEARCH"})}
                                        handleContactUsToSubscribe={() => toggleContactUsToSubscribe()}
                                    />
                                </Col>
                            }

                            <Col xs={12} md={12} style={{paddingBottom: "15px"}}>
                                {freelance && (
                                    <Col
                                        as={FreelanceCard}
                                        freelance={freelance}
                                        withName={true}
                                        withSkills={false}
                                        isUnLocked={isUnLocked}
                                    />
                                )}
                            </Col>

                            {freelance && isUnLocked &&
                                <Col xs={12} md={12} style={{paddingBottom: "15px"}}>
                                    <FreelanceSkills
                                        freelance={freelance}
                                    />
                                </Col>
                            }

                            {freelance && isUnLocked && freelance.summary &&
                                <Col xs={12} md={12} style={{paddingBottom: "15px"}}>
                                    <FreelanceDescription
                                        freelance={freelance}
                                        cloudKeywords={freelance.keywords_cloud}
                                    />
                                </Col>
                            }
                        </Col>
                        <Col xs={12} className={"d-flex flex-wrap"} style={{maxWidth: '1400px'}}>
                            {freelance && isUnLocked && (freelance.certifications.length > 0 || freelance.positions.length > 0 || freelance.educations.length > 0) &&
                                <Col xs={12} xl={6} className={"pe-xl-2 order-xl-1 order-2"} style={{paddingBottom: "15px"}}>
                                    <FreelanceExperience
                                        freelance={freelance}
                                    />
                                </Col>
                            }

                            {freelance && isUnLocked && isLoggedWithEsnAccount() &&
                                <Col xs={12} xl={6} className={"ps-xl-2 order-xl-2 order-1"} style={{paddingBottom: "15px"}}>
                                    <CompanySocial
                                        freelance={freelance}
                                    />
                                </Col>
                            }
                        </Col>
                        <Col xs={12}  style={{maxWidth: '1400px', marginBottom: '15px'}}>
                            {freelance && isUnLocked &&
                                <Col xs={12} md={12} style={{paddingBottom: "15px", paddingRight: 10}}>
                                    <FreelanceLanguages freelance={freelance}/>
                                </Col>
                            }

                            {freelance && isUnLocked &&
                                <Col xs={12} md={12} style={{paddingBottom: "15px"}}>
                                    <FreelanceResume freelance={freelance}/>
                                </Col>
                            }
                        </Col>
                    </Row>
                </Container>

                {
                    (isLoggedWithEsnAccount() || isCollaborator()) &&
                    <ProfileToolbox freelance={freelance} className={"profile-toolbox"}/>
                }
            </>
        )
    }
}
