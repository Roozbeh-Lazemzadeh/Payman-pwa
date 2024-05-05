import FilterTools from '../components/template/FilterTools';
import { TransactionsList } from '../components/transactions/TransactionsList';
import { TransactionFilterLabels } from '../components/transactions/TransactionFilterLabels';
import './style/style.css';

function TransactionsPage() {
  return (
    <>
      <div className='transaction-filter'>
        <FilterTools title='تراکنش‌های اخیر' />
        <TransactionFilterLabels />
      </div>
      <TransactionsList />
    </>
  );
}

export default TransactionsPage;
