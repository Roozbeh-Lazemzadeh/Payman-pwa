import React from 'react';
import { Divider } from 'antd';
import FilterTools from '../../template/FilterTools';
import { NearExpiredPaymanCard } from '../../shared/Cards/NearExpiredPaymanCard';
import { OtherPaymansCard } from '../../shared/Cards/OtherPaymansCard';
import { ExpiredPaymansCard } from '../../shared/Cards/ExpiredPaymansCard';
import { useAppSelector } from '../../hooks/reduxHooks';
import { selectPaymanList } from '../../../store/filterPage/filterSlice';
import { isExpired, isNearExpired } from '../../helpers/expirationDate';

import './style.css';
export interface Payman {
  id: number;
  creditor: string;
  currency: string;
  source_bank: string;
  daily_amount: number;
  daily_numbers: number;
  start_date: string;
  end_date: string;
  phone_number: string;
  payman_id: string;
  bank_img: string;
  merchant_img: string;
}

export const MyPaymans: React.FC = () => {
  const paymanList = useAppSelector(selectPaymanList);

  return (
    <>
      <div className='payman-filter-title'>
        <FilterTools title='پیمان‌های رو به اتمام' />
      </div>
      <div className='scrollable-section-wrapper'>
        <div className='scrollable-section'>
          {paymanList
            .filter((payman) => isNearExpired(payman.end_date))
            .map((payman) => (
              <NearExpiredPaymanCard key={payman.id} payman={payman} />
            ))}
          <Divider />
          <span className='other-payman-title'>سایر ‌‌پیمان‌ها</span>
          {paymanList
            .filter(
              (payman) =>
                !isNearExpired(payman.end_date) && !isExpired(payman.end_date)
            )
            .map((payman) => (
              <OtherPaymansCard key={payman.id} payman={payman} />
            ))}
          {paymanList
            .filter((payman) => isExpired(payman.end_date))
            .map((payman) => (
              <ExpiredPaymansCard key={payman.id} payman={payman} />
            ))}
        </div>
      </div>
    </>
  );
};
