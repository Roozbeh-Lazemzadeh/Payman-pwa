import { createSlice } from '@reduxjs/toolkit';
import { type RootState } from '../store';

const initialState = {
  isModalOpen: false,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    toggleNotificationModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
  },
});

export const selectNotificationModal = (state: RootState) =>
  state.notification?.isModalOpen;

export const { toggleNotificationModal } = notificationSlice.actions;
export default notificationSlice.reducer;
