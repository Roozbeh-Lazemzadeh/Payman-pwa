import React, { useEffect, useState } from 'react';
import RechartPieChart from './RechartPieChart';
import './style.css';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import transactionData from '../../data/transaction.json';
import { selectMonthlyBill } from '../../store/monthlyBill/monthlyBillSlice';
import { jalaliDate } from '../helpers/transDate';
import { selectMerchant } from '../../store/chart/chartSlice';

export const MerchantChartSection: React.FC = () => {
  const [title, setTitle] = useState('همه');
  const [value, setValue] = useState<number>(0);
  const selectedIndex = useAppSelector((state) => state.chart.selectedMerchant);
  const monthBillValue = useAppSelector(selectMonthlyBill);
  const dispatch = useAppDispatch();

  const formattedMonthBillValue = monthBillValue
    ? `${monthBillValue.substring(0, 2)}/${monthBillValue.substring(3)}`
    : '';

  const filteredData = transactionData.filter((transaction) => {
    return (
      parseInt(jalaliDate(transaction.transaction_date).split('/')[1]) ===
      parseInt(formattedMonthBillValue.split('/')[2])
    );
  });

  const creditorTransactionMap = new Map<
    string,
    { amount: number; color: string }
  >();

  filteredData.forEach((transaction) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { creditor, transaction_amount, color } = transaction;
    if (creditorTransactionMap.has(creditor)) {
      const currentTotal = creditorTransactionMap.get(creditor)!.amount;
      creditorTransactionMap.set(creditor, {
        amount: currentTotal + transaction_amount,
        color,
      });
    } else {
      creditorTransactionMap.set(creditor, {
        amount: transaction_amount,
        color,
      });
    }
  });

  console.log(creditorTransactionMap);
  const topThreeTransactions = Array.from(creditorTransactionMap).slice(0, 3);
  while (topThreeTransactions.length < 3) {
    topThreeTransactions.push([
      'x',
      { amount: 0, color: 'rgba(0, 114, 255, 1)' },
    ]);
  }
  const restOfAmounts = Array.from(creditorTransactionMap)
    .slice(3)
    .reduce((total, [, { amount }]) => total + amount, 0);

  const newTransformedData = [
    ...topThreeTransactions.map(([name, { amount, color }]) => ({
      name,
      value: amount,
      color,
    })),
    { name: 'سایر', value: restOfAmounts, color: '#6E1BFF' },
    { name: 'x', value: 0, color: 'rgba(0, 114, 255, 1)' },
  ];

  while (newTransformedData.length < 5) {
    newTransformedData.push({
      name: 'placeholder',
      value: 0,
      color: 'rgba(0, 114, 255, 1)',
    });
  }

  useEffect(() => {
    handleSelectedAllMerchant();
  }, []);

  useEffect(() => {
    handleSelectedAllMerchant();
  }, [monthBillValue]);

  const handleSelectedMerchant = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    index: number
  ) => {
    const selectedTransaction = newTransformedData[index];

    if (selectedTransaction) {
      setTitle(selectedTransaction.name);
      setValue(selectedTransaction.value);
      dispatch(selectMerchant(index));
    }
  };

  const handleSelectedAllMerchant = () => {
    const totalSum = newTransformedData.reduce(
      (sum, item) => sum + item.value,
      0
    );
    setValue(totalSum);
    dispatch(selectMerchant(4));
    setTitle('همه');
  };

  return (
    <>
      <div className='chart-row-wrapper'>
        <div className='pay-info-wrapper'>
          <div className='pay-title-price-wrapper'>
            <span className='pay-title'>{`کل پرداخت های شما در  ${title}`}</span>
            <span className='pay-price'>{`${value} تومان`}</span>
          </div>
          <div className='merchants-wrapper'>
            <span
              className='instance all'
              style={{
                border:
                  selectedIndex === -1 ? '2px solid blue' : '2px solid #fff',
              }}
              onClick={handleSelectedAllMerchant}
            >
              همه
            </span>
            {newTransformedData.map((item, index) => {
              const hexToRgb = (hex: any) =>
                hex
                  .replace(
                    /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
                    (m: any, r: string, g: string, b: string) =>
                      '#' + r + r + g + g + b + b
                  )
                  .substring(1)
                  .match(/.{2}/g)
                  .map((x: string) => parseInt(x, 16));

              const rgbColor = hexToRgb(item.color);
              const rgbaColor = `rgba(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]}, 0.4)`;
              const rgbaColorBorder = `rgba(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]}, 1)`;

              return item.value === 0 ? null : (
                <span
                  key={item.name}
                  style={{
                    backgroundColor: rgbaColor,
                    border: `${
                      index === selectedIndex
                        ? `2px solid ${rgbaColorBorder}`
                        : '2px solid #fff'
                    }`,
                  }}
                  className={`instance ${
                    index === selectedIndex ? 'selected' : ''
                  }`}
                  onClick={(e) => handleSelectedMerchant(e, index)}
                >
                  {item.name}
                </span>
              );
            })}
          </div>
        </div>
        <RechartPieChart
          data={newTransformedData}
          selectedIndex={selectedIndex}
          onCellClick={handleSelectedMerchant}
        />
      </div>
    </>
  );
};
