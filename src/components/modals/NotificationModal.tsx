import { Modal } from 'antd';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import {
  selectNotificationModal,
  toggleNotificationModal,
} from '../../store/notification/notificationSlice';
import Notification from '../notification/Notification';
import './style.css';

export const NotificationModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector(selectNotificationModal);

  const handleCancel = () => {
    dispatch(toggleNotificationModal());
  };
  const modalTitle = (
    <div className='notification-modal-title-content'>
      <span>پیام ها</span>
      <span>خواندن همه</span>
    </div>
  );
  return (
    <Modal
      className='notification-modal'
      title={modalTitle}
      open={isModalOpen}
      footer={null}
      onCancel={handleCancel}
      closeIcon={false}
    >
      {/* <div className="empty-notification-content">
        <img
          src="/assets/pics/EmptyNotification.png"
          alt="Empty Notification"
        />
        <span>شما هیچ پیامی دریافت نکردید.</span>
      </div> */}
      <Notification />
    </Modal>
  );
};
