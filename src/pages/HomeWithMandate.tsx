// HomeWithMandate.tsx

import React, { useEffect, useState } from 'react';
import { MerchantChartSection } from '../components/chart/MerchantChartSection';
import FilterTools from '../components/template/FilterTools';
import { TransactionHomeCard } from '../components/shared/Cards/TransactionHomeCards';
import { DetailedDrawer } from '../components/shared/Drawer/DetailedDrawer';
import transactionData from '../transaction.json';
import useDrawerTransaction from '../components/hooks/useDrawerTransaction';
import jalaliMoment from 'jalali-moment';
import { format, parse } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { getMonthBillHandler } from '../store/monthlyBill/monthlyBillSlice';
import { setArrayHomeWithMandate } from '../store/arrayHomeWithMandate/arrayHomeWithMandateSlice';
import { type RootState } from '../store/store';
import { type TransactionItem } from '../store/arrayHomeWithMandate/types';
import { transDate } from '../components/helpers/transDate';

function HomeWithMandate() {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(0);
  const {
    isOpen,
    detailedDrawerData,
    handleDrawerTransaction,
    handleCloseDrawer,
    selectedTransactionId,
  } = useDrawerTransaction(transactionData);

  const groupedTransactions = useSelector(
    (state: RootState) => state.arrayHome.groupsTransactions
  );

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
      dispatch(getMonthBillHandler(selectedYearMonth));
    } else {
      console.log('Error: Month not found');
    }
  };

  useEffect(() => {
    dispatch(setArrayHomeWithMandate(transactionData));
  }, [dispatch]);

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
            {groupedTransactions?.map(
              (group: {
                key: React.Key | null | undefined;
                value: TransactionItem[];
              }) => {
                return (
                  <div key={group.key} className='TransactionHomeCard-wrapper'>
                    <p className='TransactionHomeCard-p'>
                      {group.value[0].transaction_date.startsWith(
                        format(new Date(), 'yy-MMM-dd').toUpperCase()
                      )
                        ? getCurrentJalaliDate()
                        : `${jalaliMoment(
                            format(
                              parse(
                                group.value[0].transaction_date,
                                'yy-MMM-dd hh.mm.ss.SSSSSSSSSS a',
                                new Date()
                              ),
                              'yyyy-MM-dd HH:mm:ss'
                            )
                          )
                            .locale('fa')
                            .format('dddd ، jD jMMMM')}`}
                    </p>
                    <div className='TransactionHomeCard-wrapper-cards'>
                      {group.value.map((transaction: TransactionItem) => (
                        <div
                          key={transaction.id}
                          onClick={() =>
                            handleDrawerTransaction(transaction.id)
                          }
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
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeWithMandate;
