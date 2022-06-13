import React, {useEffect, useState} from 'react';
import {FreelanceSectionCard, FreelanceSectionTitle} from "../../FreelanceSectionCard/FreelanceSectionCard";
import "./FreelanceSkills.scss";
import {Col, Row} from "react-bootstrap";
import HighlightText from "../../Text/Text";
import Button from "../../Buttons/Button";


const FreelanceFunctions = ({freelance}) => {
    return (
        <div>
            <FreelanceSectionTitle>Postes recherchés</FreelanceSectionTitle>

            <Row>
                <Col xs={12} md={10}>
                    <Row as={"ul"} className={"skills"}>
                        {freelance.functions.map((skill, key) => {
                            return (<React.Fragment key={'function-' + key}>{(key % 2 === 0) && <div className={"w-100"} key={'function-' + key}/>} <Col as={"li"} className={"skill"}
                                                                                           xs={12} md={6} lg={4} xl={4}>

                                <HighlightText as={"span"} text={skill} highlightWords={freelance.keywords_cloud ? freelance.keywords_cloud.keywords : []}/>

                            </Col></React.Fragment>)
                        })}
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

const FreelanceServices = ({freelance}) => {
    return (
        <div>
            <FreelanceSectionTitle>Services proposés</FreelanceSectionTitle>

            <Row>
                <Col xs={12} md={10}>
                    <Row as={"ul"} className={"skills"}>
                        {freelance.service.services.map((skill, key) => {
                            return (<React.Fragment key={'function-' + key}>{(key % 2 === 0) && <div className={"w-100"} key={'function-' + key}/>} <Col as={"li"} className={"skill"}
                                                                                                                                                         xs={12} md={6} lg={4} xl={4}>

                                <HighlightText as={"span"} text={skill} highlightWords={freelance.keywords_cloud ? freelance.keywords_cloud.keywords : []}/>

                            </Col></React.Fragment>)
                        })}
                    </Row>
                </Col>
            </Row>

            {freelance.service.headline &&
                <Row>
                    <Col xs={12} md={12}>
                        <HighlightText
                            as={"p"}
                            className={"skill-complement"}
                            text={freelance.service.headline}
                            highlightWords={freelance.keywords_cloud ? freelance.keywords_cloud.keywords : []}
                        />
                    </Col>
                </Row>
            }
        </div>
    )
}

const FreelanceCloudKeyword = ({freelance}) => {
    const [hits, setHits] = useState([]);
    const [hasShowMore, setHasShowMore] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const maxHits = 2;

    useEffect(() => {
        if (freelance.keywords_cloud && freelance.keywords_cloud.hits) {
            const lines = freelance.keywords_cloud.hits;
            setHits(showMore ? lines : lines.slice(0, maxHits));
            setHasShowMore(lines.length > maxHits);
        }
    }, [freelance.keywords_cloud, showMore, maxHits]);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    }

    return (
        <div className={"cloud-keywords"}>
            <FreelanceSectionTitle>Vu ailleurs sur le web / CV</FreelanceSectionTitle>

            <Row className={"skills"}>
                <Col md={12} xs={12}>
                    {hits && hits.map((elem, index) => {
                        /*  if (index >= maxHits) {
                              return null;
                          }*/
                        return <HighlightText
                            key={'keyword-' + index} text={elem} highlightWords={freelance.keywords_cloud.keywords}/>
                    })}
                </Col>
                <Col xs={12} style={{
                    paddingTop: '15px',
                    paddingBottom: '15px',
                    display: (freelance.keywords_cloud && freelance.keywords_cloud.hits.length >= maxHits) ? 'block' : 'none'
                }}>
                    {hasShowMore &&
                    <div>
                        {!showMore && '... '}
                        <Button style={{paddingLeft: 0}} variant={"link"}
                                onClick={toggleShowMore}>{showMore ? 'voir moins' : 'voir plus'}</Button>
                    </div>
                    }
                </Col>
            </Row>
        </div>
    )
}

const FreelanceSkills = ({freelance}) => {

    return (
        <FreelanceSectionCard className={"freelance-skills-bloc"}>
            <div>
                <FreelanceSectionTitle>Compétences</FreelanceSectionTitle>

                {freelance.skills.length > 0 &&
                    <Row>
                        <Col xs={12} md={10}>
                            <Row as={"ul"} className={"skills"}>
                                {freelance.skills.map((skill, key) => {
                                    return <Col as={"li"} className={"skill"} xs={12} md={6} lg={4} xl={4}
                                                key={'skill-' + key}>
                                        <HighlightText as={"span"} text={skill}
                                                       highlightWords={freelance.keywords_cloud ? freelance.keywords_cloud.keywords : []}/>
                                    </Col>
                                })}
                            </Row>
                        </Col>
                    </Row>
                }

                {freelance && freelance.functions.length > 0 &&
                    <FreelanceFunctions freelance={freelance} />
                }

                {freelance && freelance.keywords_cloud && freelance.keywords_cloud.hits.length > 0 &&
                    <FreelanceCloudKeyword freelance={freelance} />
                }

                {freelance && freelance.service && freelance.service.services &&
                    <FreelanceServices freelance={freelance} />
                }
            </div>
        </FreelanceSectionCard>
    )
}

export default FreelanceSkills;