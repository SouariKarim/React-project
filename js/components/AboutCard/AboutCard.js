// about card component
import './about.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AboutCard({ icon, title, content }) {
  return (
    <div className={'about-card'}>
      <FontAwesomeIcon className={'icon'} icon={icon} />
      <h5 className={'title'}>{title}</h5>
      <p className={'content'}>{content}</p>
    </div>
  );
}
