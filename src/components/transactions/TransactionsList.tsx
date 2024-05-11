import React from 'react';
import { TransactionCard } from '../shared/Cards/TransactionCards';
import { ReactComponent as SuccessfulIcon } from '../../icons/success.svg';
import { ReactComponent as UnsuccessfulIcon } from '../../icons/unsuccess.svg';
import { ReactComponent as UnclearIcon } from '../../icons/unclearStatus.svg';
import { transDate } from '../helpers/transDate';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import {
  selectAllFilter,
  selectTransactionList,
} from '../../store/filterPage/filterSlice';
import {
  handleSelectedTransaction,
  selectSelectedTransaction,
} from '../../store/transaction/transactionSlice';
import { DetailedDrawer } from '../shared/Drawer/DetailedDrawer';
import {
  openBottomSheet,
  selectBottomSheetIsOpen,
} from '../../store/bottomSheet/bottomSheetSlice';
import { filterLabelStyle } from '../helpers/filterLabelsStyle';

import './style.css';

export interface Transaction {
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
  transaction_msg: string;
}

export const TransactionsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectBottomSheetIsOpen);
  const selectedTransaction = useAppSelector(selectSelectedTransaction);
  const Transactions = useAppSelector(selectTransactionList);
  const allFilter = useAppSelector(selectAllFilter);

  const handleDrawerTransaction = (transaction: Transaction) => {
    dispatch(handleSelectedTransaction(transaction));
    dispatch(openBottomSheet());
  };

  const data = selectedTransaction
    ? [
        { firstWord: 'بانک', secondWord: selectedTransaction.source_bank },
        {
          firstWord: 'شماره موبایل',
          secondWord: selectedTransaction.phone_number,
        },
        {
          firstWord: 'شناسه پیمان',
          secondWord: selectedTransaction.transaction_id,
        },
      ]
    : [];

  return (
    <div className={`trans-list ${filterLabelStyle(allFilter)}`}>
      <DetailedDrawer title={'جزئیات بیشتر'} isOpen={isOpen} data={data}>
        <div className='info-login detail'>
          <div>دلیل نامشخص بودن تراکنش </div>‌
          <div>{selectedTransaction?.transaction_msg}</div>
        </div>
      </DetailedDrawer>
      {Transactions.map((transaction) => (
        <div
          key={transaction.id}
          onClick={() => handleDrawerTransaction(transaction)}
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
