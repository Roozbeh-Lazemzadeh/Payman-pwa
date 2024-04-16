import React from 'react';
import FilterTools from '../template/FilterTools';
import './style.css';
import { TransactionsList } from './TransactionsList';
import mock from '../../transaction.json';

export const TransactionsFilter: React.FC = () => {
  return (
    <div className="transaction-filter">
      <FilterTools title="تراکنش‌های اخیر" />
      <TransactionsList transactionList={mock} />
    </div>
  );
};
