import React, { useState } from 'react';
import { ReactComponent as TapsiIcon } from './icon.svg';
import { ReactComponent as SamanBankIcon } from '../../../icons/samanBank.svg';
import { type Payman } from '../../Paymans/myPaymans/MyPaymans';
// import { DetailedDrawer } from '../Drawer/DetailedDrawer';
// import { Button } from 'antd';
import './style.css';
import { getFormattedRemainingDays } from '../../helpers/expirationDate';

export const NearExpiredPaymanCard: React.FC<{ payman: Payman }> = ({
  payman,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      className='near-expiration-card-wrapper shadow-ani'
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className='merchant-row'>
        <div className='merchant-name-logo'>
          <TapsiIcon />
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
          <SamanBankIcon />
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
