import React from 'react';
import { ReactComponent as SnapIcon } from '../../../icons/snapIcon.svg';
import { ReactComponent as DangerIcon } from '../../../icons/dangerTraingle.svg';

import './style.css';

export const ExpiredPaymansCard: React.FC = () => {
  return (
    <div className="near-expiration-card-wrapper expired">
      <div className="merchant-logo-wrapper">
        <div className="merchant-name-logo">
          <SnapIcon />
          <span className="merchant-name expired">اسنپ</span>
        </div>
        <div className="bank-logo">
          <img src="/assets/pics/pasargadBank.png" />
        </div>
      </div>
      <div className="merchant-dateils-wrapper">
        <div className="merchant-dateil-right">
          <p className="merchant-dateil-time">زمان باقی‌مانده: </p>
          <p className="merchant-dateil-maxtnx">سقف مبلغ روزانه: </p>
          <p className="merchant-dateil-number">سقف تعداد تراکنش: </p>
        </div>
        <div className="merchant-dateil-left">
          <p className="merchant-dateil-time val">۱ ماه</p>
          <p className="merchant-dateil-maxtnx val">۲۰۰٬۰۰۰ تومانءءء </p>
          <p className="merchant-dateil-number val">۵ تراکنش در روز</p>
        </div>
      </div>
      <div className="merchant-expiration-wrapper">
        <span className="merchant-expiration-title">منقضی شده</span>
        <DangerIcon />
      </div>
    </div>
  );
};
