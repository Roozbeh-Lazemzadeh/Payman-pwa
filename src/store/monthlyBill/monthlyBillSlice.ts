import { createSlice } from '@reduxjs/toolkit';
import { type RootState } from '../store';

interface monthlyBillState {
  monthlyBill: string;
}

const initialState: monthlyBillState = {
  monthlyBill: '',
};

const monthlyBillSlice = createSlice({
  name: 'monthly',
  initialState,
  reducers: {
    getMonthBillHandler: (state, action) => {
      state.monthlyBill = action.payload;
    },
  },
});
export const selectMonthlyBill = (state: RootState) =>
  state.monthly.monthlyBill;

export const { getMonthBillHandler } = monthlyBillSlice.actions;

export default monthlyBillSlice.reducer;
