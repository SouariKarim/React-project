// render the home page

import Home from '../components/Home/Home';
import { Helmet } from 'react-helmet';

export default function HomePage(props) {
  return (
    <>
      <Helmet>
        <title>Moteur de recherche de freelances en AT | Jean-Michel.io</title>
      </Helmet>

      <Home {...props} />
    </>
  );
}
