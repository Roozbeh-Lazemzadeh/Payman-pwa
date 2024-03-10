import { createSlice } from '@reduxjs/toolkit';
import { type RootState } from '../store';

const initialState = {
  isOpen: false,
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const selectSidebar = (state: RootState) => state.sidebar?.isOpen;

export const { toggle } = sidebarSlice.actions;
export default sidebarSlice.reducer;
