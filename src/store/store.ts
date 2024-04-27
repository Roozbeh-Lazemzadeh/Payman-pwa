import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './sidebar/sidebarSlice';
import footerReducer from './footer/footerSlice';
import notificationReducer from './notification/notificationSlice';
import chartReducer from './chart/chartSlice';
import merchantReducer from './merchant/merchantSlice';
import filterReducer from './filter/filterSlice';
import monthlyBillSlice from './monthlyBill/monthlyBillSlice';

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    footer: footerReducer,
    notification: notificationReducer,
    chart: chartReducer,
    merchant: merchantReducer,
    filter: filterReducer,
    monthly: monthlyBillSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
