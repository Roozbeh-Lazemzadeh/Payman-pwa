import { Outlet, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import CustomHeader from './header/CustomHeader';
import { Sidebar } from './sidebar/Sidebar';
import PrimaryFooter from './footer/PrimaryFooter';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';

// transaction filter
import TransactionFilteredUI from '../filters/Transactions/filterMenu/FilterMenu';
import TransactionSearchedItems from '../filters/Transactions/filterItems';
import {
  transactionFilteredToggle,
  transactionSearchedToggle,
  transactionCloseSearchToggle,
  selectTransactionSearchedFilter,
  selectTransactionFilter,
} from '../../store/filterMenu/transactionFilterMenuSlice';

// home filter
import HomeFilteredUI from '../filters/Home/filterMenu/FilterMenu';
import HomeSearchedItems from '../filters/Home/filterItems';
import {
  homeFilteredToggle,
  homeSearchedToggle,
  homeCloseSearchToggle,
  selectHomeSearchedFilter,
  selectHomeFilter,
} from '../../store/filterMenu/homeFilterMenuSlice';

interface HeaderStyle {
  background: boolean;
  title: string;
}

// Define the main layout for the Progressive Web App (PWA)
const PWALayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const { Content } = Layout;
  const location = useLocation();
  const currentPath = location.pathname;

  // transaction filter
  const isTransactionFilteredShown = useAppSelector(selectTransactionFilter);
  const isTransactionSearchedShown = useAppSelector(
    selectTransactionSearchedFilter
  );

  // home filter
  const isHomeFilteredShown = useAppSelector(selectHomeFilter);
  const isHomeSearchedShown = useAppSelector(selectHomeSearchedFilter);

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
    const selectDropdown = targetElement?.closest(
      '.ant-select-item.ant-select-item-option'
    );
    if (selectDropdown) return;

    switch (currentPath) {
      case '/transactions':
        if (!filterIcon) {
          if (
            !filteredFooterWrapper &&
            isTransactionFilteredShown &&
            !isTransactionSearchedShown
          ) {
            dispatch(transactionFilteredToggle());
          }
          if (!searchFooterWrapper && isTransactionSearchedShown) {
            dispatch(transactionCloseSearchToggle());
            dispatch(transactionSearchedToggle(''));
            dispatch(transactionFilteredToggle());
          }
        }
        break;
      case '/home/with-mandate':
        if (!filterIcon) {
          if (
            !filteredFooterWrapper &&
            isHomeFilteredShown &&
            !isHomeSearchedShown
          ) {
            dispatch(homeFilteredToggle());
          }
          if (!searchFooterWrapper && isHomeSearchedShown) {
            dispatch(homeCloseSearchToggle());
            dispatch(homeSearchedToggle(''));
            dispatch(homeFilteredToggle());
          }
        }
        break;

      default:
        break;
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

      {/* transaction filter  */}
      <TransactionFilteredUI />
      <TransactionSearchedItems />

      {/* home filter  */}
      <HomeFilteredUI />
      <HomeSearchedItems />
    </Layout>
  );
};

export default PWALayout;
