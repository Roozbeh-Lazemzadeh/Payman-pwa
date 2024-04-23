import { createSlice } from '@reduxjs/toolkit';

interface monthlyBillState {
  monthlyBill: string;
}

const initialState: monthlyBillState = {
  monthlyBill: '',
};

const monthlyBillSlice = createSlice({
  name: 'monthlyBill',
  initialState,
  reducers: {
    // getMonthBillHandler: (state, action) => {
    //   const newMonthBill = action.payload;
    // },
  },
});

// export const { getMonthBillHandler } = monthlyBillSlice.actions;

export default monthlyBillSlice.reducer;
