import { type Payman } from '../Paymans/myPaymans/MyPaymans';
import { type Transaction } from '../transactions/TransactionsList';
import { paymanTransDate } from './transDate';

export const getTransactionDetails = (
  selectedTransaction: Transaction | null
) => {
  if (!selectedTransaction) {
    return [];
  }

  const data = [
    {
      firstWord: 'بانک',
      secondWord: selectedTransaction.source_bank,
    },
    {
      firstWord: 'شماره موبایل',
      secondWord: selectedTransaction.phone_number,
    },
    {
      firstWord: 'شناسه پیمان',
      secondWord: selectedTransaction.transaction_id,
    },
  ];

  return data;
};

export const getPaymanDetails = (selectedPayman: Payman | null) => {
  if (!selectedPayman) {
    return [];
  }

  const data = [
    {
      firstWord: 'تاریخ شروع',
      secondWord: paymanTransDate(selectedPayman.start_date),
    },
    {
      firstWord: 'تاریخ پایان',
      secondWord: paymanTransDate(selectedPayman.end_date),
    },
    {
      firstWord: 'بانک مبدا',
      secondWord: selectedPayman.source_bank,
    },
    {
      firstWord: 'شماره موبایل',
      secondWord: selectedPayman.phone_number,
    },
    {
      firstWord: 'شناسه پیمان',
      secondWord: selectedPayman.payman_id,
    },
  ];

  return data;
};
