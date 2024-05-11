import React from 'react';
import FilterTag from '../shared/Tags/FilterTag';
import { useAppSelector } from '../hooks/reduxHooks';
import { selectShowFilterIcon } from '../../store/filterPage/filterSlice';

import './style.css';

export const TransactionFilterLabels: React.FC = () => {
  const isFiltered = useAppSelector(selectShowFilterIcon);

  if (!isFiltered) {
    return null;
  } else {
    return (
      <div className='transaction-filter-list-wrapper'>
        <div className='transaction-filter-item'>
          <FilterTag />
        </div>
      </div>
    );
  }
};
