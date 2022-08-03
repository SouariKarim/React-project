// render a title as h4
import './title.scss';

export default function TextTitle({
  title = 'Empty',
  theme = '',
  className = '',
  style,
}) {
  return (
    <h4
      className={'custom-title text-title ' + className + ' ' + theme}
      style={style}
    >
      {title}
    </h4>
  );
}
