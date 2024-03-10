import React from 'react';
import { RechartPieChart } from './RechartPieChart';
import './style.css';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import {
  selectMerchant,
  selectSelectedMerchant,
} from '../../store/chart/chartSlice';

export const MerchantChartSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedMerchant = useAppSelector(selectSelectedMerchant);
  console.log(selectedMerchant);
  const handleSelectedMerchant = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const spanName = e.currentTarget.className.split(' ')[1]; // Get the second class name

    switch (spanName) {
      case 'all':
        // Handle 'همه' (all) case
        dispatch(selectMerchant(3));
        break;
      case 'fil':
        // Handle 'فیلیمو' (fil) case
        dispatch(selectMerchant(2));

        break;
      case 'taps':
        // Handle 'تپسی' (taps) case
        dispatch(selectMerchant(1));

        break;
      case 'snap':
        // Handle 'اسنپ' (snap) case
        dispatch(selectMerchant(0));

        break;
      default:
        // Handle other cases if needed
        break;
    }
  };
  return (
    <>
      <div className="chart-row-wrapper">
        <div className="pay-info-wrapper">
          <div className="pay-title-price-wrapper">
            <span className="pay-title">کل پرداخت های شما در این ماه</span>
            <span className="pay-price">۱۰٬۰۰۰٬۰۰۰ تومان</span>
          </div>
          <div className="merchants-wrapper">
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
