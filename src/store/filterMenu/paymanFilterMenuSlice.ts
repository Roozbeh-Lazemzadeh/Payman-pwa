import { createSlice } from '@reduxjs/toolkit';
import { type RootState } from '../store';

const initialState = {
  isFilteredShown: false,
  isSearchedShown: false,
  closingSearchFilter: false,
  searchItem: '',
};

export const paymanFilterMenuSlice = createSlice({
  name: 'paymanFilterMenu',
  initialState,
  reducers: {
    paymanFilteredToggle: (state) => {
      state.isFilteredShown = !state.isFilteredShown;
    },
    paymanSearchedToggle: (state, action) => {
      state.isSearchedShown = !state.isSearchedShown;
      state.searchItem = action.payload;
    },
    paymanCloseSearchToggle: (state) => {
      state.closingSearchFilter = true;
    },
    paymanCloseSearchFalse: (state) => {
      state.closingSearchFilter = false;
    },
  },
});

export const selectPaymanFilter = (state: RootState) =>
  state.paymanFilterMenu?.isFilteredShown;
export const selectPaymanSearchedFilter = (state: RootState) =>
  state.paymanFilterMenu?.isSearchedShown;
export const selectPaymanCloseSearchedFilter = (state: RootState) =>
  state.paymanFilterMenu?.closingSearchFilter;
export const selectPaymanSearchItem = (state: RootState) =>
  state.paymanFilterMenu?.searchItem;

export const {
  paymanFilteredToggle,
  paymanSearchedToggle,
  paymanCloseSearchToggle,
  paymanCloseSearchFalse,
} = paymanFilterMenuSlice.actions;
export default paymanFilterMenuSlice.reducer;
