import React, { useEffect, useState } from 'react';
import { Carousel, Drawer, Menu } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  selectSidebar,
  toggleSidebar,
} from '../../../store/sidebar/sidebarSlice';
import { getItem } from '../../helpers';
import { ReactComponent as DefaultDashboardIcon } from '../../../icons/defaultHome.svg';
import { ReactComponent as DashboardIcon } from '../../../icons/selectedHome.svg';
import { ReactComponent as DefaultContactIcon } from '../../../icons/defaultContact.svg';
import { ReactComponent as ContactIcon } from '../../../icons/calling.svg';
import { ReactComponent as DefaultProfileIcon } from '../../../icons/defaultProfile.svg';
import { ReactComponent as ProfileIcon } from '../../../icons/Profile.svg';
import { ReactComponent as DefaultInfoIcon } from '../../../icons/defaultInfoIcon.svg';
import { ReactComponent as InfoIcon } from '../../../icons/Info.svg';
import { ReactComponent as DefaultBlogIcon } from '../../../icons/defaultBlog.svg';
import { ReactComponent as BlogIcon } from '../../../icons/Blog.svg';
import { useLocation, useNavigate } from 'react-router-dom';

// styles
import './style.css';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-flip';
import SkeletonSliderSidebar from '../../skeleton/SkeletonSliderSidebar';

export const Sidebar: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState('1');
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSidebarOpen = useAppSelector(selectSidebar);

  useEffect(() => {
    const pathname = location.pathname;
    let key;
    if (pathname.includes('/home')) {
      key = '1';
    } else if (pathname.includes('/contact-us')) {
      key = '2';
    } else if (pathname.includes('/profile')) {
      key = '3';
    } else if (pathname.includes('/faq')) {
      key = '4';
    } else {
      key = '0'; // Default nothing to show
    }

    setSelectedKey(key);
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup function to clear the timeout
  }, []);

  const items = [
    getItem({
      label: 'خانه',
      key: '1',
      icon: selectedKey === '1' ? <DashboardIcon /> : <DefaultDashboardIcon />,
      dispatch,
      navigate,
    }),
    getItem({
      label: 'تماس با پیمان',
      key: '2',
      icon: selectedKey === '2' ? <ContactIcon /> : <DefaultContactIcon />,
      dispatch,
      navigate,
    }),
    getItem({
      label: 'حساب کاربری',
      key: '3',
      icon: selectedKey === '3' ? <ProfileIcon /> : <DefaultProfileIcon />,
      dispatch,
      navigate,
    }),
    getItem({
      label: 'پرسش‌های متداول',
      key: '4',
      icon: selectedKey === '4' ? <InfoIcon /> : <DefaultInfoIcon />,
      dispatch,
      navigate,
    }),
    getItem({
      label: 'بلاگ پیمان',
      key: '5',
      icon: selectedKey === '5' ? <BlogIcon /> : <DefaultBlogIcon />,
      dispatch,
      navigate,
    }),
  ];

  const CustomTitle = () => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img
          src='/assets/icons/logo-48x48.svg'
          alt=''
          style={{ width: '40px', height: '40px' }}
        />
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            marginRight: '10px',
          }}
        >
          خوش آمدید به
        </span>
        <img
          src='/assets/pics/payman-name.svg'
          alt=''
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingRight: '5px',
            paddingTop: '3px',
          }}
        />
      </div>
    );
  };
  const customFooter = () => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontSize: 10,
            color: 'rgba(16, 24, 40, 0.2)',
            fontWeight: 500,
            paddingLeft: 5,
          }}
        >
          توسعه‌یافته توسط پیمان
        </span>
        <img src='/assets/pics/Payman-small-icon.png' alt='' />
      </div>
    );
  };

  return (
    <Drawer
      className='custom-sidebar'
      title={CustomTitle()}
      width={300}
      onClose={() => dispatch(toggleSidebar())}
      open={isSidebarOpen}
      closeIcon={false}
      footer={customFooter()}
    >
      <Menu
        selectedKeys={[selectedKey]}
        onClick={(info) => setSelectedKey(info.key)}
        mode='inline'
        // selectedKeys={[location.pathname]}
        items={items}
        className='custom-sidebar-menu'
      />
      {isLoading ? (
        <SkeletonSliderSidebar />
      ) : (
        <Carousel autoplay infinite className='custom-sidebar'>
          <img src='/assets/banner-home/home1.png' className='sidebar-img' />
          <img src='/assets/banner-home/home2.png' className='sidebar-img' />
          <img src='/assets/banner-home/home3.png' className='sidebar-img' />
          <img src='/assets/banner-home/home4.png' className='sidebar-img' />
        </Carousel>
      )}
      <div
        style={{
          padding: '30px 10px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img src='/assets/pics/Logout.svg' alt='' />
        <span style={{ paddingRight: 10, fontWeight: 500 }}>
          خروج از حساب کاربری
        </span>
      </div>
    </Drawer>
  );
};
