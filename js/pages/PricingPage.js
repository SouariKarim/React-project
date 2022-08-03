// render the pricing page

import { Helmet } from 'react-helmet';
import Pricing from '../components/Pricing/Pricing';

export default function PricingPage(props) {
  return (
    <>
      <Helmet>
        <title>Tarifs et packages | Jean-Michel.io</title>
      </Helmet>

      <Pricing {...props} />
    </>
  );
}
