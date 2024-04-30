/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { createSlice } from '@reduxjs/toolkit';
import { parse } from 'date-fns';
import { type GroupedTransaction, type TransactionItem } from './types';

// Define the initial state
interface ArrayHomeWithMandateState {
  groupsTransactions: GroupedTransaction[];
}

const initialState: ArrayHomeWithMandateState = {
  groupsTransactions: [],
};

// Create the slice
const arrayHomeWithMandateSlice = createSlice({
  name: 'arrayHomeWithMandate',
  initialState,
  reducers: {
    setArrayHomeWithMandate: (state, action) => {
      // Extract transactions from the action payload
      const transactions: TransactionItem[] = action.payload;

      // Create a Record to hold grouped transactions
      const groupedTransactions: Record<string, TransactionItem[]> = {};

      // Loop through transactions to group them by date
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
        console.log(key);

        if (!groupedTransactions[key]) {
          groupedTransactions[key] = [];
        }

        groupedTransactions[key].push(transaction);
      });

      // Convert groupedTransactions to GroupedTransaction[]
      const groupedArray: GroupedTransaction[] = Object.entries(
        groupedTransactions
      ).map(([key, value]) => ({
        key,
        value,
      }));

      // Sort groupedArray by date in descending order
      groupedArray.sort((a, b) => {
        const dateA = new Date(a.key);
        const dateB = new Date(b.key);
        return dateB.getTime() - dateA.getTime();
      });

      // Update the state with grouped transactions
      state.groupsTransactions = groupedArray;
    },
  },
});

// Extract and export action creator
export const { setArrayHomeWithMandate } = arrayHomeWithMandateSlice.actions;

// Export the reducer
export default arrayHomeWithMandateSlice.reducer;
