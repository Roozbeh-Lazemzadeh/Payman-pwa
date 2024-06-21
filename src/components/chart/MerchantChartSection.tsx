// Importing necessary dependencies and components
import React, { useEffect, useState } from 'react';
import RechartPieChart from './RechartPieChart'; // Importing the RechartPieChart component
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks'; // Importing hooks for Redux state management
import transactionData from '../../data/transaction.json'; // Importing transaction data
import { selectMonthlyBill } from '../../store/monthlyBill/monthlyBillSlice'; // Importing selector for monthly bill
import { jalaliDate } from '../helpers/transDate'; // Importing helper function to handle date conversion
import { selectMerchant } from '../../store/chart/chartSlice'; // Importing selector for merchant chart

import './style.css'; // Importing styles

// Define the MerchantChartSection functional component
export const MerchantChartSection: React.FC = () => {
  // State variables for title and value
  const [title, setTitle] = useState('همه');
  const [value, setValue] = useState<number>(0);
  // Retrieve selected merchant index and monthly bill value from Redux store
  const selectedIndex = useAppSelector((state) => state.chart.selectedMerchant);
  const monthBillValue = useAppSelector(selectMonthlyBill);
  const dispatch = useAppDispatch();

  // Formatting the monthly bill value for filtering transactions
  const formattedMonthBillValue = monthBillValue
    ? `${monthBillValue.substring(0, 2)}/${monthBillValue.substring(3)}`
    : '';

  // Filter transaction data based on the formatted month bill value
  const filteredData = transactionData.filter((transaction) => {
    return (
      parseInt(jalaliDate(transaction.transaction_date).split('/')[1]) ===
      parseInt(formattedMonthBillValue.split('/')[2])
    );
  });

  // Map to accumulate transaction amounts by creditor
  const creditorTransactionMap = new Map<
    string,
    { amount: number; color: string }
  >();

  // Accumulate transaction amounts in the map
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

  // Extract top three transactions and sum the rest
  const topThreeTransactions = Array.from(creditorTransactionMap).slice(0, 3);
  while (topThreeTransactions.length < 3) {
    topThreeTransactions.push(['x', { amount: 0, color: '#101828' }]);
  }
  const restOfAmounts = Array.from(creditorTransactionMap)
    .slice(3)
    .reduce((total, [, { amount }]) => total + amount, 0);

  // Transform data for the pie chart component
  const newTransformedData = [
    ...topThreeTransactions.map(([name, { amount, color }]) => ({
      name,
      value: amount,
      color,
    })),
    { name: 'سایر', value: restOfAmounts, color: '#6E1BFF' },
    { name: 'x', value: 0, color: '#101828' },
  ];

  // Ensure there are always 5 items in the transformed data array
  while (newTransformedData.length < 5) {
    newTransformedData.push({
      name: 'placeholder',
      value: 0,
      color: '#101828',
    });
  }

  // Effect hook to handle initial selection of all merchants
  useEffect(() => {
    handleSelectedAllMerchant();
  }, []);

  // Effect hook to handle selection when the month bill value changes
  useEffect(() => {
    handleSelectedAllMerchant();
  }, [monthBillValue]);

  // Handle selection of a specific merchant
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
    if (index === 4) {
      handleSelectedAllMerchant();
    }
  };

  // Handle selection of all merchants
  const handleSelectedAllMerchant = () => {
    const totalSum = newTransformedData.reduce(
      (sum, item) => sum + item.value,
      0
    );
    setValue(totalSum);
    dispatch(selectMerchant(4));
    setTitle('این ماه');
  };

  // Render the component
  return (
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
                selectedIndex === 4 ? '2px solid #0072ff' : '2px solid #fff',
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
  );
};

export default MerchantChartSection;
