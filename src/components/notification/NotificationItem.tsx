import React from 'react';
import './style.css';
import { type NotificationItemProps } from '../types/notification';
import { ReactComponent as NewNotifIcon } from '../../icons/newNotif.svg';

export const NotificationItem: React.FC<NotificationItemProps> = ({
  icon,
  text,
  date,
  isNew,
}) => {
  return (
    <div className={`notification-item-content ${isNew ? 'new' : ''}`}>
      <div className='notification-icon'>
        {icon}
        {isNew ? (
          <div className='notif-circle'>
            <NewNotifIcon />
          </div>
        ) : null}
      </div>
      <div className='notification-info-section'>
        <span className='date'>{date}</span>
        <span className={`info ${isNew ? 'new' : ''}`}> {text}</span>
      </div>
    </div>
  );
};
