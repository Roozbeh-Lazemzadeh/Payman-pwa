import React from 'react';
import { Footer } from 'antd/es/layout/layout';
import { useAppSelector } from '../../../hooks/reduxHooks';
import {
  selectHomeSearchedFilter,
  selectHomeCloseSearchedFilter,
  selectHomeSearchItem,
} from '../../../../store/filterMenu/homeFilterMenuSlice';
import { PriceFilter } from './PriceFilter';
import { DateFilter } from './DateFilter';
import { MerchantFilter } from './MerchantFilter';
import '../../../Paymans/otherPaymans/style.css';
import '../../style.css';

const SearchedItems: React.FC = () => {
  const searchItem = useAppSelector(selectHomeSearchItem);
  const isSearchedMenuShown = useAppSelector(selectHomeSearchedFilter);
  const closeSearchMenu = useAppSelector(selectHomeCloseSearchedFilter);

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
      className={`searched-footer${isSearchedMenuShown ? ' active' : ''} ${
        closeSearchMenu ? 'close' : ''
      }`}
    >
      <div className='searched-footer-wrapper'>{footerBody()}</div>
    </Footer>
  );
};

export default SearchedItems;
