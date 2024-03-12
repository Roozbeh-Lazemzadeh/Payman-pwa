import { Outlet, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import CustomHeader from './CustomHeader';
import { Sidebar } from './Sidebar';
import FilteredFooter from '../shared/Footer/FilteredFooter';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import {
  closeSearchFooterToggle,
  filteredToggle,
  searchedToggle,
  selectFilteredFooter,
  selectSearchedFooter,
} from '../../store/footer/footerSlice';
import PrimaryFooter from './PrimaryFooter';
import { SearchedFooter } from '../shared/Footer/SearchedFooter';

// Define the main layout for the Progressive Web App (PWA)
const PWALayout: React.FC = () => {
  const { Content } = Layout;
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isFilteredFooterShown = useAppSelector(selectFilteredFooter);
  const isSearchedFooterShown = useAppSelector(selectSearchedFooter);
  const isUserRegistered = true; // todo replace with corresponding API

  // Define different headers (blue or white) based on the route
  const getHeader = (): JSX.Element => {
    if (location.pathname === '/home') {
      if (isUserRegistered) {
        return <CustomHeader background title="خانه" />;
      } else {
        return <CustomHeader title="خانه" />;
      }
    } else if (location.pathname === '/profile') {
      return <CustomHeader background title="حساب کاربری" />;
    } else if (location.pathname === '/transactions') {
      return <CustomHeader title=" تراکنش ها" />;
    } else if (location.pathname === '/paymans') {
      return <CustomHeader title="پیمان‌ها" />;
    } else if (location.pathname === '/faq') {
      return <CustomHeader background title="پرسش‌های متداول" />;
    } else if (location.pathname === '/contact-us') {
      return <CustomHeader title="تماس با پیمان" />;
    } else {
      return <CustomHeader background title="خانه" />;
    }
  };

  // Handle different scenarios for showing filter and primary footer
  const handleClosingFooters = (e: any): void => {
    e.stopPropagation();
    const targetElement = e.target as Element;
    const filterIcon = targetElement?.closest('.filter-icon');
    const filteredFooterWrapper = targetElement?.closest(
      '.filtered-footer.active'
    );
    const searchFooterWrapper = targetElement?.closest(
      '.searched-footer.active'
    );
    if (!filterIcon) {
      if (
        !filteredFooterWrapper &&
        isFilteredFooterShown &&
        !isSearchedFooterShown
      ) {
        dispatch(filteredToggle());
      }
      if (!searchFooterWrapper && isSearchedFooterShown) {
        dispatch(closeSearchFooterToggle());
        dispatch(searchedToggle());
        dispatch(filteredToggle());
      }
    }
  };

  // Main layout structure
  return (
    <Layout style={{ overflow: 'hidden' }} onClick={handleClosingFooters}>
      <Sidebar />
      <div>
        {getHeader()}
        <Content>
          <div className="content-wrapper scroll">
            <Outlet />
          </div>
        </Content>
      </div>
      <PrimaryFooter />
      <FilteredFooter />
      <SearchedFooter />
    </Layout>
  );
};

export default PWALayout;
