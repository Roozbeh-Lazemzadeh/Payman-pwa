import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type RootState } from '../store';
import { type Payman } from '../../components/Paymans/myPaymans/MyPaymans';

interface PaymanState {
  selectedPayman: Payman | null;
}

const initialState: PaymanState = {
  selectedPayman: null,
};

const paymanSlice = createSlice({
  name: 'payman',
  initialState,
  reducers: {
    handleSelectedPayman: (state, action: PayloadAction<Payman | null>) => {
      state.selectedPayman = action.payload;
    },
  },
});

export const { handleSelectedPayman } = paymanSlice.actions;

export const selectSelectedPayman = (state: RootState) =>
  state.payman.selectedPayman;

export default paymanSlice.reducer;
