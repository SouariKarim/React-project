// side bar data : toggle it to open or close it based on the open boolean
import React, { useCallback, useReducer } from 'react';

// context inititalization
export const SideBarContext = React.createContext({});
SideBarContext.displayName = 'SideBarContext'; // context naming

export const SideBarConsumer = SideBarContext.Consumer; // context consumer

// reducers
function openReducer(open, action) {
  switch (action.type) {
    case 'toggle': {
      return !open;
    }
    default:
      return false;
  }
}

export const SideBarProvider = ({ children }) => {
  const [open, dispatchOpen] = useReducer(openReducer, false, () => false);

  const toggle = useCallback(() => {
    dispatchOpen({ type: 'toggle' });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatchOpen]);

  return (
    <SideBarContext.Provider value={{ toggle, open }}>
      {children}
    </SideBarContext.Provider>
  );
};
