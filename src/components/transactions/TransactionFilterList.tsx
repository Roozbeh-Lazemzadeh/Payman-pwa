import React from 'react';
import TransactionFilterTag from '../shared/Tags/TransactionFilterTag';

import './style.css';

export const TransactionFilterList: React.FC = () => {
  return (
    <div className='transaction-filter-list-wrapper'>
      <div className='transaction-filter-item'>
        <TransactionFilterTag />
      </div>
    </div>
  );
};
