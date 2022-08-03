// render the freelance icon based on the freelance tag..

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCrown,
  faGhost as GhostIcon,
} from '@fortawesome/free-solid-svg-icons';
import './ProfileTypeIndicator.scss';
import useAuthManager from '../../../hooks/useAuthManager'; // return auth methods

export default function ProfileTypeIndicator({ freelance }) {
  const { isCollaborator } = useAuthManager();
  let profileTypeIcon = null;

  // choose the freelance icon based on the freelance tag
  if (freelance.tags.includes('g')) {
    profileTypeIcon = (
      <FontAwesomeIcon
        icon={GhostIcon}
        style={{ marginRight: 9 }}
        title={'Profil non visible par nos clients'}
      />
    );
  } //
  else if (freelance.premium === true) {
    profileTypeIcon = (
      <FontAwesomeIcon
        icon={faCrown}
        style={{ marginRight: 6 }}
        title={'Profil premium'}
      />
    );
  }

  // render the freelance icon based on the freelance tag
  if (isCollaborator() === true && profileTypeIcon !== null) {
    return <div className={'profile-type-indicator'}>{profileTypeIcon}</div>;
  } else {
    return null;
  }
}
