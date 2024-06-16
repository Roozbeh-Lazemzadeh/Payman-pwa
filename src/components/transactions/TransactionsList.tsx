import React, { useEffect, useState } from 'react';
import { TransactionCard } from '../shared/Cards/TransactionCards';
import { ReactComponent as SuccessfulIcon } from '../../icons/success.svg';
import { ReactComponent as UnsuccessfulIcon } from '../../icons/unsuccess.svg';
import { ReactComponent as UnclearIcon } from '../../icons/unclearStatus.svg';
import { ReactComponent as EmptyTransactionIcon } from '../../icons/emptyTransaction.svg';
// import { ReactComponent as TransactionSkeletonIcon } from '../../icons/transactionSkeleton.svg';
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
import { getTransactionDetails } from '../helpers/getBottomSheetData';
import SkeletonTransactionsCart from '../skeleton/SkeletonTransactionsCart';

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
  const [isLoading, setIsLoading] = useState(true); // Initial state is loading

  useEffect(() => {
    // Simulate data fetching with a 1000ms delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Clean up the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  const handleDrawerTransaction = (transaction: Transaction) => {
    dispatch(handleSelectedTransaction(transaction));
    dispatch(openBottomSheet());
  };

  return (
    <div
      className={`trans-list ${filterLabelStyle(allFilter)} ${
        Transactions.length === 0 ? 'empty' : ''
      }`}
    >
      <DetailedDrawer
        title={'جزئیات بیشتر'}
        isOpen={isOpen}
        data={getTransactionDetails(selectedTransaction)}
      >
        {selectedTransaction?.transaction_msg.length ? (
          <div className='info-login detail'>
            {selectedTransaction?.status ===
            'موفق' ? null : selectedTransaction?.status === 'ناموفق' ? (
              <div> دلیل ناموفق بودن تراکنش : </div>
            ) : selectedTransaction?.status === 'نامشخص' ? (
              <div> دلیل نامشخص بودن تراکنش : </div>
            ) : (
              ''
            )}
            <div style={{ marginTop: '10px' }}>
              {selectedTransaction?.transaction_msg}
            </div>
          </div>
        ) : null}
      </DetailedDrawer>
      {isLoading ? (
        // Render 10 instances of the TransactionSkeletonIcon when loading
        Array.from({ length: 4 }).map((_, index) => (
          // <div  className='transaction-skeleton-card'>
          //   <TransactionSkeletonIcon />
          // </div>
          <SkeletonTransactionsCart key={index} />
        ))
      ) : Transactions.length > 0 ? (
        Transactions.map((transaction) => (
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
        ))
      ) : (
        <div className='empty-transaction-list'>
          <EmptyTransactionIcon />
          <p>هیچ تراکنشی ثبت نشده است.</p>
        </div>
      )}
    </div>
  );
};
