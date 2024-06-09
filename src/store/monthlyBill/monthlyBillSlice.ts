import { createSlice } from '@reduxjs/toolkit';
import { type Month } from '../../pages/HomeWithMandate';
import { type RootState } from '../store';

interface monthlyBillState {
  monthlyBill: string;
  month: Month | null;
}

const initialState: monthlyBillState = {
  month: null,
  monthlyBill: '',
};

const monthlyBillSlice = createSlice({
  name: 'monthly',
  initialState,
  reducers: {
    getMonthBillHandler: (state, action) => {
      state.monthlyBill = action.payload;
    },
    getSelectedMonth: (state, action) => {
      state.month = action.payload;
    },
  },
});
export const selectMonthlyBill = (state: RootState) =>
  state.monthly.monthlyBill;
export const selectSelectedMonth = (state: RootState) => state.monthly.month;

export const { getMonthBillHandler, getSelectedMonth } =
  monthlyBillSlice.actions;

export default monthlyBillSlice.reducer;
