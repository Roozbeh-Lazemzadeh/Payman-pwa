import React, { useState } from 'react';
import { RechartPieChart, data } from './RechartPieChart';
import './style.css';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import {
  selectMerchant,
  selectSelectedMerchant,
} from '../../store/chart/chartSlice';

export const MerchantChartSection: React.FC = () => {
  const [title, setTitle] = useState('اسنپ');
  const [sum, setSum] = useState<number>(data[0].value);
  const dispatch = useAppDispatch();
  const selectedMerchant = useAppSelector(selectSelectedMerchant);
  const handleSelectedMerchant = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const spanName = e.currentTarget.className.split(' ')[1]; // Get the second class name

    switch (spanName) {
      case 'all':
        // Handle 'همه' (all) case
        dispatch(selectMerchant(3));
        setTitle('این ماه');
        setSum(data[0].value + data[1].value + data[2].value);
        break;
      case 'fil':
        // Handle 'فیلیمو' (fil) case
        setTitle('فیلیمو');
        setSum(data[2].value);
        dispatch(selectMerchant(2));

        break;
      case 'taps':
        // Handle 'تپسی' (taps) case
        setTitle('تپسی');
        setSum(data[1].value);
        dispatch(selectMerchant(1));

        break;
      case 'snap':
        // Handle 'اسنپ' (snap) case
        setTitle('اسنپ');
        setSum(data[0].value);
        dispatch(selectMerchant(0));

        break;
      default:
        // Handle other cases if needed
        break;
    }
  };
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
        <RechartPieChart />
      </div>
    </>
  );
};
