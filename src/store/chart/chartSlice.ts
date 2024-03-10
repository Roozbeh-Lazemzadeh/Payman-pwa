import { createSlice } from '@reduxjs/toolkit';
import { type RootState } from '../store';

const initialState = {
  selectedMerchant: 0,
};

export const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    selectMerchant: (state, action) => {
      state.selectedMerchant = action.payload;
    },
  },
});

export const selectSelectedMerchant = (state: RootState) =>
  state.chart?.selectedMerchant;

export const { selectMerchant } = chartSlice.actions;
export default chartSlice.reducer;
