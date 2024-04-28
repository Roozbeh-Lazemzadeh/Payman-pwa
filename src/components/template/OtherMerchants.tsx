import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { merchantDetails } from '../../store/merchant/merchantSlice';
import { useAppDispatch } from '../hooks/reduxHooks';
import { type Merchant } from '../types/Merchant';

interface OtherMerchantsProps {
  merchants: Merchant[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function OtherMerchants({ merchants, setIsOpen }: OtherMerchantsProps) {
  const dispatch = useAppDispatch();

  const handleMerchantDetails = (merchant: Merchant) => {
    setIsOpen(true);
    dispatch(merchantDetails(merchant));
  };
  return (
    <div className='selected-merchants-wrapper'>
      <p className='selected-merchants-title'>سایر کسب‌وکارها</p>

      <div className='selected-merchants'>
        {merchants.map((merchant, index) => (
          <div
            key={index}
            className='selected-merchant'
            style={{ backgroundImage: 'url(/assets/pics/mask-group.svg)' }}
            onClick={() => handleMerchantDetails(merchant)}
          >
            <div className='img-wrapper'>
              <img className='selected-merchant-img' src={merchant.img} />
            </div>
            <p className='selected-merchant-title'>{merchant.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

OtherMerchants.propTypes = {
  merchants: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default OtherMerchants;
