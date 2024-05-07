import { createSlice } from '@reduxjs/toolkit';
import { type RootState } from '../store';

const initialState = {
  isFilteredShown: false,
  isSearchedShown: false,
  closingSearchFilter: false,
  searchItem: '',
  // isSearchingMerchantOpen: false,
};

export const transactionFilterMenuSlice = createSlice({
  name: 'transactionFilterMenu',
  initialState,
  reducers: {
    transactionFilteredToggle: (state) => {
      state.isFilteredShown = !state.isFilteredShown;
    },
    transactionSearchedToggle: (state, action) => {
      state.isSearchedShown = !state.isSearchedShown;
      state.searchItem = action.payload;
    },
    transactionCloseSearchToggle: (state) => {
      state.closingSearchFilter = true;
    },
    transactionCloseSearchFalse: (state) => {
      state.closingSearchFilter = false;
    },
    // handleSearchingMerchantOpen: (state) => {
    //   state.isSearchingMerchantOpen = true;
    // },
    // handleSearchingMerchantClose: (state) => {
    //   state.isSearchingMerchantOpen = false;
    // },
  },
});

export const selectTransactionFilter = (state: RootState) =>
  state.transactionFilterMenu.isFilteredShown;
export const selectTransactionSearchedFilter = (state: RootState) =>
  state.transactionFilterMenu.isSearchedShown;
export const selectTransactionCloseSearchedFilter = (state: RootState) =>
  state.transactionFilterMenu.closingSearchFilter;
export const selectTransactionSearchItem = (state: RootState) =>
  state.transactionFilterMenu.searchItem;
// export const selectSearchingMerchantOpen = (state: RootState) =>
//   state.transactionFilterMenu.isSearchingMerchantOpen;

export const {
  transactionFilteredToggle,
  transactionSearchedToggle,
  transactionCloseSearchToggle,
  transactionCloseSearchFalse,
  // handleSearchingMerchantOpen,
  // handleSearchingMerchantClose,
} = transactionFilterMenuSlice.actions;
export default transactionFilterMenuSlice.reducer;
