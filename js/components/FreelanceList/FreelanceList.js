// render the freelancer list as freelancer cards

import React from 'react';
import FreelanceCard from '../FreelanceCard/FreelanceCard'; // render a card containing the freelancer info
import { Col, Row, Container } from 'react-bootstrap';
import FreelanceDisplay from '../FreelanceDisplay/FreelanceDisplay';
import useAuthManager from '../../hooks/useAuthManager'; // return auth methods
import './FreelancesList.scss';
import SearchToolbox from '../Toolbox/SearchToolbox'; // render a search box

const FreelancesList = React.memo(({ freelances, fromSearchPage = true }) => {
  const { isCollaborator } = useAuthManager();

  return (
    <Container fluid className={'freelance-list'}>
      <Row className={'justify-content-md-center'}>
        {freelances.map((freelance, i) => {
          return (
            <Col
              xs={12}
              key={'freelance_' + i}
              style={{ marginBottom: '15px', maxWidth: '1500px' }}
            >
              <FreelanceCard
                fromSearchPage={fromSearchPage}
                id={freelance.id}
                freelance={freelance}
                withName={true}
                withSkills={true}
              />
            </Col>
          );
        })}
      </Row>

      <FreelanceDisplay />

      {isCollaborator() && <SearchToolbox className={'search-toolbox'} />}
    </Container>
  );
});

export default FreelancesList;
