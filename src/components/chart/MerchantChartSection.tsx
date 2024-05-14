import React, { useState } from 'react';
import RechartPieChart from './RechartPieChart';
import './style.css';
import { useAppSelector } from '../hooks/reduxHooks';
import { selectSelectedMerchant } from '../../store/chart/chartSlice';
import transactionData from '../../transaction.json';
// import jalaliMoment from 'jalali-moment';
// import { format, parse } from 'date-fns';
import { selectMonthlyBill } from '../../store/monthlyBill/monthlyBillSlice';
import { jalaliDate } from '../helpers/transDate';
// import { getMonthBillHandler } from '../../store/monthlyBill/monthlyBillSlice'; // Import the action creator

export const MerchantChartSection: React.FC = () => {
  const [title, setTitle] = useState('اسنپ');
  const [sum, setSum] = useState<number>(transactionData[0].transaction_amount);
  const [, setTransformedData] = useState<any[]>([]);
  const selectedMerchant = useAppSelector(selectSelectedMerchant);
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

  console.log('filteredData', filteredData);

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

  console.log('transformedData', newTransformedData);

  const handleSelectedMerchant = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const spanName = e.currentTarget.className.split(' ')[1];
    const selectedTransaction = transactionData.find(
      (transaction) => transaction.creditor === spanName
    );

    if (selectedTransaction) {
      setTitle(selectedTransaction.creditor);
      setSum(selectedTransaction.transaction_amount);

      // Update transformedData state
      const spanColor = selectedTransaction.color;
      setTransformedData((prevData) => [
        ...prevData,
        { name: selectedTransaction.creditor, color: spanColor },
      ]);
    }
  };

  const handleSelectedAllMerchant = () => {
    console.log('first');
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
              onClick={handleSelectedAllMerchant}
            >
              همه
            </span>
            {newTransformedData.map((item) => {
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

              // Set RGBA color with desired alpha value
              const rgbaColor = `rgba(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]}, 0.75)`;

              return (
                <span
                  key={item.name}
                  style={{ backgroundColor: rgbaColor }}
                  className={`instance ${item.name.toLowerCase()} ${
                    selectedMerchant === 2 ? 'active' : ''
                  }`}
                  onClick={handleSelectedMerchant}
                >
                  {item.name}
                </span>
              );
            })}

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
        <RechartPieChart data={newTransformedData} />
      </div>
    </>
  );
};
