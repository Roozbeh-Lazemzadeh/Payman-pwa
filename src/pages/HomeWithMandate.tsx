import React, { useEffect, useMemo, useState } from 'react';
import { MerchantChartSection } from '../components/chart/MerchantChartSection';
import FilterTools from '../components/template/FilterTools';
import { TransactionHomeCard } from '../components/shared/Cards/TransactionHomeCards';
import jalaliMoment from 'jalali-moment';
import { format, parse } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMonthBillHandler,
  getSelectedMonth,
  selectMonthlyBill,
} from '../store/monthlyBill/monthlyBillSlice';
import { setArrayHomeWithMandate } from '../store/arrayHomeWithMandate/arrayHomeWithMandateSlice';
import { type RootState } from '../store/store';
import { type Transaction } from '../store/arrayHomeWithMandate/types';
import { transDate } from '../components/helpers/transDate';
import { TransactionFilterLabels } from '../components/transactions/TransactionFilterLabels';
import { filterLabelStyle } from '../components/helpers/filterLabelsStyle';
import { useAppSelector } from '../components/hooks/reduxHooks';
import {
  removeAllFiltersHandler,
  selectAllFilter,
  selectSortKey,
  selectTransactionList,
} from '../store/filterPage/filterSlice';
import { DetailedDrawer } from '../components/shared/Drawer/DetailedDrawer';
import {
  handleSelectedTransaction,
  selectSelectedTransaction,
} from '../store/transaction/transactionSlice';
import {
  openBottomSheet,
  selectBottomSheetIsOpen,
} from '../store/bottomSheet/bottomSheetSlice';
import { getTransactionDetails } from '../components/helpers/getBottomSheetData';
import { ReactComponent as EmptyMandateIcon } from '../icons/emptyMandate.svg';
import { ReactComponent as EmptyTransactionIcon } from '../icons/emptySmallTransaction.svg';
import SkeletonTransactionsCart from '../components/skeleton/SkeletonTransactionsCart';
import SkeletonChart from '../components/skeleton/SkeletonChart';

export interface Month {
  id: number;
  year: string;
  month: string;
  firstDayOfMonth: string;
  lastDayOfMonth: string;
  todayDate: string;
}

function HomeWithMandate() {
  const dispatch = useDispatch();
  const allFilter = useAppSelector(selectAllFilter);
  const sortKey = useAppSelector(selectSortKey);
  const monthBillValue = useAppSelector(selectMonthlyBill);
  const Transactions = useAppSelector(selectTransactionList);
  const isOpen = useAppSelector(selectBottomSheetIsOpen);
  const selectedTransaction = useAppSelector(selectSelectedTransaction);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true); // Initial state is loading
  const groupedTransactions = useSelector(
    (state: RootState) => state.arrayHome.groupsTransactions
  );
  const memoizedDate = useMemo(() => allFilter.date, [allFilter.date]);
  const memoizedMerchants = useMemo(
    () => allFilter.merchants,
    [allFilter.merchants]
  );
  const memoizedPrice = useMemo(() => allFilter.price, [allFilter.price]);

  const monthsList: Month[] = [];
  const monthsList2: string[] = [];
  const today = jalaliMoment().locale('fa').toISOString();

  for (let i = 0; i < 6; i++) {
    const currentDate = jalaliMoment();
    const pastDate = currentDate.subtract(i, 'jMonth');
    monthsList.push({
      id: i,
      year: pastDate.locale('fa').format('jYY'),
      month: pastDate.locale('fa').format('jMMMM'),
      firstDayOfMonth: pastDate.locale('fa').startOf('jMonth').toISOString(),
      lastDayOfMonth: pastDate.locale('fa').endOf('jMonth').toISOString(),
      todayDate: today,
    });
    monthsList2.push(pastDate.format('jYYYY/jMM'));
  }

  const getCurrentJalaliDate = () => {
    const currentDate = jalaliMoment();
    const formattedDate = currentDate.locale('fa').format('jD jMMMM');
    return `امروز، ${formattedDate}`;
  };

  const handleItemClick = (id: number) => {
    dispatch(removeAllFiltersHandler());
    setSelectedItemIndex(id === selectedItemIndex ? selectedItemIndex : id);
    const selectedMonth = monthsList.find((item) => item.id === id);
    if (selectedMonth) {
      const selectedYearMonth = monthsList2[selectedMonth.id];
      dispatch(getMonthBillHandler(selectedYearMonth));
      dispatch(getSelectedMonth(selectedMonth));
    }
  };

  useEffect(() => {
    if (Transactions) {
      dispatch(
        setArrayHomeWithMandate({
          transactions: Transactions,
          sortKey,
          monthBillValue,
        })
      );
    }
  }, [memoizedDate, memoizedMerchants, memoizedPrice, sortKey, monthBillValue]);

  const handleDrawerTransaction = (transaction: Transaction) => {
    dispatch(handleSelectedTransaction(transaction));
    dispatch(openBottomSheet());
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='home-wrapper'>
      <div className='home-datepickers'>
        <DetailedDrawer
          title={'جزئیات بیشتر'}
          isOpen={isOpen}
          data={getTransactionDetails(selectedTransaction)}
        ></DetailedDrawer>
        {monthsList.reverse().map((item) => (
          <div
            className={`home-datepicker ${
              item.id === selectedItemIndex ? 'home-datepicker-click' : ''
            }`}
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            onTouchMove={() => {}}
          >
            <span className='home-datepicker-num'>{item.year}</span>
            <span className='home-datepicker-p'>{item.month}</span>
          </div>
        ))}
      </div>
      <div className='small-display'>
        {groupedTransactions.length === 0 &&
        allFilter.date.length === 0 &&
        allFilter.merchants.length === 0 &&
        allFilter.price.length === 0 ? (
          <>
            <div className='empty-mandate-section'>
              <span>کل پرداخت های شما در این ماه</span>
              <div className='empty-mandate-wrapper'>
                <EmptyMandateIcon />
                <p>هیچ اطلاعاتی یافت نشد.</p>
              </div>
            </div>
            <div className='empty-mandate-section lower-half'>
              <span>تراکنش‌های پرداخت مستقیم</span>
              <div className='empty-mandate-wrapper lower-half'>
                <EmptyTransactionIcon />
                <p>هیچ تراکنشی ثبت نشده است.</p>
              </div>
            </div>
          </>
        ) : (
          <>
            {groupedTransactions.length === 0 ? (
              <div className='empty-mandate-section'>
                <span>کل پرداخت های شما در این ماه</span>
                <div className='empty-mandate-wrapper'>
                  <EmptyMandateIcon />
                  <p>هیچ اطلاعاتی یافت نشد.</p>
                </div>
              </div>
            ) : isLoading ? (
              <SkeletonChart /> // Assuming SkeletonChart is imported and exists
            ) : (
              <MerchantChartSection />
            )}
            <FilterTools title='تراکنش‌های پرداخت مستقیم' />
            <TransactionFilterLabels />
            {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <SkeletonTransactionsCart key={index} />
              ))
            ) : (
              <div className='TransactionHomeCard-wrapper'>
                <div
                  className={`TransactionHomeCard ${filterLabelStyle(
                    allFilter
                  )}`}
                >
                  <div className='TransactionHomeCard-wrapper-cards'>
                    {groupedTransactions.length === 0 ? (
                      <>
                        <div className='empty-mandate-section lower-half'>
                          <div className='empty-mandate-wrapper lower-half'>
                            <EmptyTransactionIcon />
                            <p>هیچ تراکنشی ثبت نشده است.</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      groupedTransactions?.map(
                        (group: {
                          key: React.Key | null | undefined;
                          value: Transaction[];
                        }) => {
                          return (
                            <div
                              key={group.key}
                              className='TransactionHomeCard-wrapper'
                            >
                              <p className='TransactionHomeCard-p'>
                                {group.value[0].transaction_date.startsWith(
                                  format(new Date(), 'dd-MMM-yy').toUpperCase()
                                )
                                  ? getCurrentJalaliDate()
                                  : `${jalaliMoment(
                                      format(
                                        parse(
                                          group.value[0].transaction_date,
                                          'dd-MMM-yy hh.mm.ss.SSSSSSSSSS a',
                                          new Date()
                                        ),
                                        'yyyy-MM-dd HH:mm:ss'
                                      )
                                    )
                                      .locale('fa')
                                      .format('dddd ، jD jMMMM')}`}
                              </p>
                              <div className='TransactionHomeCard-wrapper-cards'>
                                {group.value.map((transaction: Transaction) => (
                                  <div
                                    key={transaction.id}
                                    onClick={() =>
                                      handleDrawerTransaction(transaction)
                                    }
                                  >
                                    <TransactionHomeCard
                                      merchant={transaction.creditor}
                                      price={transaction.transaction_amount}
                                      transDate={transDate(
                                        transaction.transaction_date
                                      )}
                                      img={transaction.img}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        }
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default HomeWithMandate;
