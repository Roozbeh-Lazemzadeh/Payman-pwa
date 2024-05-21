import React, { useEffect, useState } from 'react';
import RechartPieChart from './RechartPieChart';
import './style.css';
import { useAppSelector } from '../hooks/reduxHooks';
// import { selectSelectedMerchant } from '../../store/chart/chartSlice';
import transactionData from '../../data/transaction.json';
// import jalaliMoment from 'jalali-moment';
// import { format, parse } from 'date-fns';
import { selectMonthlyBill } from '../../store/monthlyBill/monthlyBillSlice';
import { jalaliDate } from '../helpers/transDate';
// import { getMonthBillHandler } from '../../store/monthlyBill/monthlyBillSlice'; // Import the action creator

export const MerchantChartSection: React.FC = () => {
  const [title, setTitle] = useState('اسنپ');
  const [value, setValue] = useState<number>(
    transactionData[0].transaction_amount
  );
  const [, setTransformedData] = useState<any[]>([]);
  // const [selectedItemColor, setSelectedItemColor] = useState<string>('');
  // const selectedMerchant = useAppSelector(selectSelectedMerchant);
  const monthBillValue = useAppSelector(selectMonthlyBill);

  // useEffect(() => {
  //   dispatch(getMonthBillHandler(undefined));
  // }, []);

  const formattedMonthBillValue = monthBillValue
    ? `${monthBillValue.substring(0, 2)}/${monthBillValue.substring(3)}`
    : '';

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

  // const filteredDataData = [...filteredData].sort((a, b) => {
  //   return b.transaction_amount - a.transaction_amount;
  // });

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

  const topThreeTransactions = Array.from(creditorTransactionMap).slice(0, 3);
  const restOfAmounts = Array.from(creditorTransactionMap)
    .slice(3)
    .reduce((total, [, { amount }]) => total + amount, 0);

  const newTransformedData = [
    ...topThreeTransactions.map(([name, { amount, color }]) => ({
      name,
      value: amount,
      color,
    })),
    { name: 'Others', value: restOfAmounts, color: 'default_color' },
  ];

  const handleSelectedMerchant = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const selectedTransaction = newTransformedData.find(
      (transaction) => transaction.name === e.currentTarget.textContent
    );

    if (selectedTransaction) {
      if (selectedTransaction.name !== 'Others') {
        setTitle(selectedTransaction.name);
      } else {
        setTitle('سایر');
      }
      setValue(selectedTransaction.value);

      const spanColor = selectedTransaction.color;
      setTransformedData((prevData) => [
        ...prevData,
        { name: selectedTransaction.name, color: spanColor },
      ]);
    } else {
      const othersValue =
        newTransformedData.find((transaction) => transaction.name === 'Others')
          ?.value ?? 0;

      setValue(othersValue);
    }
    // selectRef.current.
  };

  useEffect(() => {
    // Set the initial value on component mount
    const totalSum = newTransformedData.reduce(
      (sum, item) => sum + item.value,
      0
    );
    setValue(totalSum);
    setTitle('همه');
    // Execute handleSelectedAllMerchant on initial load
    handleSelectedAllMerchant();
  }, []);

  useEffect(() => {
    // Set the initial value on component mount
    const totalSum = newTransformedData.reduce(
      (sum, item) => sum + item.value,
      0
    );
    setValue(totalSum);
    setTitle('همه');
    // Execute handleSelectedAllMerchant on initial load
    handleSelectedAllMerchant();
  }, [monthBillValue]);

  const handleSelectedAllMerchant = () => {
    const totalSum = newTransformedData.reduce(
      (sum, item) => sum + item.value,
      0
    );
    setValue(totalSum);
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
            <span className='instance all' onClick={handleSelectedAllMerchant}>
              همه
            </span>
            {newTransformedData.map((item, index) => {
              // Convert hexadecimal color to RGB
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
              const rgbaColor = `rgba(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]}, 0.75)`;

              return (
                <span
                  key={item.name}
                  style={{
                    backgroundColor: rgbaColor,
                    // border: `${
                    //   index === selectedItemIndex ? 'solid 1px ' + item.color : ''
                    // }`,
                  }}
                  className='instance'
                  onClick={handleSelectedMerchant}
                >
                  {item.name}
                </span>
              );
            })}
          </div>
        </div>
        <RechartPieChart data={newTransformedData} />
      </div>
    </>
  );
};
