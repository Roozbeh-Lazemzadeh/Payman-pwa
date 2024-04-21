import { useState } from 'react';
import FilterTools from '../components/template/FilterTools';
import { TransactionsList } from '../components/transactions/TransactionsList';
import mock from '../transaction.json';
import './style/style.css';

function TransactionsPage() {
  const [sortBy, setSortBy] = useState<string>('0'); // State variable to manage sort keyNum

  const handleSortChange = (keyNum: string) => {
    setSortBy(keyNum);
  };

  return (
    <div className='transaction-filter'>
      <FilterTools title='تراکنش‌های اخیر' onSortChange={handleSortChange} />
      <TransactionsList transactionList={mock} sortBy={sortBy} />
    </div>
  );
}

export default TransactionsPage;
