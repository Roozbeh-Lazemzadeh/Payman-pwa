import { type Transaction } from '../transactions/TransactionsList';

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
