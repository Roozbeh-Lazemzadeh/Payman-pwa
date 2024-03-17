import React from 'react';
import { ReactComponent as SnapIcon } from '../../../icons/snapIcon.svg';
import { ReactComponent as DangerIcon } from '../../../icons/dangerTraingle.svg';

import './style.css';

export const ExpiredPaymansCard: React.FC = () => {
  return (
    <div className="near-expiration-card-wrapper expired">
      <div className="right-side-section">
        <div className="merchant-row">
          <div className="merchant-name-logo">
            <SnapIcon />
            <span className="merchant-name expired">اسنپ</span>
          </div>
          <div className="remain-dates-wrapper">
            <span className="remain-dates-title expired">
              زمان باقی‌مانده:{' '}
            </span>
            <span className="remain-dates-value expired">۳ روز </span>
          </div>
        </div>
        <div className="bank-row-wrapper expired">
          <div className="bank-logo">
            <img src="/assets/pics/pasargadBank.png" />
          </div>
          <div className="ceiling-qnt-wrapper expired">
            <div className="price-ceiling">
              <span className="remain-dates-title expired">
                سقف مبلغ روزانه:
              </span>
              <span className="ceiling-value expired">۲۰۰٬۰۰۰ تومانءءء</span>
            </div>
            <div className="transaction-ceiling">
              <span className="remain-dates-title expired">
                سقف تعداد تراکنش:
              </span>
              <span className="ceiling-value transaction expired">
                ۵ تراکنش در روز
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="expiration-section">
        <span className="title">منقضی شده</span>
        <DangerIcon />
      </div>
    </div>
  );
};
