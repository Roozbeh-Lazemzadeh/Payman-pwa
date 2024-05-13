/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { createSlice } from '@reduxjs/toolkit';
import { parse } from 'date-fns';
import { type GroupedTransaction, type TransactionItem } from './types';

// Define the initial state
interface ArrayHomeWithMandateState {
  transactions: any;
  groupsTransactions: GroupedTransaction[];
}

const initialState: ArrayHomeWithMandateState = {
  groupsTransactions: [],
  transactions: undefined
};

// Create the slice
const arrayHomeWithMandateSlice = createSlice({
  name: 'arrayHomeWithMandate',
  initialState,
  reducers: {
    setArrayHomeWithMandate: (state, action) => {
      const transactions: TransactionItem[] = action.payload;

      const groupedTransactions: Record<string, TransactionItem[]> = {};

      transactions.forEach((transaction) => {
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
      });

      const groupedArray: GroupedTransaction[] = Object.entries(
        groupedTransactions
      ).map(([key, value]) => ({
        key,
        value,
      }));

      groupedArray.sort((a, b) => {
        const dateA = new Date(a.key);
        const dateB = new Date(b.key);
        return dateB.getTime() - dateA.getTime();
      });

      state.groupsTransactions = groupedArray;
    },
  },
});

export const { setArrayHomeWithMandate } = arrayHomeWithMandateSlice.actions;

export default arrayHomeWithMandateSlice.reducer;
