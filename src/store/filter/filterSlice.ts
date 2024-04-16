import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type RootState } from '../store';

interface filterProp {
  title: string;
  id: number;
}
interface FilterState {
  allFilter: {
    merchants: filterProp[];
    date: Date[]; // Assuming 'date' will store Date objects
    price: number[]; // Assuming 'price' will store numbers
  };
  isFiltered: boolean;
  filterNumber: number;
}

const initialState: FilterState = {
  allFilter: {
    merchants: [],
    date: [],
    price: [],
  },
  isFiltered: false,
  filterNumber: 0,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    allFilterHandler: (state, action: PayloadAction<filterProp[]>) => {
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
  },
});

export const selectAllFilter = (state: RootState) => state.filter?.allFilter;
export const selectShowFilterIcon = (state: RootState) =>
  state.filter?.isFiltered;
export const selectFilterNumber = (state: RootState) =>
  state.filter?.filterNumber;

export const { allFilterHandler } = filterSlice.actions;
export default filterSlice.reducer;
