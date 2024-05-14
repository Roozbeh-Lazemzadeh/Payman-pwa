/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from 'react';
import RechartPieChart from './RechartPieChart';
import './style.css';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import {
  selectMerchant,
  selectSelectedMerchant,
} from '../../store/chart/chartSlice';
import transactionData from '../../transaction.json';
// import jalaliMoment from 'jalali-moment';
// import { format, parse } from 'date-fns';
import { selectMonthlyBill } from '../../store/monthlyBill/monthlyBillSlice';
import { jalaliDate } from '../helpers/transDate';
// import { getMonthBillHandler } from '../../store/monthlyBill/monthlyBillSlice'; // Import the action creator

export const MerchantChartSection: React.FC = () => {
  const [title, setTitle] = useState('اسنپ');
  const [sum, setSum] = useState<number>(transactionData[0].transaction_amount);
  const dispatch = useAppDispatch();
  const selectedMerchant = useAppSelector(selectSelectedMerchant);
  const monthBillValue = useAppSelector(selectMonthlyBill);

  // useEffect(() => {
  //   dispatch(getMonthBillHandler(undefined));
  // }, []);

  const formattedMonthBillValue = monthBillValue
    ? `${monthBillValue.substring(0, 2)}/${monthBillValue.substring(3)}`
    : '';
  //  const sortedTransactionData = [...transactionData].sort((a, b) => {
  //    return b.transaction_amount - a.transaction_amount;
  //  });

  //  const topThreeTransactions = sortedTransactionData.slice(0, 3);
  //  const restOfTransactions = sortedTransactionData.slice(3);

  const filteredData = transactionData.filter((transaction) => {
    // const jalaliDate = jalaliMoment(
    //   format(
    //     parse(
    //       transaction.transaction_date,
    //       'yy-MMM-dd hh.mm.ss.SSSSSSSSS a',
    //       new Date()
    //     ),
    //     'yyyy-MM-dd HH:mm:ss'
    //   )
    // ).format('jYYYY/jM');
    // console.log(jalaliDate);
    return (
      parseInt(jalaliDate(transaction.transaction_date).split('/')[1]) ===
      parseInt(formattedMonthBillValue.split('/')[2])
    );
  });

  const filteredDataData = [...filteredData].sort((a, b) => {
    return b.transaction_amount - a.transaction_amount;
  });

  //  const topThreeTransactions = filteredDataData.slice(0, 3);
  //  const restOfTransactions = filteredDataData.slice(3);
  //  console.log(restOfTransactions);

  console.log('filteredData', filteredDataData);

  const creditorTransactionMap = new Map<string, number>();

  filteredData.forEach((transaction) => {
    const { creditor, transaction_amount } = transaction;
    if (creditorTransactionMap.has(creditor)) {
      const currentTotal = creditorTransactionMap.get(creditor)!;
      creditorTransactionMap.set(creditor, currentTotal + transaction_amount);
    } else {
      creditorTransactionMap.set(creditor, transaction_amount);
    }
  });

  console.log(creditorTransactionMap);

  const topThreeTransactions = Array.from(creditorTransactionMap).slice(0, 3);
  const restOfAmounts = Array.from(creditorTransactionMap)
    .slice(3)
    .reduce((total, [, amount]) => total + amount, 0);

  console.log(topThreeTransactions);
  const transformedData = [
    ...topThreeTransactions.map(([name, value]) => ({ name, value })),
    { name: 'Others', value: restOfAmounts },
  ];

  const handleSelectedMerchant = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const spanName = e.currentTarget.className.split(' ')[1];

    switch (spanName) {
      case 'all':
        dispatch(selectMerchant(3));
        setTitle('این ماه');
        setSum(
          transactionData.reduce(
            (total, transaction) => total + transaction.transaction_amount,
            0
          )
        );
        break;
      case 'fil':
        setTitle('فیلیمو');
        setSum(transactionData[2].transaction_amount);
        dispatch(selectMerchant(2));
        break;
      case 'taps':
        setTitle('تپسی');
        setSum(transactionData[1].transaction_amount);
        dispatch(selectMerchant(1));
        break;
      case 'snap':
        setTitle('اسنپ');
        setSum(transformedData[0].value);
        dispatch(selectMerchant(0));
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className='chart-row-wrapper'>
        <div className='pay-info-wrapper'>
          <div className='pay-title-price-wrapper'>
            <span className='pay-title'>{`کل پرداخت های شما در  ${title}`}</span>
            <span className='pay-price'>{`${sum} تومان`}</span>
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
            <span
              className={`instance snap ${
                selectedMerchant === 0 ? 'active' : ''
              }`}
              onClick={handleSelectedMerchant}
            >
              سایر
            </span>
          </div>
        </div>
        <RechartPieChart data={transformedData} />
      </div>
    </>
  );
};
