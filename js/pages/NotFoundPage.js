// render the not found page

import { Helmet } from 'react-helmet';
import NotFound from '../components/NotFound/NotFound';

export default function NotFoundPage(props) {
  return (
    <>
      <Helmet>
        <title>404 | Jean-Michel.io</title>
      </Helmet>

      <NotFound {...props} />
    </>
  );
}
