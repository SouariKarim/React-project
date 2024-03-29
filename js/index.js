import React from 'react';
import { createRoot } from 'react-dom/client';
import * as serviceWorker from './serviceWorker';
// google analytics
import ReactGA from 'react-ga';
import './index.scss';
import App from './components/App/App';

if (process.env.REACT_APP_ACTIVATE_GA === '1') {
  // get the tracking id from the google analytics platform
  ReactGA.initialize('UA-167209205-1');
  ReactGA.pageview(window.location.pathname);
}

// this is react 18 new feature
createRoot(document.getElementById('root')).render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
