import React from 'react';
import TransactionFilterTag from '../shared/Tags/TransactionFilterTag';
import { useAppSelector } from '../hooks/reduxHooks';
import { selectShowTransactionFilterIcon } from '../../store/filterPage/transactionFilterSlice';

import './style.css';

export const TransactionFilterLabels: React.FC = () => {
  const isFiltered = useAppSelector(selectShowTransactionFilterIcon);

  if (!isFiltered) {
    return null;
  } else {
    return (
      <div className='transaction-filter-list-wrapper'>
        <div className='transaction-filter-item'>
          <TransactionFilterTag />
        </div>
      </div>
    );
  }
};
