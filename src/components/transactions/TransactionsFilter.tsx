import React, { useState } from 'react';
import FilterTools from '../template/FilterTools';
import './style.css';
import { TransactionsList } from './TransactionsList';
import mock from '../../transaction.json';

export const TransactionsFilter: React.FC = () => {
  const [sortBy, setSortBy] = useState<string>(''); // State variable to manage sort criteria

  // Function to handle sorting criteria change
  const handleSortChange = (criteria: string) => {
    setSortBy(criteria);
  };

  return (
    <div className="transaction-filter">
      <FilterTools title="تراکنش‌های اخیر" onSortChange={handleSortChange} />{' '}
      {/* Pass the onSortChange event handler */}
      <TransactionsList transactionList={mock} sortBy={sortBy} />{' '}
      {/* Pass the sortBy prop */}
    </div>
  );
};
