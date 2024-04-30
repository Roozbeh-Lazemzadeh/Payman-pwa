import React from 'react';
import TransactionFilterTag from '../shared/Tags/TransactionFilterTag';
import { useAppSelector } from '../hooks/reduxHooks';

import './style.css';
import { selectShowFilterIcon } from '../../store/filterPage/transactionFilterSlice';

export const TransactionFilterList: React.FC = () => {
  const isFiltered = useAppSelector(selectShowFilterIcon);

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
