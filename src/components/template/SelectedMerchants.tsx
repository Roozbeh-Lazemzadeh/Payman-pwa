import React, { useEffect, useState } from 'react';
import './style.css';
import { useAppDispatch } from '../hooks/reduxHooks';
import { merchantDetails } from '../../store/merchant/merchantSlice';
import { type Merchant } from '../types/Merchant';
import { openBottomSheet } from '../../store/bottomSheet/bottomSheetSlice';
import SkeletonOthersPaymans from '../skeleton/SkeletonOthersPaymans';

interface SelectedMerchantsProps {
  merchants: Merchant[];
}

const SelectedMerchants: React.FC<SelectedMerchantsProps> = ({ merchants }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true); // Initial state is loading

  useEffect(() => {
    // Simulate data fetching with a 1000ms delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  const handleMerchantDetails = (merchant: Merchant) => {
    dispatch(openBottomSheet());
    dispatch(merchantDetails(merchant));
  };

  return (
    <div className='selected-merchants-wrapper'>
      <p className='selected-merchants-title'>کسب‌وکارهای منتخب</p>

      <div className='selected-merchants'>
        {isLoading // Render 4 instances of the SkeletonOthersPaymans when loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <SkeletonOthersPaymans key={index} />
            ))
          : merchants.map((merchant, index) => (
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
};

// SelectedMerchants.propTypes = {
//   merchants: PropTypes.arrayOf(
//     PropTypes.exact({
//       title: PropTypes.string.isRequired,
//       img: PropTypes.string.isRequired,
//     })
//   ).isRequired,
// };

export default SelectedMerchants;
