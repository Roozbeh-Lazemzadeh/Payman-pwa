import React, { useEffect, useState } from 'react';
import jalaliMoment from 'jalali-moment';
import { TransactionCard } from '../shared/Cards/TransactionCards';
import { DetailedDrawer } from '../shared/Drawer/DetailedDrawer';
import { ReactComponent as SuccessfulIcon } from '../../icons/success.svg';
import { ReactComponent as UnsuccessfulIcon } from '../../icons/unsuccess.svg';
import { ReactComponent as UnclearIcon } from '../../icons/unclearStatus.svg';
import { parse, format } from 'date-fns';
import './style.css';
import useDrawerTransaction from '../hooks/useDrawerTransaction '; // Import the custom hook

interface TransactionsListProps {
  transactionList: {
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
  }[];
  sortBy: string;
}

export const TransactionsList: React.FC<TransactionsListProps> = ({
  transactionList,
  sortBy,
}) => {
  const [sortedTransactionList, setSortedTransactionList] = useState<
    TransactionsListProps['transactionList']
  >([]);
  const {
    isOpen,
    detailedDrawerData,
    handleDrawerTransaction,
    handleCloseDrawer,
    selectedTransactionId,
  } = useDrawerTransaction(sortedTransactionList);

  useEffect(() => {
    sortTransactions();
  }, [sortBy, transactionList]);

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

  return (
    <div className="trans-list">
      <DetailedDrawer
        isOpen={isOpen && selectedTransactionId !== null}
        setIsOpen={handleCloseDrawer}
        title={'جزئیات بیشتر'}
        data={detailedDrawerData}
      >
        <div className="info-login detail">
          <div>{`دلیل نامشخص بودن تراکنش :`}</div>‌
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
