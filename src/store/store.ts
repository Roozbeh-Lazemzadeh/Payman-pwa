import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './sidebar/sidebarSlice';
import notificationReducer from './notification/notificationSlice';
import chartReducer from './chart/chartSlice';
import merchantReducer from './merchant/merchantSlice';
import monthlyBillReducer from './monthlyBill/monthlyBillSlice'; // Corrected import

import filterMenuReducer from './filterMenu/filterMenuSlice';
import filterReducer from './filterPage/filterSlice';

import arrayHomeWithMandateReducer from './arrayHomeWithMandate/arrayHomeWithMandateSlice';
import bottomSheetReducer from './bottomSheet/bottomSheetSlice';
import transactionReducer from './transaction/transactionSlice';

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    notification: notificationReducer,
    chart: chartReducer,
    merchant: merchantReducer,
    monthly: monthlyBillReducer, // Use the correct reducer here

    filterMenu: filterMenuReducer,
    filter: filterReducer,

    arrayHome: arrayHomeWithMandateReducer,
    bottomSheet: bottomSheetReducer,
    transaction: transactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
