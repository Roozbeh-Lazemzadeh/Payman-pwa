import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { parse } from 'date-fns';
import { type GroupedTransaction, type Transaction } from './types';

// Define the initial state
interface ArrayHomeWithMandateState {
  transactions: Transaction[];
  groupsTransactions: GroupedTransaction[];
}

const initialState: ArrayHomeWithMandateState = {
  groupsTransactions: [],
  transactions: [],
};
interface SetArrayHomeWithMandatePayload {
  transactions: Transaction[];
  sortKey: string;
}

// Create the slice
const arrayHomeWithMandateSlice = createSlice({
  name: 'arrayHomeWithMandate',
  initialState,
  reducers: {
    setArrayHomeWithMandate: (
      state,
      action: PayloadAction<SetArrayHomeWithMandatePayload>
    ) => {
      const { transactions, sortKey } = action.payload;

      const groupedTransactions: Record<string, Transaction[]> = {};

      transactions.forEach((transaction) => {
        const transactionDate = transaction.transaction_date;

        // Check if transaction_date is a string
        if (typeof transactionDate === 'string') {
          const parsedDate = parse(
            transaction.transaction_date,
            'yy-MMM-dd hh.mm.ss.SSSSSSSSS a',
            new Date()
          );
          const date = parsedDate;
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          const key = `${year}-${month}-${day}`;
          if (!groupedTransactions[key]) {
            groupedTransactions[key] = [];
          }

          groupedTransactions[key].push(transaction);
        }
      });

      const groupedArray: GroupedTransaction[] = Object.entries(
        groupedTransactions
      ).map(([key, value]) => ({
        key,
        value,
      }));

      if (sortKey === '0') {
        console.log(groupedArray);
        groupedArray.sort((a, b) => {
          const dateA = new Date(a.key);
          const dateB = new Date(b.key);
          return dateB.getTime() - dateA.getTime();
        });
      } else if (sortKey === '1') {
        groupedArray.sort((a, b) => {
          const sumA = a.value.reduce(
            (acc, transaction) => acc + transaction.transaction_amount,
            0
          );
          const sumB = b.value.reduce(
            (acc, transaction) => acc + transaction.transaction_amount,
            0
          );
          return sumB - sumA;
        });
      }

      return {
        ...state,
        groupsTransactions: groupedArray,
      };
    },
  },
});

export const { setArrayHomeWithMandate } = arrayHomeWithMandateSlice.actions;

export default arrayHomeWithMandateSlice.reducer;
