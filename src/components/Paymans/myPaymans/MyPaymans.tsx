import React from 'react';
import { Divider } from 'antd';
import FilterTools from '../../template/FilterTools';
import { NearExpiredPaymanCard } from '../../shared/Cards/NearExpiredPaymanCard';
// import './style.css';
import { OtherPaymansCard } from '../../shared/Cards/OtherPaymansCard';
import { ExpiredPaymansCard } from '../../shared/Cards/ExpiredPaymansCard';

export const MyPaymans: React.FC = () => {
  return (
    <>
      <div className="payman-filter-title">
        <FilterTools title="پیمان‌های رو به اتمام" />
        <NearExpiredPaymanCard />
      </div>
      <Divider />
      <div>
        <span className="other-payman-title">سایر ‌‌پیمان‌ها</span>
        <OtherPaymansCard />
        <ExpiredPaymansCard />
      </div>
    </>
  );
};
