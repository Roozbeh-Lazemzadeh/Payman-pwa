import { createSlice } from '@reduxjs/toolkit';
import { type RootState } from '../store';

const initialState = {
  isFilteredShown: false,
  isSearchedShown: false,
  closingSearchFilter: false,
  searchItem: '',
};

export const filterMenuSlice = createSlice({
  name: 'filterMenu',
  initialState,
  reducers: {
    filteredToggle: (state) => {
      state.isFilteredShown = !state.isFilteredShown;
    },
    searchedToggle: (state, action) => {
      state.isSearchedShown = !state.isSearchedShown;
      state.searchItem = action.payload;
    },
    closeSearchToggle: (state) => {
      state.closingSearchFilter = true;
    },
    closeSearchFalse: (state) => {
      state.closingSearchFilter = false;
    },
  },
});

export const selectFilter = (state: RootState) =>
  state.filterMenu.isFilteredShown;
export const selectSearchedFilter = (state: RootState) =>
  state.filterMenu.isSearchedShown;
export const selectCloseSearchedFilter = (state: RootState) =>
  state.filterMenu.closingSearchFilter;
export const selectSearchItem = (state: RootState) =>
  state.filterMenu.searchItem;

export const {
  filteredToggle,
  searchedToggle,
  closeSearchToggle,
  closeSearchFalse,
} = filterMenuSlice.actions;
export default filterMenuSlice.reducer;
