import {
  createSelector,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { isAfter, parse } from 'date-fns';
import { type Payman } from '../../components/Paymans/myPaymans/MyPaymans';
import { type RootState } from '../store';
import { type Transaction } from '../../components/transactions/TransactionsList';
import transactions from '../../data/transaction.json';
import paymans from '../../data/payman.json';

// Interface for the filter state
interface FilterState {
  allFilter: {
    merchants: string[];
    date: string[];
    endingDate: string[];
    price: number[];
  };
  isFiltered: boolean;
  totalFilterNumber: number;
  datePeriod: string;
  transactionList: Transaction[];
  paymanList: Payman[];
  sortKey: string;
}

// Initial state for the filter
const initialState: FilterState = {
  allFilter: {
    merchants: [],
    date: [],
    endingDate: [],
    price: [],
  },
  isFiltered: false,
  totalFilterNumber: 0,
  datePeriod: '',
  transactionList: transactions,
  paymanList: paymans,
  sortKey: '0',
};

export const filterSlice = createSlice({
  name: 'filter',
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
        state.allFilter.endingDate.length > 0 ||
        state.allFilter.price.length > 0;
      state.isFiltered = hasFilters;
      state.totalFilterNumber =
        state.allFilter.merchants.length +
        (state.allFilter.date.length > 0 ||
        state.allFilter.endingDate.length > 0
          ? 1
          : 0) +
        (state.allFilter.price.length > 0 ? 1 : 0);
    },

    // Handler for date filters
    dateHandler: (state, action: PayloadAction<string[]>) => {
      const newDates = action.payload;

      // Update isFiltered and totalFilterNumber based on the filter state
      const hasFilters =
        state.allFilter.merchants.length > 0 ||
        state.allFilter.endingDate.length > 0 ||
        newDates.length > 0 ||
        state.allFilter.price.length > 0;
      state.isFiltered = hasFilters;
      state.totalFilterNumber =
        state.allFilter.merchants.length +
        (newDates.length > 0 || state.allFilter.endingDate.length > 0 ? 1 : 0) +
        (state.allFilter.price.length > 0 ? 1 : 0);

      // Assign the new array of dates to the state
      state.allFilter.date = newDates;
    },

    endingDateHandler: (state, action: PayloadAction<string[]>) => {
      const newDates = action.payload;
      // Update isFiltered and totalFilterNumber based on the filter state
      const hasFilters =
        state.allFilter.merchants.length > 0 ||
        state.allFilter.date.length > 0 ||
        newDates.length > 0 ||
        state.allFilter.price.length > 0;
      state.isFiltered = hasFilters;
      state.totalFilterNumber =
        state.allFilter.merchants.length +
        (newDates.length > 0 || state.allFilter.date.length > 0 ? 1 : 0) +
        (state.allFilter.price.length > 0 ? 1 : 0);

      // Assign the new array of dates to the state
      state.allFilter.endingDate = newDates;
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
        state.allFilter.endingDate.length > 0 ||
        newPrices.length > 0;
      state.isFiltered = hasFilters;
      state.totalFilterNumber =
        state.allFilter.merchants.length +
        (state.allFilter.date.length > 0 ||
        state.allFilter.endingDate.length > 0
          ? 1
          : 0) +
        (newPrices.length > 0 ? 1 : 0);

      // Assign the new array of prices to the state
      state.allFilter.price = newPrices;
    },

    // Handler for removing all filters
    removeAllFiltersHandler: (state) => {
      state.allFilter.merchants = [];
      state.allFilter.date = [];
      state.allFilter.endingDate = [];
      state.allFilter.price = [];
      state.isFiltered = false;
      state.totalFilterNumber = 0;
      state.datePeriod = '';
      state.transactionList = transactions;
      state.paymanList = paymans;
    },
    // Handler for transactions filtering
    transactionsFiltering: (
      state,
      action: PayloadAction<{
        merchants?: string[];
        prices?: number[];
        dates?: string[];
      }>
    ) => {
      const { merchants, prices, dates } = action.payload;
      const { allFilter } = state;
      let filteredList = transactions;
      const merchantsToFilter = merchants ?? allFilter.merchants;
      const pricesToFilter = prices ?? allFilter.price;
      const datesToFilter = dates ?? allFilter.date;

      // filtering based on merchants
      if (merchantsToFilter.length > 0) {
        filteredList = filteredList.filter((transaction) =>
          merchantsToFilter.includes(transaction.creditor)
        );
      }

      // filtering based on prices
      if (pricesToFilter.length > 0 && pricesToFilter.length === 2) {
        const [minPrice, maxPrice] = pricesToFilter;

        filteredList = filteredList.filter((transaction) => {
          const transactionAmount = transaction.transaction_amount;
          return transactionAmount >= minPrice && transactionAmount <= maxPrice;
        });

        filteredList.sort(
          (a, b) => b.transaction_amount - a.transaction_amount
        );
      }

      // filtering based on dates
      if (datesToFilter.length > 0 && datesToFilter.length === 2) {
        const parsedDates: Date[] = datesToFilter.map((date) =>
          parse(date, 'dd-MMM-yy hh:mm:ss a', new Date())
        );

        // Filter transactions between the specified dates
        filteredList = filteredList.filter((transaction) => {
          const transactionDate = parse(
            transaction.transaction_date,
            'dd-MMM-yy hh.mm.ss.SSSSSSSSS a',
            new Date()
          );

          return (
            transactionDate >= parsedDates[0] &&
            transactionDate <= parsedDates[1]
          );
        });
      }
      state.transactionList = filteredList;
    },
    // Handler for paymans filtering
    paymansFiltering: (
      state,
      action: PayloadAction<{
        merchants?: string[];
        prices?: number[];
        dates?: string[];
        endingDate?: string[];
      }>
    ) => {
      const { merchants, prices, dates, endingDate } = action.payload;
      const { allFilter } = state;
      let filteredList = paymans;
      const merchantsToFilter = merchants ?? allFilter.merchants;
      const pricesToFilter = prices ?? allFilter.price;
      const datesToFilter = dates ?? allFilter.date;
      const endingDatesToFilter = endingDate ?? allFilter.endingDate;

      // filtering based on merchants
      if (merchantsToFilter.length > 0) {
        filteredList = filteredList.filter((payman) =>
          merchantsToFilter.includes(payman.creditor)
        );
      }

      // filtering based on prices
      if (pricesToFilter.length > 0 && pricesToFilter.length === 2) {
        const [minPrice, maxPrice] = pricesToFilter;

        filteredList = filteredList.filter((payman) => {
          const paymanAmount = payman.daily_amount;
          return paymanAmount >= minPrice && paymanAmount <= maxPrice;
        });

        filteredList.sort((a, b) => b.daily_amount - a.daily_amount);
      }

      // filtering based on dates
      if (datesToFilter.length > 0 || endingDatesToFilter.length > 0) {
        const parsedDates: Date[] = datesToFilter.map(
          (date) => new Date(date.split(' ')[0])
        );

        const parseEndingDates: Date[] = endingDatesToFilter.map(
          (date) => new Date(date.split(' ')[0])
        );

        // Filter transactions between the specified dates
        filteredList = filteredList.filter((payman) => {
          const paymanDate = new Date(payman.start_date.split(' ')[0]);
          const paymanEndingDate = new Date(payman.end_date.split(' ')[0]);

          return (
            (paymanDate >= parsedDates[0] && paymanDate <= parsedDates[1]) ||
            (paymanEndingDate >= parseEndingDates[0] &&
              paymanEndingDate <= parseEndingDates[1])
          );
        });
      }
      state.paymanList = filteredList;
    },
    handleSortKey: (state, action: PayloadAction<string>) => {
      state.sortKey = action.payload;
    },
  },
});

// Selectors for accessing the state
export const selectAllFilter = (state: RootState) => state.filter.allFilter;
export const selectShowFilterIcon = (state: RootState) =>
  state.filter.isFiltered;
export const selectFilterNumber = (state: RootState) =>
  state.filter.totalFilterNumber;
export const selectMerchantsFilterLength = (state: RootState) =>
  state.filter.allFilter.merchants.length;
export const selectDatePeriod = (state: RootState) => state.filter.datePeriod;
export const selectSortKey = (state: RootState) => state.filter.sortKey;

const selectTransactionList = (state: RootState) =>
  state.filter.transactionList;
const selectPaymanList = (state: RootState) => state.filter.paymanList;

// Memoized selector for sorting the transaction list
const selectTransactionListSorted = createSelector(
  [selectTransactionList, selectSortKey],
  (transactionList, sortKey) => {
    if (sortKey === '0') {
      const sortedList = [...transactionList];
      sortedList.sort((a, b) => {
        const dateA = parse(
          a.transaction_date,
          'dd-MMM-yy hh.mm.ss.SSSSSSSSS a',
          new Date()
        );
        const dateB = parse(
          b.transaction_date,
          'dd-MMM-yy hh.mm.ss.SSSSSSSSS a',
          new Date()
        );

        // Compare dates using isAfter from date-fns
        return isAfter(dateB, dateA) ? 1 : -1;
      });

      return sortedList;
    } else if (sortKey === '1') {
      const sortedList = [...transactionList];
      sortedList.sort((a, b) => b.transaction_amount - a.transaction_amount);
      return sortedList;
    }

    return transactionList;
  }
);

// Memoized selector for sorting the payman list
const selectPaymanListSorted = createSelector(
  [selectPaymanList],
  (paymanList) => {
    const sortedList = [...paymanList];
    sortedList.sort((a, b) => {
      const currentDate = new Date();
      const dateA = parse(
        a.end_date,
        'dd-MMM-yy hh.mm.ss.SSSSSSSSS a',
        new Date()
      );
      const dateB = parse(
        b.end_date,
        'dd-MMM-yy hh.mm.ss.SSSSSSSSS a',
        new Date()
      );

      // If both end_dates are before the current date, sort in descending order
      if (dateA < currentDate && dateB < currentDate) {
        return dateB.getTime() - dateA.getTime();
      } else {
        // If both end_dates are after or equal to the current date, sort in ascending order
        return dateA.getTime() - dateB.getTime();
      }
    });
    return sortedList;
  }
);
export {
  selectTransactionListSorted as selectTransactionList,
  selectPaymanListSorted as selectPaymanList,
};

export const {
  merchantHandler,
  dateHandler,
  removeAllFiltersHandler,
  priceHandler,
  dateQuickAccessHandler,
  transactionsFiltering,
  handleSortKey,
  endingDateHandler,
  paymansFiltering,
} = filterSlice.actions;

export default filterSlice.reducer;
