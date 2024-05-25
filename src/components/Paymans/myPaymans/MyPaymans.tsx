import React from 'react';
import { Divider } from 'antd';
import FilterTools from '../../template/FilterTools';
import { NearExpiredPaymanCard } from '../../shared/Cards/NearExpiredPaymanCard';
import { OtherPaymansCard } from '../../shared/Cards/OtherPaymansCard';
import { ExpiredPaymansCard } from '../../shared/Cards/ExpiredPaymansCard';
import { useAppSelector } from '../../hooks/reduxHooks';
import {
  selectPaymanList,
  selectSortKey,
} from '../../../store/filterPage/filterSlice';
import { isExpired, isNearExpired } from '../../helpers/expirationDate';
import { getPaymanTitle } from '../../helpers/getPaymanTitle';
import { DetailedDrawer } from '../../shared/Drawer/DetailedDrawer';
import { selectBottomSheetIsOpen } from '../../../store/bottomSheet/bottomSheetSlice';
import { selectSelectedPayman } from '../../../store/payman/paymanSlice';
import { getPaymanDetails } from '../../helpers/getBottomSheetData';

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
  const isOpen = useAppSelector(selectBottomSheetIsOpen);
  const selectedPayman = useAppSelector(selectSelectedPayman);
  const paymanList = useAppSelector(selectPaymanList);
  const sortKey = useAppSelector(selectSortKey);

  const nearExpiredPaymans = paymanList.filter((payman) =>
    isNearExpired(payman.end_date)
  );
  const otherPaymans = paymanList.filter(
    (payman) => !isNearExpired(payman.end_date) && !isExpired(payman.end_date)
  );
  const expiredPaymans = paymanList.filter((payman) =>
    isExpired(payman.end_date)
  );
  const paymanTitle = getPaymanTitle(
    nearExpiredPaymans,
    otherPaymans,
    expiredPaymans
  );

  const renderBasedOnSortKey = () => {
    if (sortKey === '0') {
      return (
        <>
          {otherPaymans.length > 0 && nearExpiredPaymans.length > 0 && (
            <>
              <Divider />
              <span className='other-payman-title'>سایر ‌‌پیمان‌ها</span>
            </>
          )}
          {otherPaymans.map((payman) => (
            <OtherPaymansCard key={payman.id} payman={payman} />
          ))}
          {(otherPaymans.length > 0 || nearExpiredPaymans.length > 0) &&
            expiredPaymans.length > 0 && (
              <>
                <Divider />
                <span className='other-payman-title'>
                  {`${
                    expiredPaymans.length === 1
                      ? 'پیمان‌ منقضی شده'
                      : 'پیمان‌های منقضی شده'
                  }`}
                </span>
              </>
            )}
          {expiredPaymans.map((payman) => (
            <ExpiredPaymansCard key={payman.id} payman={payman} />
          ))}
        </>
      );
    } else if (sortKey === '1') {
      return (
        <>
          {(otherPaymans.length > 0 || nearExpiredPaymans.length > 0) &&
            expiredPaymans.length > 0 && (
              <>
                <Divider />
                <span className='other-payman-title'>
                  {`${
                    expiredPaymans.length === 1
                      ? 'پیمان‌ منقضی شده'
                      : 'پیمان‌های منقضی شده'
                  }`}
                </span>
              </>
            )}
          {expiredPaymans.map((payman) => (
            <ExpiredPaymansCard key={payman.id} payman={payman} />
          ))}
          {otherPaymans.length > 0 && nearExpiredPaymans.length > 0 && (
            <>
              <Divider />
              <span className='other-payman-title'>سایر ‌‌پیمان‌ها</span>
            </>
          )}
          {otherPaymans.map((payman) => (
            <OtherPaymansCard key={payman.id} payman={payman} />
          ))}
        </>
      );
    }
  };

  return (
    <>
      <div className='payman-filter-title'>
        <FilterTools title={paymanTitle} />
      </div>
      <div className='scrollable-section-wrapper'>
        <DetailedDrawer
          isOpen={isOpen}
          title={'جزییات پیمان'}
          data={getPaymanDetails(selectedPayman)}
        ></DetailedDrawer>
        <div className='scrollable-section'>
          {nearExpiredPaymans.map((payman) => (
            <NearExpiredPaymanCard key={payman.id} payman={payman} />
          ))}
          {renderBasedOnSortKey()}
        </div>
      </div>
    </>
  );
};
