import React from 'react';
import { Layout } from 'antd';
import { ReactComponent as BorderedNotificationIcon } from '../../icons/borderedNotification.svg';
import { ReactComponent as BorderedSideBarIcon } from '../../icons/borderedHamburgerMenu.svg';
import { ReactComponent as NotificationIcon } from '../../icons/notification.svg';
import { ReactComponent as SideBarIcon } from '../../icons/HamburgerMenu.svg';

import './style.css';
import { useAppDispatch } from '../hooks/reduxHooks';
import { toggleSidebar } from '../../store/sidebar/sidebarSlice';
import { NotificationModal } from '../modals/NotificationModal';
import { toggleNotificationModal } from '../../store/notification/notificationSlice';

interface CustomHeaderProps {
  background?: boolean | string;
  title: string;
}
const CustomHeader: React.FC<CustomHeaderProps> = ({ background, title }) => {
  const dispatch = useAppDispatch();
  const { Header } = Layout;
  const backgroundImage = background
    ? 'url("/assets/pics/Header.png")'
    : 'none';
  const backgroundColor = background ? '#fff' : 'none';
  const handleShowSidebar = (): void => {
    dispatch(toggleSidebar());
  };
  const handleNotificationWindow = () => {
    dispatch(toggleNotificationModal());
  };
  return (
    <>
      <Header
        style={{
          paddingTop: 40,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: background ? 170 : 30,
          backgroundImage,
          backgroundColor,
          backgroundSize: 'content',
        }}
      >
        <div className="Header-content-wrapper">
          {background ? (
            <SideBarIcon onClick={handleShowSidebar} />
          ) : (
            <BorderedSideBarIcon onClick={handleShowSidebar} />
          )}
          <span style={{ color: background ? '#fff' : '#101828' }}>
            {title}
          </span>
          {background ? (
            <NotificationIcon onClick={handleNotificationWindow} />
          ) : (
            <BorderedNotificationIcon onClick={handleNotificationWindow} />
          )}
        </div>
      </Header>
      <NotificationModal />
    </>
  );
};

export default CustomHeader;
