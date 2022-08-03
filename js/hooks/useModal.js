import { useState } from 'react';

// this hook is for modals
export default function useModal() {
  const [isShowing, setIsShowing] = useState(false);
  const [option, setOption] = useState(null);

  function toggle(_option = null) {
    setIsShowing(!isShowing);
    setOption(_option);
  }

  function forceClose() {
    setIsShowing(false);
  }

  return [isShowing, toggle, option, forceClose];
}
