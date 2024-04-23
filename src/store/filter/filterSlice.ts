import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type RootState } from '../store';

interface FilterState {
  allFilter: {
    merchants: string[];
    date: string[]; // Assuming 'date' will store Date objects
    price: number[]; // Assuming 'price' will store numbers
  };
  isFiltered: boolean;
  filterNumber: number;
  datePeriod: string;
}

const initialState: FilterState = {
  allFilter: {
    merchants: [],
    date: [],
    price: [],
  },
  isFiltered: false,
  filterNumber: 0,
  datePeriod: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    merchantHandler: (state, action: PayloadAction<string[]>) => {
      const newMerchants = action.payload;

      // Assign the new array of merchants directly to the state
      state.allFilter.merchants = newMerchants;

      if (state.allFilter.merchants.length === 0) {
        state.isFiltered = false;
      } else {
        state.isFiltered = true;
        state.filterNumber = state.allFilter.merchants.length;
      }
    },
    dateHandler: (state, action: PayloadAction<string[]>) => {
      const stringDates = action.payload;
      state.allFilter.date = stringDates;
    },
    dateQuickAccessHandler: (state, action: PayloadAction<string>) => {
      state.datePeriod = action.payload;
    },
    removeAllFiltersHandler: (state) => {
      state.allFilter.merchants = [];
      state.allFilter.date = [];
      state.allFilter.price = [];
      state.isFiltered = false;
      state.filterNumber = 0;
    },
  },
});

export const selectAllFilter = (state: RootState) => state.filter?.allFilter;
export const selectShowFilterIcon = (state: RootState) =>
  state.filter?.isFiltered;
export const selectFilterNumber = (state: RootState) =>
  state.filter?.filterNumber;
export const selectMerchantsFilterLength = (state: RootState) =>
  state.filter?.allFilter.merchants.length;
export const selectDatePeriod = (state: RootState) => state.filter?.datePeriod;

export const {
  merchantHandler,
  dateHandler,
  removeAllFiltersHandler,
  dateQuickAccessHandler,
} = filterSlice.actions;
export default filterSlice.reducer;
