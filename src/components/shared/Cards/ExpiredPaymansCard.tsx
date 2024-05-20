import React, { useState } from 'react';
import { ReactComponent as DangerIcon } from '../../../icons/dangerTraingle.svg';
import { type Payman } from '../../Paymans/myPaymans/MyPaymans';
import { getFormattedRemainingDays } from '../../helpers/expirationDate';

import './style.css';

export const ExpiredPaymansCard: React.FC<{ payman: Payman }> = ({
  payman,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      className='near-expiration-card-wrapper expired'
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className='merchant-logo-wrapper'>
        <div className='merchant-name-logo'>
          <img src={payman.merchant_img} />
          <span className='merchant-name expired'>{payman.creditor}</span>
        </div>
        <div className='bank-logo'>
          {/* <img src='/assets/pics/pasargadBank.png' /> */}
          <img src={payman.bank_img} />
        </div>
      </div>
      <div className='merchant-dateils-wrapper'>
        <div className='merchant-dateil-right'>
          <p className='merchant-dateil-time'>زمان باقی‌مانده: </p>
          <p className='merchant-dateil-maxtnx'>سقف مبلغ روزانه: </p>
          <p className='merchant-dateil-number'>سقف تعداد تراکنش: </p>
        </div>
        <div className='merchant-dateil-left'>
          <p className='merchant-dateil-time val'>
            {getFormattedRemainingDays(payman.end_date)}
          </p>
          <p className='merchant-dateil-maxtnx val'>
            {payman.daily_amount} تومانءءء
          </p>
          <p className='merchant-dateil-number val'>
            {payman.daily_numbers} تراکنش در روز
          </p>
        </div>
      </div>
      <div className='merchant-expiration-wrapper'>
        <span className='merchant-expiration-title'>منقضی شده</span>
        <DangerIcon />
      </div>
    </div>
  );
};
