import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './sidebar/sidebarSlice';
import notificationReducer from './notification/notificationSlice';
import chartReducer from './chart/chartSlice';
import merchantReducer from './merchant/merchantSlice';
import monthlyBillSlice from './monthlyBill/monthlyBillSlice';

import transactionFilterMenuReducer from './filterMenu/transactionFilterMenuSlice';
import homeFilterMenuReducer from './filterMenu/homeFilterMenuSlice';
import paymanFilterMenuReducer from './filterMenu/paymanFilterMenuSlice';

import transactionFilterReducer from './filterPage/transactionFilterSlice';
import homeFilterReducer from './filterPage/homeFilterSlice';
import paymanFilterReducer from './filterPage/paymanFilterSlice';

import arrayHomeWithMandateReducer from './arrayHomeWithMandate/arrayHomeWithMandateSlice';

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    notification: notificationReducer,
    chart: chartReducer,
    merchant: merchantReducer,
    monthly: monthlyBillSlice,

    transactionFilterMenu: transactionFilterMenuReducer,
    homeFilterMenu: homeFilterMenuReducer,
    paymanFilterMenu: paymanFilterMenuReducer,

    transactionFilter: transactionFilterReducer,
    homeFilter: homeFilterReducer,
    paymanFilter: paymanFilterReducer,

    arrayHome: arrayHomeWithMandateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
