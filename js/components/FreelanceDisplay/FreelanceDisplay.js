import './FreelanceDisplay.scss';
import { useContext, useState } from 'react';
import { DisplayFreelanceContext } from '../../contexts/DisplayFreelanceContext'; // methods for closing or opening freelancer profile sections
import Button from '../Buttons/Button';
import FreelanceProfile from '../FreelanceProfile/FreelanceProfile';
import JmSpinner from '../JmSpinner/JmSpinner'; // spinner component
import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { motion } from 'framer-motion';

export default function FreelanceDisplay() {
  const { profileToDisplay, closeFreelanceDisplay } = useContext(
    DisplayFreelanceContext
  );
  const isDisplayOpen = profileToDisplay !== null;
  const [isDisplayLoading, setDisplayLoading] = useState(true);
  const [isDisplayTransparent, setDisplayTransparent] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(null);

  const motionDisplay = {
    open: { bottom: 0, visibility: 'visible' },
    closed: { bottom: '110vh', visibility: 'hidden' },
  };

  const toggleLoading = (bool) => {
    setDisplayLoading(bool);

    if (bool === true && profileToDisplay !== null) {
      setDisplayMessage(
        <p>Chargement du profil de {profileToDisplay.first_name} ...</p>
      );
    } else {
      setDisplayMessage(
        <p>
          Jean-Michel SHORTCUT : <span className={'shortcut'}>Echap</span> ferme
          directement le profil ouvert
        </p>
      );
    }
  };

  const buildDisplayClassName = () => {
    let className = 'freelance-display';
    if (isDisplayLoading) {
      className += ' loading';
    }
    if (isDisplayTransparent && !isDisplayLoading) {
      className += ' transparent';
    }
    return className;
  };

  return (
    <motion.div
      id={'freelance-display'}
      className={buildDisplayClassName()}
      animate={isDisplayOpen ? 'open' : 'closed'}
      transition={{ duration: '0.8', type: 'spring' }}
      variants={motionDisplay}
      body-scroll-lock-ignore={''}
    >
      <Container fluid>
        <Row className={'justify-content-center'}>
          <Col>
            <div className={'display-control'}>
              <Button
                onMouseEnter={() => setDisplayTransparent(true)}
                onMouseLeave={() => setDisplayTransparent(false)}
                variant={'cta secondary'}
                onClick={() => closeFreelanceDisplay(false)}
              >
                Revenir à votre recherche
              </Button>

              {displayMessage}
            </div>
          </Col>
        </Row>
      </Container>

      {isDisplayLoading && <JmSpinner />}

      <div className={'freelance-profile-wrapper'}>
        {profileToDisplay !== null && (
          <FreelanceProfile
            insideFreelanceDisplay
            isDisplayLoading={isDisplayLoading}
            setDisplayLoading={toggleLoading}
            freelanceId={profileToDisplay.id}
          />
        )}

        <hr className={'decoration'} />
      </div>
    </motion.div>
  );
}
