import React from 'react';
import { Footer } from 'antd/es/layout/layout';
import { useAppSelector } from '../../hooks/reduxHooks';
import {
  selectSearchedFilter,
  selectCloseSearchedFilter,
  selectSearchItem,
} from '../../../store/filterMenu/filterMenuSlice';
import { PriceFilter } from './PriceFilter';
import { TransactionDateFilter } from './TransactionDateFilter';
import { HomeDateFilter } from './HomeDateFilter';
import { MerchantFilter } from './MerchantFilter';
import '../../Paymans/otherPaymans/style.css';
import '../style.css';
import { useLocation } from 'react-router-dom';
import { PaymanDateFilter } from './PaymanDateFilter';

const SearchedItems: React.FC = () => {
  const location = useLocation();
  const searchItem = useAppSelector(selectSearchItem);
  const isSearchedFooterShown = useAppSelector(selectSearchedFilter);
  const closeSearchFooter = useAppSelector(selectCloseSearchedFilter);
  const currentPath = location.pathname;

  const footerBody = () => {
    switch (searchItem) {
      case '102':
        return <PriceFilter />;
      case '103':
        switch (currentPath) {
          case '/transactions':
            return <TransactionDateFilter />;
          case '/home/with-mandate':
            return <HomeDateFilter />;
          case '/paymans/me':
            return <PaymanDateFilter />;
          default:
            return <div>No path matched</div>;
        }

      case '104':
        return <MerchantFilter />;

      default:
        break;
    }
  };

  return (
    <Footer
      className={`searched-footer${isSearchedFooterShown ? ' active' : ''} ${
        closeSearchFooter ? 'close' : ''
      }`}
    >
      <div className='searched-footer-wrapper'>{footerBody()}</div>
    </Footer>
  );
};

export default SearchedItems;
