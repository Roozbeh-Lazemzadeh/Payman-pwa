import React, { useEffect, useState } from 'react';
import jalaliMoment from 'jalali-moment';
import { TransactionCard } from '../shared/Cards/TransactionCards';
import { DetailedDrawer } from '../shared/Drawer/DetailedDrawer';
import { ReactComponent as SuccessfulIcon } from '../../icons/success.svg';
import { ReactComponent as UnsuccessfulIcon } from '../../icons/unsuccess.svg';
import { ReactComponent as UnclearIcon } from '../../icons/unclearStatus.svg';
import { parse, format } from 'date-fns';
import './style.css';

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
  }[];
  sortBy: string;
}

export const TransactionsList: React.FC<TransactionsListProps> = ({
  transactionList,
  sortBy,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [detailedDrawerData, setDetailedDrawerData] = useState<object[]>([]);
  const [sortedTransactionList, setSortedTransactionList] = useState<
    TransactionsListProps['transactionList']
  >([]);

  // const DetailedDrawerArray = [
  //   { nameItem1: 'بانک', nameItem2: 'سامان' },
  //   { nameItem1: 'شماره موبایل', nameItem2: '989385445348+' },
  //   { nameItem1: 'شناسه پیمان', nameItem2: 'Ajdfni830874p39vfndl' },
  // ];

  useEffect(() => {
    sortTransactions();
  }, [sortBy, transactionList]);

  const sortTransactions = () => {
    const sortedList = [...transactionList];

    if (sortBy === '0') {
      sortedList.sort((a, b) => {
        return (
          new Date(b.transaction_date).getTime() -
          new Date(a.transaction_date).getTime()
        );
      });
    } else if (sortBy === '1') {
      sortedList.sort((a, b) => b.transaction_amount - a.transaction_amount);
    }

    setSortedTransactionList(sortedList);
  };

  const UnknownTextInfo: React.FC = () => {
    return (
      <div className='info-login detail'>
        <div>دلیل نامشخص بودن تراکنش :</div>‌
        <div>
          سرویس بانکی شما ( سامان ) در حال حاظر پاسخگو نمی‌باشد . در صورت کم شدن
          موجودی مبلغ شما طی ۴۸ ساعت آینده برای شما واریز میشود .
        </div>
      </div>
    );
  };

  const handleDrawerTransaction = (id: number) => {
    const selectedTransaction = sortedTransactionList.find(
      (transaction) => transaction.id === id
    );
    if (selectedTransaction) {
      const { phone_number, transaction_id, source_bank } = selectedTransaction;
      setIsOpen(!isOpen);
      const detailedDrawerData = [
        { nameItem1: 'بانک', nameItem2: source_bank },
        { nameItem1: 'شماره موبایل', nameItem2: phone_number },
        { nameItem1: 'شناسه پیمان', nameItem2: transaction_id },
      ];
      setDetailedDrawerData(detailedDrawerData);
    }
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
    <div className='trans-list'>
      <DetailedDrawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={'جزئیات بیشتر'}
        data={detailedDrawerData}
      >
        <UnknownTextInfo />
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

{
  /* {transactionList.map((transaction) => (
  <div key={transaction.id}>
    <p>ID: {transaction.id}</p>
    <p>Creditor: {transaction.creditor}</p>
    <p>Currency: {transaction.currency}</p>
    <p>Source Bank: {transaction.source_bank}</p>
    <p>Status: {transaction.status}</p>
    <p>Transaction Amount: {transaction.transaction_amount}</p>
    <p>
      Transaction Date:{' '}
      {moment(transaction.transaction_date, 'DD-MMM-YY HH:mm:ss.SSS A')
        .locale('fa')
        .format('dddd، jYYYY/jMM/jDD- HH:mm')}
    </p>
    <p>Transaction ID: {transaction.transaction_id}</p>
    <p>Phone Number: {transaction.phone_number}</p>
  </div>
))} */
}
