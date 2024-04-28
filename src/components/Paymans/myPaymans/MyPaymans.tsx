import React from 'react';
import { Divider } from 'antd';
import FilterTools from '../../template/FilterTools';
import { NearExpiredPaymanCard } from '../../shared/Cards/NearExpiredPaymanCard';
import { OtherPaymansCard } from '../../shared/Cards/OtherPaymansCard';
import { ExpiredPaymansCard } from '../../shared/Cards/ExpiredPaymansCard';
import './style.css';

export const MyPaymans: React.FC = () => {
  return (
    <>
      <div className='payman-filter-title'>
        <FilterTools title='پیمان‌های رو به اتمام' />
      </div>
      <div className='scrollable-section-wrapper'>
        <div className='scrollable-section'>
          <NearExpiredPaymanCard />
          <Divider />
          <span className='other-payman-title'>سایر ‌‌پیمان‌ها</span>
          <OtherPaymansCard />
          <ExpiredPaymansCard />
        </div>
      </div>
    </>
  );
};
