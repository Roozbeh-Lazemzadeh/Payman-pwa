import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type RootState } from '../store';

// Interface for the filter state
interface FilterState {
  allFilter: {
    merchants: string[];
    date: string[];
    price: number[];
  };
  isFiltered: boolean;
  totalFilterNumber: number;
  datePeriod: string;
}

// Initial state for the filter
const initialState: FilterState = {
  allFilter: {
    merchants: [],
    date: [],
    price: [],
  },
  isFiltered: false,
  totalFilterNumber: 0,
  datePeriod: '',
};

export const transactionFilterSlice = createSlice({
  name: 'transactionFilter',
  initialState,
  reducers: {
    // Handler for merchant filters
    merchantHandler: (state, action: PayloadAction<string[]>) => {
      const newMerchants = action.payload;
      // Limit the number of merchants to 3
      const limitedMerchants = newMerchants.slice(0, 3);

      // Assign the new array of merchants to the state
      state.allFilter.merchants = limitedMerchants;

      // Update isFiltered and totalFilterNumber based on the filter state
      const hasFilters =
        state.allFilter.merchants.length > 0 ||
        state.allFilter.date.length > 0 ||
        state.allFilter.price.length > 0;
      state.isFiltered = hasFilters;
      state.totalFilterNumber =
        state.allFilter.merchants.length +
        (state.allFilter.date.length > 0 ? 1 : 0) +
        (state.allFilter.price.length > 0 ? 1 : 0);
    },

    // Handler for date filters
    dateHandler: (state, action: PayloadAction<string[]>) => {
      const newDates = action.payload;

      // Update isFiltered and totalFilterNumber based on the filter state
      const hasFilters =
        state.allFilter.merchants.length > 0 ||
        newDates.length > 0 ||
        state.allFilter.price.length > 0;
      state.isFiltered = hasFilters;
      state.totalFilterNumber =
        state.allFilter.merchants.length +
        (newDates.length > 0 ? 1 : 0) +
        (state.allFilter.price.length > 0 ? 1 : 0);

      // Assign the new array of dates to the state
      state.allFilter.date = newDates;
    },

    // Handler for setting the date period
    dateQuickAccessHandler: (state, action: PayloadAction<string>) => {
      state.datePeriod = action.payload;
    },

    // Handler for price filters
    priceHandler: (state, action: PayloadAction<number[]>) => {
      const newPrices = action.payload;

      // Update isFiltered and totalFilterNumber based on the filter state
      const hasFilters =
        state.allFilter.merchants.length > 0 ||
        state.allFilter.date.length > 0 ||
        newPrices.length > 0;
      state.isFiltered = hasFilters;
      state.totalFilterNumber =
        state.allFilter.merchants.length +
        (state.allFilter.date.length > 0 ? 1 : 0) +
        (newPrices.length > 0 ? 1 : 0);

      // Assign the new array of prices to the state
      state.allFilter.price = newPrices;
    },

    // Handler for removing all filters
    removeAllFiltersHandler: (state) => {
      state.allFilter.merchants = [];
      state.allFilter.date = [];
      state.allFilter.price = [];
      state.isFiltered = false;
      state.totalFilterNumber = 0;
      state.datePeriod = '';
    },
  },
});

// Selectors for accessing the state
export const selectAllFilter = (state: RootState) =>
  state.transactionFilter?.allFilter;
export const selectShowFilterIcon = (state: RootState) =>
  state.transactionFilter?.isFiltered;
export const selectFilterNumber = (state: RootState) =>
  state.transactionFilter?.totalFilterNumber;
export const selectMerchantsFilterLength = (state: RootState) =>
  state.transactionFilter?.allFilter.merchants.length;
export const selectDatePeriod = (state: RootState) =>
  state.transactionFilter?.datePeriod;

// Export the action creators
export const {
  merchantHandler,
  dateHandler,
  removeAllFiltersHandler,
  priceHandler,
  dateQuickAccessHandler,
} = transactionFilterSlice.actions;

export default transactionFilterSlice.reducer;
