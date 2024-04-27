import { createSlice } from '@reduxjs/toolkit';
import { type RootState } from '../store';

const initialState = {
  img: '',
  title: '',
};

export const merchantSlice = createSlice({
  name: 'merchant',
  initialState,
  reducers: {
    merchantDetails: (state, { payload }) => {
      state.img = payload.img;
      state.title = payload.title;
    },
  },
});

export const selectMerchantTitle = (state: RootState) => state.merchant?.title;
export const selectMerchantImg = (state: RootState) => state.merchant?.img;

export const { merchantDetails } = merchantSlice.actions;
export default merchantSlice.reducer;
