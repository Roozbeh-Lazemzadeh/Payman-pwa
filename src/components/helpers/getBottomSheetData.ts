import { type Payman } from '../Paymans/myPaymans/MyPaymans';
import { type Transaction } from '../transactions/TransactionsList';
import { getFormattedRemainingDays } from './expirationDate';
import { paymanTransDate, transDate } from './transDate';

export const getTransactionDetails = (
  selectedTransaction: Transaction | null
) => {
  if (!selectedTransaction) {
    return [];
  }

  const data = [
    {
      firstWord: 'نام موسسه',
      secondWord: selectedTransaction.creditor,
    },
    {
      firstWord: 'مبلغ تراکنش',
      secondWord: selectedTransaction.transaction_amount + ' ' + 'تومان',
      className: 'direction',
    },
    {
      firstWord: 'تاریخ تراکنش',
      secondWord: transDate(selectedTransaction.transaction_date),
    },
    {
      firstWord: 'نام بانک',
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
      firstWord: 'نام موسسه',
      secondWord: selectedPayman.creditor,
    },
    {
      firstWord: 'بازه قرارداد',
      secondWord: getFormattedRemainingDays(selectedPayman.end_date),
      className: 'direction',
    },
    {
      firstWord: 'سقف تعداد تراکنش',
      secondWord: `${selectedPayman.daily_numbers} تراکنش در روز`,
      className: 'direction',
    },
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
