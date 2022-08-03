// render a loading screen as a spinner
import React, { useContext } from 'react';
import './LoadingScreen.scss';
import { LoadingContext } from '../../../contexts/LoadingContext'; // loading context
import JmSpinner from '../../JmSpinner/JmSpinner'; // this is a spinner component

export default function LoadingScreen({ children }) {
  const { isLoading } = useContext(LoadingContext);

  return (
    // if loading is true render the spinner otherwise render the children
    <>
      {isLoading() && (
        <div className={'loading-screen'}>
          <JmSpinner />
        </div>
      )}
      {children}
    </>
  );
}
