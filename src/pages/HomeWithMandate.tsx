import React, { useState } from 'react';
import { MerchantChartSection } from '../components/chart/MerchantChartSection';
import FilterTools from '../components/template/FilterTools';
import { TransactionHomeCard } from '../components/shared/Cards/TransactionHomeCards';
import { DetailedDrawer } from '../components/shared/Drawer/DetailedDrawer';
import transactionData from '../transaction.json'; // Import the JSON file
import useDrawerTransaction from '../components/hooks/useDrawerTransaction';
import jalaliMoment from 'jalali-moment';
import { format, parse } from 'date-fns';
import { useDispatch } from 'react-redux';
import { getMonthBillHandler } from '../store/monthlyBill/monthlyBillSlice';

function HomeWithMandate() {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(0);
  const {
    isOpen,
    detailedDrawerData,
    handleDrawerTransaction,
    handleCloseDrawer,
    selectedTransactionId,
  } = useDrawerTransaction(transactionData);

  const dispatch = useDispatch();

  const monthsList: Array<{ id: number; year: string; month: string }> = [];
  const monthsList2: any[] = [];

  for (let i = 0; i < 6; i++) {
    const currentDate = jalaliMoment();
    const pastDate = currentDate.subtract(i, 'jMonth');
    monthsList.push({
      id: i,
      year: pastDate.locale('fa').format('jYY'),
      month: pastDate.locale('fa').format('jMMMM'),
    });
    monthsList2.push(pastDate.format('jYYYY/jMM'));
  }

  // const handleItemClick = (id: any) => {
  //   setSelectedItemIndex(id === selectedItemIndex ? selectedItemIndex : id);
  //   const selectedMonth = monthsList.find(
  //     (item) => item.id === selectedItemIndex
  //   );
  //   if (selectedMonth) {
  //     console.log(selectedMonth.month);
  //   } else {
  //     console.log('Error: Month not found');
  //   }
  // };

  const transDate = (inputDate: string) => {
    const parsedDate = parse(
      inputDate,
      'yy-MMM-dd hh.mm.ss.SSSSSSSSS a',
      new Date()
    );
    const formattedDate = format(parsedDate, 'yyyy-MM-dd HH:mm:ss');
    const jalaliDate = jalaliMoment(formattedDate).format(
      'jYYYY/jMM/jDD - HH:mm:ss'
    );
    const weekday = jalaliMoment(formattedDate).locale('fa').format('dddd');
    return `${weekday} ، ${jalaliDate}`;
  };

  const getCurrentJalaliDate = () => {
    const currentDate = jalaliMoment();
    const formattedDate = currentDate.locale('fa').format('jD jMMMM');
    return `امروز، ${formattedDate}`;
  };

  const handleItemClick = (id: number | null) => {
    setSelectedItemIndex(id === selectedItemIndex ? selectedItemIndex : id);
    const selectedMonth = monthsList.find((item) => item.id === id);
    if (selectedMonth) {
      const selectedYearMonth = monthsList2[selectedMonth.id];
      console.log(selectedYearMonth);
      dispatch(getMonthBillHandler(selectedYearMonth));
    } else {
      console.log('Error: Month not found');
    }
  };
  return (
    <div className='home-wrapper'>
      <div className='home-datepickers'>
        {monthsList.reverse().map((item) => (
          <div
            className={`home-datepicker ${
              item.id === selectedItemIndex ? 'home-datepicker-click' : ''
            }`}
            key={item.id}
            onClick={() => handleItemClick(item.id)}
          >
            <span className='home-datepicker-num'>{item.year}</span>
            <span className='home-datepicker-p'>{item.month}</span>
          </div>
        ))}
      </div>
      <MerchantChartSection />
      <DetailedDrawer
        isOpen={isOpen && selectedTransactionId !== null}
        setIsOpen={handleCloseDrawer}
        title={'جزئیات بیشتر'}
        data={detailedDrawerData}
      />
      <FilterTools title='تراکنش‌های پرداخت مستقیم' />
      <div className='TransactionHomeCard-wrapper'>
        <div className='TransactionHomeCard'>
          <div className='TransactionHomeCard-wrapper-cards'>
            <p className='TransactionHomeCard-p'>{getCurrentJalaliDate()}</p>
            {transactionData.map((transaction) => (
              <div
                key={transaction.id}
                onClick={() => handleDrawerTransaction(transaction.id)}
              >
                <TransactionHomeCard
                  merchant={transaction.creditor}
                  price={transaction.transaction_amount}
                  transDate={transDate(transaction.transaction_date)}
                  img={transaction.img}
                />
              </div>
            ))}
          </div>
          <div className='TransactionHomeCard-wrapper-cards active'>
            <p className='TransactionHomeCard-p'>امروز، ۱۸ آبان</p>
            {/* {Array.from({ length: 1 }, (value) => value).map((item, index) => (
              <div onClick={() => setIsOpen(!isOpen)} key={index}>
                <TransactionHomeCard
                  merchant="خودرو"
                  price={4550}
                  transDate="سه‌شنبه، ۱۴۰۲/۰۷/۲۵- ۱۸:۴۸"
                />
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeWithMandate;
