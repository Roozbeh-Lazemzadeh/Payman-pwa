import React, { useState } from 'react';
import RechartPieChart from './RechartPieChart';
import './style.css';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import {
  selectMerchant,
  selectSelectedMerchant,
} from '../../store/chart/chartSlice';
import transactionData from '../../transaction.json';

export const MerchantChartSection: React.FC = () => {
  const [title, setTitle] = useState('اسنپ');
  const [sum, setSum] = useState<number>(transactionData[0].transaction_amount);
  const dispatch = useAppDispatch();
  const selectedMerchant = useAppSelector(selectSelectedMerchant);
  const monthBillValue = useAppSelector((state) => state.monthly);

  const handleSelectedMerchant = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const spanName = e.currentTarget.className.split(' ')[1]; // Get the second class name

    switch (spanName) {
      case 'all':
        // Handle 'همه' (all) case
        dispatch(selectMerchant(3));
        setTitle('این ماه');
        setSum(
          transactionData[0].transaction_amount + transactionData[1].transaction_amount + transactionData[2].transaction_amount
        );
        break;
      case 'fil':
        // Handle 'فیلیمو' (fil) case
        setTitle('فیلیمو');
        setSum(transactionData[2].transaction_amount);
        dispatch(selectMerchant(2));
        break;
      case 'taps':
        // Handle 'تپسی' (taps) case
        setTitle('تپسی');
        setSum(transactionData[1].transaction_amount);
        dispatch(selectMerchant(1));
        break;
      case 'snap':
        // Handle 'اسنپ' (snap) case
        setTitle('اسنپ');
        setSum(transactionData[0].transaction_amount);
        dispatch(selectMerchant(0));
        break;
      default:
        // Handle other cases if needed
        break;
    }
  };

  // Ensure transactionData is correctly imported
  // console.log(transactionData);

  const transformedData = transactionData.map((transaction) => ({
    name: transaction.creditor, // Use a unique identifier as the name
    value: transaction.transaction_amount,
  }));

  console.log(monthBillValue.monthlyBill);

  return (
    <>
      <div className='chart-row-wrapper'>
        <div className='pay-info-wrapper'>
          <div className='pay-title-price-wrapper'>
            <span className='pay-title'>{`کل پرداخت های شما در  ${title}`}</span>
            <span className='pay-price'> {`${sum} تومان`}</span>
          </div>
          <div className='merchants-wrapper'>
            <span
              className={`instance all ${
                selectedMerchant === 3 ? 'active' : ''
              }`}
              onClick={handleSelectedMerchant}
            >
              همه
            </span>
            <span
              className={`instance fil ${
                selectedMerchant === 2 ? 'active' : ''
              }`}
              onClick={handleSelectedMerchant}
            >
              فیلیمو
            </span>
            <span
              className={`instance taps ${
                selectedMerchant === 1 ? 'active' : ''
              }`}
              onClick={handleSelectedMerchant}
            >
              تپسی
            </span>
            <span
              className={`instance snap ${
                selectedMerchant === 0 ? 'active' : ''
              }`}
              onClick={handleSelectedMerchant}
            >
              اسنپ
            </span>
          </div>
        </div>
        <RechartPieChart
          data={transformedData}
          // activeIndex={transformedData.length}
        />
      </div>
    </>
  );
};
