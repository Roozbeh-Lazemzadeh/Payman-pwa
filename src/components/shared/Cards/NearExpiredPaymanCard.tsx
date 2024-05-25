import React from 'react';
import { type Payman } from '../../Paymans/myPaymans/MyPaymans';
import { getFormattedRemainingDays } from '../../helpers/expirationDate';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { openBottomSheet } from '../../../store/bottomSheet/bottomSheetSlice';
import { handleSelectedPayman } from '../../../store/payman/paymanSlice';

import './style/style.css';

export const NearExpiredPaymanCard: React.FC<{ payman: Payman }> = ({
  payman,
}) => {
  const dispatch = useAppDispatch();
  const handleDrawerPayman = (payman: Payman) => {
    dispatch(handleSelectedPayman(payman));
    dispatch(openBottomSheet());
  };

  return (
    <div
      className='near-expiration-card-wrapper shadow-ani'
      onClick={() => handleDrawerPayman(payman)}
    >
      <div className='merchant-row'>
        <div className='merchant-name-logo'>
          <div className='card-icon-wrapper payman'>
            <div className='card-icon-style payman'>
              <img className='card-icon' src={payman.merchant_img} />
              <span
                className='card-icon-filter'
                style={{
                  backgroundImage: `url(${payman.merchant_img})`,
                }}
              ></span>
            </div>
          </div>

          <span className='merchant-name'>{payman.creditor}</span>
        </div>
        <div className='remain-dates-wrapper'>
          <span className='remain-dates-title'>زمان باقی‌مانده: </span>
          <span className='remain-dates-value'>
            {getFormattedRemainingDays(payman.end_date)}
          </span>
        </div>
      </div>
      <div className='bank-row-wrapper'>
        <div className='bank-logo'>
          <img src={payman.bank_img} />
        </div>
        <div className='ceiling-qnt-wrapper'>
          <div className='price-ceiling'>
            <span className='remain-dates-title'>سقف مبلغ روزانه: </span>
            <span className='ceiling-value'>{payman.daily_amount}تومانءءء</span>
          </div>
          <div className='transaction-ceiling'>
            <span className='remain-dates-title'>سقف تعداد تراکنش: </span>
            <span className='ceiling-value transaction'>
              {payman.daily_numbers} تراکنش در روز
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
