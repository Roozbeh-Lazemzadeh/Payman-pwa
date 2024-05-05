import { createSlice } from '@reduxjs/toolkit';
import { type RootState } from '../store';

interface BottomSheetState {
  isOpen: boolean;
}

const initialState: BottomSheetState = {
  isOpen: false,
};

const bottomSheetSlice = createSlice({
  name: 'bottomSheet',
  initialState,
  reducers: {
    openBottomSheet: (state) => {
      state.isOpen = true;
    },
    closeBottomSheet: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openBottomSheet, closeBottomSheet } = bottomSheetSlice.actions;

export const selectBottomSheetIsOpen = (state: RootState) =>
  state.bottomSheet.isOpen;

export default bottomSheetSlice.reducer;
