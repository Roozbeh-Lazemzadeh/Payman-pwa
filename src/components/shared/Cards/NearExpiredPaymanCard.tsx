import React from 'react';
import { ReactComponent as TapsiIcon } from './icon.svg';
import { ReactComponent as SamanBankIcon } from '../../../icons/samanBank.svg';

import './style.css';

export const NearExpiredPaymanCard: React.FC = () => {
  return (
    <div className="near-expiration-card-wrapper">
      <div className="merchant-row">
        <div className="merchant-name-logo">
          <TapsiIcon />
          <span className="merchant-name">تپسی</span>
        </div>
        <div className="remain-dates-wrapper">
          <span className="remain-dates-title">زمان باقی‌مانده: </span>
          <span className="remain-dates-value">۳ روز </span>
        </div>
      </div>
      <div className="bank-row-wrapper">
        <div className="bank-logo">
          <SamanBankIcon />
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
