import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type RootState } from '../store';
import { type Transaction } from '../../components/transactions/TransactionsList';

interface TransactionState {
  selectedTransaction: Transaction | null;
}

const initialState: TransactionState = {
  selectedTransaction: null,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    handleSelectedTransaction: (
      state,
      action: PayloadAction<Transaction | null>
    ) => {
      state.selectedTransaction = action.payload;
    },
  },
});

export const { handleSelectedTransaction } = transactionSlice.actions;

export const selectSelectedTransaction = (state: RootState) =>
  state.transaction.selectedTransaction;

export default transactionSlice.reducer;
