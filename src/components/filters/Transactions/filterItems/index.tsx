import React from 'react';
import { Footer } from 'antd/es/layout/layout';
import { useAppSelector } from '../../../hooks/reduxHooks';
import {
  selectTransactionSearchedFilter,
  selectTransactionCloseSearchedFilter,
  selectTransactionSearchItem,
} from '../../../../store/filterMenu/transactionFilterMenuSlice';
import { PriceFilter } from './PriceFilter';
import { DateFilter } from './DateFilter';
import { MerchantFilter } from './MerchantFilter';
import '../../../Paymans/otherPaymans/style.css';
import '../../style.css';

export const SearchedUI: React.FC = () => {
  const searchItem = useAppSelector(selectTransactionSearchItem);
  const isSearchedFooterShown = useAppSelector(selectTransactionSearchedFilter);
  const closeSearchFooter = useAppSelector(
    selectTransactionCloseSearchedFilter
  );

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
