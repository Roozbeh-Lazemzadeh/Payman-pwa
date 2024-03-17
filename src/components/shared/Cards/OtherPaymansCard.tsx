import React from 'react';
import { ReactComponent as SnapIcon } from '../../../icons/snapIcon.svg';

import './style.css';

export const OtherPaymansCard: React.FC = () => {
  return (
    <div className="near-expiration-card-wrapper other">
      <div className="merchant-row">
        <div className="merchant-name-logo">
          <SnapIcon />
          <span className="merchant-name">اسنپ</span>
        </div>
        <div className="remain-dates-wrapper">
          <span className="remain-dates-title">زمان باقی‌مانده: </span>
          <span className="remain-dates-value other">۳ روز </span>
        </div>
      </div>
      <div className="bank-row-wrapper">
        <div className="bank-logo">
          {/* <PasargadBankIcon /> */}
          <img src="/assets/pics/pasargadBank.png" />
        </div>
        <div className="ceiling-qnt-wrapper">
          <div className="price-ceiling">
            <span className="remain-dates-title">سقف مبلغ روزانه: </span>
            <span className="ceiling-value">۲۰۰٬۰۰۰ تومانءءء</span>
          </div>
          <div className="transaction-ceiling">
            <span className="remain-dates-title">سقف تعداد تراکنش: </span>
            <span className="ceiling-value transaction">۵ تراکنش در روز</span>
          </div>
        </div>
      </div>
    </div>
  );
};
