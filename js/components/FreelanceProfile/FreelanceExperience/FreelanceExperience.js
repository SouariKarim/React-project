import React, {useEffect, useState} from 'react';
import {FreelanceSectionCard, FreelanceSectionTitle} from "../../FreelanceSectionCard/FreelanceSectionCard";
import "./FreelanceExperience.scss";
import {Col, Row} from "react-bootstrap";
import AnonCompanyImage from "../../../res/images/anon-company.svg";
import AnonEducationImage from "../../../res/images/anon-education.svg";
import HighlightText from "../../Text/Text";
import useTextHighlightText from "../../../hooks/useTextHighlightText";
import parse from 'html-react-parser';
import Button from "../../Buttons/Button";
import sanitizeHtml from 'sanitize-html';

const BlocSeparator = () => {
    return <span className="bloc-separator"/>
}

const FreelancePositionBloc = ({position, isFirstPosition = false, isLastPosition = true, cloud = null}) => {
    return (
        <div className={"freelance-position-bloc"}>
            <div className="freelance-position">
                <Row>
                    <Col xs={3} md={1}>
                        <img style={{width: '56px', height: '56px'}}
                             src={position.logo ? position.logo : AnonCompanyImage} alt={position.company_name}/>
                    </Col>
                    <Col xs={9} md={11} className={"bloc-header-data"}>
                        <h3 className={"position-company-name"}>{position.company_name}</h3>
                        <p className={"position-company-date"}>{position.date2}</p>
                    </Col>
                </Row>
            </div>
            <div className={"position-roles"}>
                <Row>
                    <Col md={{span: 10, offset: 1}} className={"bloc-header-data"}>
                        {position.roles.map((role, key) => {
                            const isLastChild = key >= position.roles.length - 1;
                            const className = (isLastChild && !isLastPosition) ? 'item-separator' : '';
                            return <FreelancePositionRoleBloc role={role} key={key} className={className} cloud={cloud}
                                                              isFirstPosition={isFirstPosition}/>
                        })}
                    </Col>
                </Row>
            </div>
        </div>
    )
}

const FreelancePositionRoleBloc = ({role, className, cloud = null, isFirstPosition = false}) => {
    const [roleDate, setRoleDate] = useState('');
    const {highlightText, hasKeywordToHighlight} = useTextHighlightText();
    const [expandRoleDescription, setExpandRoleDescription] = useState(false);
    const [roleDescription, setRoleDescription] = useState('');
    const [hasMoreDescriptionLine, setHasMoreDescriptionLine] = useState(false);

    useEffect(() => {
        let date = '';

        if (role.date1) {
            date = role.date1;
        }

        if (role.date2 && role.date1) {
            date += " · ";
        }

        if (role.date2) {
            date += role.date2;
        }

        setRoleDate(date);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [role]);

    useEffect(() => {
        if (role.description) {
            let description = '';

            if (hasKeywordToHighlight(role.description, cloud ? cloud.keywords : []) || expandRoleDescription === true) {
                description = role.description;
            } else {
                const nbLines = isFirstPosition ? 8 : 4;
                const lines = role.description.split(/\r\n|\r|\n/);
                setHasMoreDescriptionLine(lines.length-1 > nbLines);

                for (let i = 0; i < nbLines && i < lines.length; i++) {
                    description += lines[i] + "\n";
                }
            }
            setRoleDescription(parse(sanitizeHtml(highlightText(description, cloud ? cloud.keywords : []), {allowedClasses: {'span': ['*']}})));
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [role, expandRoleDescription, isFirstPosition, cloud])

    const onShowMoreClick = (event) => {
        setExpandRoleDescription(!expandRoleDescription);
        event.preventDefault();
    }

    return (
        <div className={"position-role " + className}>
            <HighlightText as={"h3"} text={role.title} highlightWords={cloud ? cloud.keywords : []}/>
            <h4>{roleDate}</h4>
            <h4>{role.location}</h4>
            <div className={"position-role-description"}>
                <span className={"highlight-text"}>{roleDescription}</span>
                {hasMoreDescriptionLine && !expandRoleDescription &&
                <div style={{textAlign: 'right'}}>... <Button style={{paddingLeft: 0, fontSize: '14px'}}
                                                              variant={"link"} onClick={onShowMoreClick}>voir
                    plus</Button></div>}
                {hasMoreDescriptionLine && expandRoleDescription &&
                <div><Button style={{paddingLeft: 0, fontSize: '14px'}} variant={"link"} onClick={onShowMoreClick}>voir
                    moins</Button></div>}

            </div>
        </div>
    )
}


const FreelanceFormationBloc = ({formation, className = '', isLastFormation = false, cloud = null}) => {

    const [formationDate, setFormationDate] = useState('');
    const [expandFormationDescription, setExpandFormationDescription] = useState(false);
    const [formationDescription, setFormationDescription] = useState('');
    const [hasMoreDescriptionLine, setHasMoreDescriptionLine] = useState(false);
    const {highlightText, hasKeywordToHighlight} = useTextHighlightText();


    useEffect(() => {
        let date = '';

        if (formation.date1) {
            date = formation.date1;
        }

        if (formation.date1 && formation.date2) {
            date += ' - ';
        }

        if (formation.date2) {
            date += formation.date2;
        }

        setFormationDate(date);
    }, [formation]);


    useEffect(() => {
        if (formation.description) {
            let description = '';

            if (hasKeywordToHighlight(formation.description, cloud ? cloud.keywords : []) || expandFormationDescription === true) {
                description = formation.description;
            } else {
                const nbLines = isLastFormation ? 8 : 4;
                const lines = formation.description.split(/\r\n|\r|\n/);
                setHasMoreDescriptionLine(lines.length-1 > nbLines);

                for (let i = 0; i < nbLines && i < lines.length; i++) {
                    description += lines[i] + "\n";
                }
            }
            setFormationDescription(parse(sanitizeHtml(highlightText(description, cloud ? cloud.keywords : []), {allowedClasses: {'span': ['*']}})));
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formation, expandFormationDescription, isLastFormation, cloud])


    const onShowMoreClick = (event) => {
        setExpandFormationDescription(!expandFormationDescription);
        event.preventDefault();
    }


    return (
        <div className={"freelance-formation-bloc " + className}>
            <div className="freelance-formation">
                <Row>
                    <Col xs={3} md={1}>
                        <img style={{width: '56px', height: '56px'}}
                             src={formation.logo ? formation.logo : AnonEducationImage} alt={formation.name}/>
                    </Col>
                    <Col xs={9} md={11} className={'bloc-header-data bloc-data ' + (isLastFormation ? '' : 'item-separator')}>
                        <HighlightText as={"h3"} className={"formation-title"} text={formation.title} highlightWords={cloud ? cloud.keywords : []}/>
                        <HighlightText as={"p"} className={"formation-degree"} text={formation.degree} highlightWords={cloud ? cloud.keywords : []}/>
                        <p className={"formation-date"}>{formationDate}</p>
                        <HighlightText as={"h4"} className={"formation-activities"} text={formation.activities} highlightWords={cloud ? cloud.keywords : []}/>
                        <div className={"formation-description"}>
                            <span className={"highlight-text"}>{formationDescription}</span>
                            {hasMoreDescriptionLine && !expandFormationDescription &&
                            <div style={{textAlign: 'right'}}>... <Button style={{paddingLeft: 0, fontSize: '14px'}}
                                                                          variant={"link"} onClick={onShowMoreClick}>voir
                                plus</Button></div>}
                            {hasMoreDescriptionLine && expandFormationDescription &&
                            <div><Button style={{paddingLeft: 0, fontSize: '14px'}} variant={"link"} onClick={onShowMoreClick}>voir
                                moins</Button></div>}

                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

const FreelanceCertificationBloc = ({certification, isLastCertification = false, cloud = null}) => {
    const [certifDate, setCertifDate] = useState('');

    useEffect(() => {
        let date = '';

        if (certification.deliverAt) {
            date += certification.deliverAt;
        }

        if (certification.deliverAt && certification.expire) {
            date += " · ";
        }

        if (certification.expire) {
            date += certification.expire;
        }

        setCertifDate(date);
    }, [certification]);

    return (
        <div className={"freelance-certification-bloc"}>
            <div className="freelance-certification">
                <Row>
                    <Col xs={3} md={1}>
                        <img style={{width: '56px', height: '56px'}}
                             src={certification.logo ? certification.logo : AnonEducationImage}
                             alt={certification.name}/>
                    </Col>
                    <Col xs={9} md={11}
                         className={'bloc-header-data bloc-data ' + (!isLastCertification ? 'item-separator' : '')}>
                        <h3 className={"certification-degree"}>{certification.name}</h3>

                        <HighlightText as={"p"} className={"certification-deliver-by"}
                                       cloud={cloud ? cloud.keywords : null} text={certification.deliverBy}/>
                        <p className={"certification-date"}>{certifDate}</p>
                    </Col>
                </Row>
            </div>
        </div>
    )
}


const FreelanceExperience = ({freelance}) => {

    return (
        <FreelanceSectionCard className={"freelance-experience-bloc"}>
            {freelance.certifications.length > 0 &&
                <div>
                    <FreelanceSectionTitle>Licences et certifications</FreelanceSectionTitle>
                    {freelance.certifications.map((certification, key) => {
                            return <FreelanceCertificationBloc key={key} certification={certification} cloud={freelance.keywords_cloud}
                                                               isLastCertification={key >= freelance.certifications.length - 1}/>
                        }
                    )}
                </div>
            }

            {freelance.certifications.length > 0 && (freelance.positions.length > 0 || freelance.educations.length > 0) &&
                <BlocSeparator/>
            }
            
            {freelance.positions.length > 0 &&
                <div>
                    <FreelanceSectionTitle>Expériences</FreelanceSectionTitle>
                    {freelance.positions.map((position, key) => {
                            return <FreelancePositionBloc key={key} position={position}
                                                          isLastPosition={key >= freelance.positions.length - 1} cloud={freelance.keywords_cloud}
                                                          isFirstPosition={key === 0}/>
                        }
                    )}
                </div>
            }

            {freelance.positions.length > 0 && freelance.educations.length > 0 &&
                <BlocSeparator/>
            }

            {freelance.educations.length > 0 &&
                <div>
                    <FreelanceSectionTitle>Formations</FreelanceSectionTitle>
                    {freelance.educations.map((formation, key) => {
                            return <FreelanceFormationBloc key={key} formation={formation}
                                                           isLastFormation={key >= freelance.educations.length - 1}
                                                           cloud={freelance.keywords_cloud}/>
                        }
                    )}
                </div>
            }
        </FreelanceSectionCard>
    )
}

export default FreelanceExperience;