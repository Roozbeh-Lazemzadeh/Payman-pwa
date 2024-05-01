import React, { useEffect, useState } from 'react';
import useDrawerTransaction from '../hooks/useDrawerTransaction';
import { TransactionCard } from '../shared/Cards/TransactionCards';
import { DetailedDrawer } from '../shared/Drawer/DetailedDrawer';
import { ReactComponent as SuccessfulIcon } from '../../icons/success.svg';
import { ReactComponent as UnsuccessfulIcon } from '../../icons/unsuccess.svg';
import { ReactComponent as UnclearIcon } from '../../icons/unclearStatus.svg';
import { transDate } from '../helpers/transDate';
import { parse } from 'date-fns';
import { useAppSelector } from '../hooks/reduxHooks';
import {
  selectAllFilter,
  selectShowFilterIcon,
} from '../../store/filterPage/transactionFilterSlice';
import './style.css';

interface TransactionsListProps {
  transactionList: Transaction[];
  sortBy: string;
}
interface Transaction {
  id: number;
  creditor: string;
  currency: string;
  source_bank: string;
  status: string;
  transaction_amount: number;
  transaction_date: string;
  transaction_id: string;
  phone_number: string;
  img: string;
  transaction_mag: string;
}

export const TransactionsList: React.FC<TransactionsListProps> = ({
  transactionList,
  sortBy,
}) => {
  const allFilter = useAppSelector(selectAllFilter);
  const [sortedTransactionList, setSortedTransactionList] =
    useState<Transaction[]>(transactionList);
  const {
    isOpen,
    detailedDrawerData,
    handleDrawerTransaction,
    handleCloseDrawer,
    selectedTransactionId,
  } = useDrawerTransaction(sortedTransactionList);
  const isFiltered = useAppSelector(selectShowFilterIcon);

  useEffect(() => {
    sortTransactions();
  }, [sortBy, transactionList, allFilter.date]);

  // temporary it needs to refactor start
  useEffect(() => {
    const sortedList = [...transactionList];

    if (allFilter.price && allFilter.price.length === 2) {
      const [minPrice, maxPrice] = allFilter.price;

      const filteredSortedList = sortedList.filter((transaction) => {
        const transactionAmount = transaction.transaction_amount;
        return transactionAmount >= minPrice && transactionAmount <= maxPrice;
      });

      filteredSortedList.sort(
        (a, b) => b.transaction_amount - a.transaction_amount
      );
      setSortedTransactionList(filteredSortedList);
    } else {
      setSortedTransactionList(transactionList);
    }
  }, [allFilter.price]);

  useEffect(() => {
    const sortedList = [...sortedTransactionList];

    if (allFilter.date && allFilter.date.length === 2) {
      const parsedDates: Date[] = allFilter.date.map((date) =>
        parse(date, 'yy-MMM-dd hh:mm:ss a', new Date())
      );

      // Filter transactions between the specified dates
      const filteredSortedList = sortedList.filter((transaction) => {
        const transactionDate = parse(
          transaction.transaction_date,
          'yy-MMM-dd hh.mm.ss.SSSSSSSSS a',
          new Date()
        );

        return (
          transactionDate >= parsedDates[0] && transactionDate <= parsedDates[1]
        );
      });
      setSortedTransactionList(filteredSortedList);
    }
  }, [allFilter.date]);

  useEffect(() => {
    const sortedList = [...transactionList];

    if (allFilter.merchants && allFilter.merchants.length > 0) {
      const filteredSortedList = sortedList.filter((transaction) =>
        allFilter.merchants.includes(transaction.creditor)
      );
      setSortedTransactionList(filteredSortedList);
    } else {
      setSortedTransactionList(transactionList);
    }
  }, [allFilter.merchants]);

  // temporary it needs to refactor end

  const sortTransactions = () => {
    const sortedList = [...transactionList];

    if (sortBy === '0') {
      sortedList.sort((a, b) => {
        const dateA = parse(
          a.transaction_date,
          'yy-MMM-dd hh.mm.ss.SSSSSSSSS a',
          new Date()
        );
        const dateB = parse(
          b.transaction_date,
          'yy-MMM-dd hh.mm.ss.SSSSSSSSS a',
          new Date()
        );

        // Compare dates
        return dateB.getTime() - dateA.getTime();
      });
    } else if (sortBy === '1') {
      sortedList.sort((a, b) => b.transaction_amount - a.transaction_amount);
    }

    setSortedTransactionList(sortedList);
  };

  return (
    <div className={`trans-list ${isFiltered ? 'active' : null}`}>
      <DetailedDrawer
        isOpen={isOpen && selectedTransactionId !== null}
        setIsOpen={handleCloseDrawer}
        title={'جزئیات بیشتر'}
        data={detailedDrawerData}
      >
        <div className='info-login detail'>
          <div>دلیل نامشخص بودن تراکنش </div>‌
          <div>
            {selectedTransactionId &&
              sortedTransactionList.find(
                (transaction) => transaction.id === selectedTransactionId
              )?.transaction_mag}
          </div>
        </div>
      </DetailedDrawer>
      {sortedTransactionList.map((transaction) => (
        <div
          key={transaction.id}
          onClick={() => handleDrawerTransaction(transaction.id)}
          style={{ direction: 'rtl' }}
        >
          <TransactionCard
            merchant={transaction.creditor}
            price={transaction.transaction_amount}
            transStatus={transaction.status}
            transDate={transDate(transaction.transaction_date)}
            img={transaction.img}
            transStatusIcon={
              transaction.status === 'موفق' ? (
                <SuccessfulIcon />
              ) : transaction.status === 'ناموفق' ? (
                <UnsuccessfulIcon />
              ) : transaction.status === 'نامشخص' ? (
                <UnclearIcon />
              ) : (
                ''
              )
            }
          />
        </div>
      ))}
    </div>
  );
};
