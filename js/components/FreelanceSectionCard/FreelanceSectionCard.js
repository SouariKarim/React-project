import React from 'react';
import {Card} from "react-bootstrap";
import "./FreelanceSectionCard.scss";

const FreelanceSectionTitle = ({children}) => {
    return (
        <header className="freelance-section-title">{children}</header>
    )
}

const FreelanceSectionCard = ({children, className = "", title = null}) => {
    return (
        <Card body={true} className={"freelance-section-card " + className}>
            {title !== null && <FreelanceSectionTitle>{title}</FreelanceSectionTitle>}
            {children}
        </Card>
    )
};

export {FreelanceSectionCard, FreelanceSectionTitle};