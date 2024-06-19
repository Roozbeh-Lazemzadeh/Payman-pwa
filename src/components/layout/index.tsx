import { Outlet, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import CustomHeader from './header/CustomHeader';
import { Sidebar } from './sidebar/Sidebar';
import PrimaryFooter from './footer/PrimaryFooter';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';

// filter
import FilteredUI from '../filters/filterMenu/FilterMenu';
import SearchedItems from '../filters/filterItems';
import {
  filteredToggle,
  searchedToggle,
  closeSearchToggle,
  selectSearchedFilter,
  selectFilter,
  selectDropDownVisible,
  closeDropDown,
  openDropDown,
} from '../../store/filterMenu/filterMenuSlice';

interface HeaderStyle {
  background: boolean;
  title: string;
}

// Define the main layout for the Progressive Web App (PWA)
const PWALayout: React.FC = () => {
  const isDropDownOpen = useAppSelector(selectDropDownVisible);
  const dispatch = useAppDispatch();
  const { Content } = Layout;
  const location = useLocation();

  // filter
  const isFilteredShown = useAppSelector(selectFilter);
  const isSearchedShown = useAppSelector(selectSearchedFilter);

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
  const handleClosingFooters = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
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
    const antSelectBox = targetElement?.closest('.ant-select');
    // Close dropdown menu when clicking outside of it
    if (selectDropdown) return;

    if (antSelectBox) {
      dispatch(openDropDown());
    }

    if (!selectDropdown && !filteredFooterWrapper && isDropDownOpen) {
      dispatch(closeDropDown());
      return;
    }

    if (!filterIcon) {
      if (!filteredFooterWrapper && isFilteredShown && !isSearchedShown) {
        dispatch(filteredToggle());
      }
      if (!searchFooterWrapper && isSearchedShown) {
        dispatch(closeSearchToggle());
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
          <div className='content-wrapper scroll'>
            <Outlet />
          </div>
        </Content>
      </div>
      <PrimaryFooter />

      {/* filter  */}
      <FilteredUI />
      <SearchedItems />
    </Layout>
  );
};

export default PWALayout;
