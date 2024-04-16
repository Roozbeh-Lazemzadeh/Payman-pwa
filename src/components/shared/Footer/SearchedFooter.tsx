import React from 'react';
import { Footer } from 'antd/es/layout/layout';
import { useAppSelector } from '../../hooks/reduxHooks';
import {
  selectCloseSearchFooter,
  selectSearchedFooter,
  selectSelectedSearchItem,
} from '../../../store/footer/footerSlice';
import { PriceFilter } from './searchedFooter/PriceFilter';
import { DateFilter } from './searchedFooter/DateFilter';
import { MerchantFilter } from './searchedFooter/MerchantFilter';
import '../../Paymans/otherPaymans/style.css';
import './style.css';

export const SearchedFooter: React.FC = () => {
  const searchItem = useAppSelector(selectSelectedSearchItem);
  const isSearchedFooterShown = useAppSelector(selectSearchedFooter);
  const closeSearchFooter = useAppSelector(selectCloseSearchFooter);

  const footerBody = () => {
    switch (searchItem) {
      case '102':
        return <PriceFilter />;
      case '103':
        return <DateFilter />;
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
