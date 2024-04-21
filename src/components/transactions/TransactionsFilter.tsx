import React, { useState } from 'react';
import FilterTools from '../template/FilterTools';
import './style.css';
import { TransactionsList } from './TransactionsList';
import mock from '../../transaction.json';

export const TransactionsFilter: React.FC = () => {
  const [sortBy, setSortBy] = useState<string>('0'); // State variable to manage sort keyNum

  const handleSortChange = (keyNum: string) => {
    setSortBy(keyNum);
  };

  return (
    <div className="transaction-filter">
      <FilterTools title="تراکنش‌های اخیر" onSortChange={handleSortChange} />{' '}
      <TransactionsList transactionList={mock} sortBy={sortBy} />{' '}
    </div>
  );
};
