import React from 'react';
import { Card } from 'react-bootstrap';
import './FreelanceSectionCard.scss';

// returns the header of the freelancer card
const FreelanceSectionTitle = ({ children }) => {
  return <header className='freelance-section-title'>{children}</header>;
};

const FreelanceSectionCard = ({ children, className = '', title = null }) => {
  return (
    <Card body={true} className={'freelance-section-card ' + className}>
      {/* the title of the card if it exists */}
      {title !== null && <FreelanceSectionTitle>{title}</FreelanceSectionTitle>}
      {/* the rest of the freelancer card elements */}
      {children}
    </Card>
  );
};

export { FreelanceSectionCard, FreelanceSectionTitle };
