// render some react components in a motion div containig some transition
import './Toolbox.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { motion, useViewportScroll } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Toolbox({
  className,
  children,
  forceVisible = false,
  forceHidden = false,
}) {
  const { scrollY } = useViewportScroll();
  const [isVisible, setVisible] = useState(false);
  const motionToolbox = {
    visible: { visibility: 'visible', opacity: 1 },
    hidden: { visibility: 'hidden', opacity: 0 },
  };

  useEffect(() => {
    return scrollY.onChange((latest) => setVisible(latest > 60));
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      animate={
        !forceHidden && (isVisible || forceVisible) ? 'visible' : 'hidden'
      }
      transition={{ duration: 0.4 }}
      variants={motionToolbox}
      className={'toolbox ' + className}
    >
      <FontAwesomeIcon icon={faSlidersH} className={'icon'} />
      {children}
    </motion.div>
  );
}
