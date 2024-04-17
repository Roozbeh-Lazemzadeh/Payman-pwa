import React, { useState } from 'react';
import FilterTools from '../template/FilterTools';
import './style.css';
import { TransactionsList } from './TransactionsList';
import mock from '../../transaction.json';

export const TransactionsFilter: React.FC = () => {
  const [sortBy, setSortBy] = useState<string>(''); // State variable to manage sort criteria

  const handleSortChange = (criteria: string) => {
    setSortBy(criteria);
  };

  return (
    <div className="transaction-filter">
      <FilterTools title="تراکنش‌های اخیر" onSortChange={handleSortChange} />{' '}
      <TransactionsList transactionList={mock} sortBy={sortBy} />{' '}
    </div>
  );
};
