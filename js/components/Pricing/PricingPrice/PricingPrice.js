// display a div containing the price

import React from 'react';
import './PricingPrice.scss';

const PricingPrice = ({
  price,
  priceWithReduction = null,
  isSpanGrey = true,
}) => {
  const spanClassName = isSpanGrey ? 'text-grey' : '';
  return (
    <div className='pricing-price d-flex flex-column'>
      <span className='pricing-prez-price'>
        {price > 0 && (
          <>
            <del>{price}€</del>
            {priceWithReduction !== null && (
              // use &nbsp to create space in the text so after formatting it will stay in the text
              <span className={'pricing-reduction'}>
                &nbsp;&nbsp;{priceWithReduction}€
              </span>
            )}
          </>
        )}

        {price === 0 && <span>{price}€</span>}
      </span>
      <span className={spanClassName}>par an</span>
    </div>
  );
};

export default PricingPrice;
