import { createSlice } from "@reduxjs/toolkit";
import { type RootState } from "../store";

const initialState = {
  isFilteredShown: false,
  isSearchedShown: false,
  closingSearchFooter: false,
  searchItem: "",
};

export const footerSlice = createSlice({
  name: "footer",
  initialState,
  reducers: {
    filteredToggle: (state) => {
      state.isFilteredShown = !state.isFilteredShown;
    },
    searchedToggle: (state, action) => {
      state.isSearchedShown = !state.isSearchedShown;
      state.searchItem = action.payload;
    },
    closeSearchFooterToggle: (state) => {
      state.closingSearchFooter = true;
    },
    closeSearchFooterFalse: (state) => {
      state.closingSearchFooter = false;
    },
  },
});

export const selectFilteredFooter = (state: RootState) =>
  state.footer?.isFilteredShown;
export const selectSearchedFooter = (state: RootState) =>
  state.footer?.isSearchedShown;
export const selectCloseSearchFooter = (state: RootState) =>
  state.footer?.closingSearchFooter;
export const selectSelectedSearchItem = (state: RootState) =>
  state.footer?.searchItem;

export const {
  filteredToggle,
  searchedToggle,
  closeSearchFooterToggle,
  closeSearchFooterFalse,
} = footerSlice.actions;
export default footerSlice.reducer;
