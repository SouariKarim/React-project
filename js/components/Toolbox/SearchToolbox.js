// render a search box

import Toolbox from './Toolbox'; // render a div containing child components with motion
import IconTooltip from '../IconTooltip/IconTooltip'; // render a tootlip
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import useAuthManager from '../../hooks/useAuthManager'; // return auth methods
import { useContext } from 'react';
import { SearchFreelanceContext } from '../../contexts/SearchFreelanceContext';
import { DisplayFreelanceContext } from '../../contexts/DisplayFreelanceContext';

export default function SearchToolbox({ className }) {
  const { getBearerToken } = useAuthManager();
  const { extra } = useContext(SearchFreelanceContext);
  const isProfileDisplayed =
    useContext(DisplayFreelanceContext).profileToDisplay !== null;

  return (
    <Toolbox className={className} forceHidden={isProfileDisplayed}>
      <IconTooltip
        placement={'left'}
        name={'hide-visited'}
        htmlChildren={
          <a
            className={
              extra.length === 0 || extra.exportUrl === undefined
                ? 'tool-btn active'
                : 'tool-btn'
            }
            href={extra.exportUrl + '&bearer=' + getBearerToken()}
            target='_blank'
            rel='noreferrer'
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        }
      >
        <p>Exporter sur excel</p>
      </IconTooltip>
    </Toolbox>
  );
}
