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
interface HeaderStyle {
  background: boolean;
  title: string;
}

// Define the main layout for the Progressive Web App (PWA)
const PWALayout: React.FC = () => {
  const { Content } = Layout;
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isFilteredFooterShown = useAppSelector(selectFilteredFooter);
  const isSearchedFooterShown = useAppSelector(selectSearchedFooter);
  // const isUserRegistered = true; // todo replace with corresponding API

  // Define different headers (blue or white) based on the route
  const getHeader = (): JSX.Element => {
    const headerStyleMap: Record<string, HeaderStyle> = {
      '/home/with-mandate': { background: true, title: 'خانه' },
      '/home/without-mandate': { background: false, title: 'خانه' },
      '/profile': { background: true, title: 'حساب کاربری' },
      '/transactions': { background: false, title: 'تراکنش‌ها' },
      '/paymans/me': { background: false, title: 'پیمان‌ها' },
      '/paymans/others': { background: false, title: 'سایر ‌هم‌پیمان‌ها' },
      '/faq': { background: true, title: 'پرسش‌های متداول' },
      '/contact-us': { background: false, title: 'تماس با پیمان' },
      '/': { background: true, title: 'خانه' },
    };

    const getHeaderStyle = () => {
      const currentPath = location.pathname;
      const headerStyle = headerStyleMap[currentPath];
      return headerStyle || { background: false, title: 'خانه' }; // Default header style
    };

    const { background, title } = getHeaderStyle();
    return <CustomHeader background={background} title={title} />;
  };

  // Handle different scenarios for showing filter and primary footer
  const handleClosingFooters = (e: any): void | null => {
    e.stopPropagation();
    const targetElement = e.target as Element;
    const filterIcon = targetElement?.closest('.filter-icon');
    const filteredFooterWrapper = targetElement?.closest(
      '.filtered-footer.active'
    );
    const searchFooterWrapper = targetElement?.closest(
      '.searched-footer.active'
    );
    const selectDropdown = targetElement?.closest(
      '.ant-select-item.ant-select-item-option'
    );
    if (selectDropdown) return null;
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
        dispatch(searchedToggle(''));
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
