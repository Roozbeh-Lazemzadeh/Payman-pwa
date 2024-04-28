import { createSlice } from '@reduxjs/toolkit';
import { type RootState } from '../store';

const initialState = {
  isFilteredShown: false,
  isSearchedShown: false,
  closingSearchFooter: false,
  searchItem: '',
};

export const homeFilterMenuSlice = createSlice({
  name: 'homeFilterMenu',
  initialState,
  reducers: {
    homeFilteredToggle: (state) => {
      state.isFilteredShown = !state.isFilteredShown;
    },
    homeSearchedToggle: (state, action) => {
      state.isSearchedShown = !state.isSearchedShown;
      state.searchItem = action.payload;
    },
    homeCloseSearchToggle: (state) => {
      state.closingSearchFooter = true;
    },
    homeCloseSearchFalse: (state) => {
      state.closingSearchFooter = false;
    },
  },
});

export const selectHomeFilter = (state: RootState) =>
  state.homeFilterMenu?.isFilteredShown;
export const selectHomeSearchedFilter = (state: RootState) =>
  state.homeFilterMenu?.isSearchedShown;
export const selectHomeCloseSearchedFilter = (state: RootState) =>
  state.homeFilterMenu?.closingSearchFooter;
export const selectHomeSearchItem = (state: RootState) =>
  state.homeFilterMenu?.searchItem;

export const {
  homeFilteredToggle,
  homeSearchedToggle,
  homeCloseSearchToggle,
  homeCloseSearchFalse,
} = homeFilterMenuSlice.actions;
export default homeFilterMenuSlice.reducer;
