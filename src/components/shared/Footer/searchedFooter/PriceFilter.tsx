import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { useDispatch } from 'react-redux';
import {
  filteredToggle,
  searchedToggle,
  selectFilteredFooter,
  selectSelectedSearchItem,
} from '../../../../store/footer/footerSlice';
import { ReactComponent as TickSquareIcon } from '../../../../icons/tickSquare.svg';
import { ReactComponent as BuyIcon } from '../../../../icons/buy2.svg';
import { ReactComponent as RemoveIcon } from '../../../../icons/delete.svg';
import {
  allFilterHandler,
  selectAllFilter,
} from '../../../../store/filter/filterSlice';
import '../style.css';
import '../../../Paymans/otherPaymans/style.css';

export const PriceFilter: React.FC = () => {
  const allFilter = useAppSelector(selectAllFilter);
  const filteredFooter = useAppSelector(selectFilteredFooter);
  const searchItem = useAppSelector(selectSelectedSearchItem);
  const [selectedQuickItems, setSelectedQuickItems] = useState<
    { title: string; id: number }[]
  >([]);
  console.log(selectedQuickItems);
  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedQuickItems([]);
  }, [filteredFooter]);

  useEffect(() => {
    // Check the search item and initialize the selectedQuickItems state
    if (searchItem === '104') {
      setSelectedQuickItems(allFilter.merchants);
    } else {
      setSelectedQuickItems([]);
    }
  }, [searchItem, allFilter.merchants]);

  const secondaryImplementFiltering = () => {
    dispatch(allFilterHandler(selectedQuickItems));
    dispatch(searchedToggle(''));
    dispatch(filteredToggle());
  };
  console.log(allFilter);

  const handleRemoveFilter = () => {
    setSelectedQuickItems([]);
    // dispatch(allFilterHandler([]));
  };
  const primaryImplementFiltering = () => {
    // setSelectedQuickItems([]);
    dispatch(allFilterHandler(selectedQuickItems));
  };

  return (
    <>
      {selectedQuickItems.length > 0 ? (
        <div className='implement-remove-wrapper'>
          <div className='remove-button' onClick={handleRemoveFilter}>
            <RemoveIcon />
            <span>حذف فیلتر</span>
          </div>
          <div
            className='implement-button half'
            onClick={secondaryImplementFiltering}
          >
            <TickSquareIcon />
            <span>اعمال</span>
          </div>
        </div>
      ) : (
        <div className='implement-button' onClick={primaryImplementFiltering}>
          <TickSquareIcon />
          <span>اعمال</span>
        </div>
      )}
      <div className='searched-footer-content'>
        <div className='quick-access-section'>
          {/* price  */}
          <>
            <span>۱۰۰هزار تومانءءء</span>
            <span>2۰۰هزار تومانءءء</span>
            <span>3۰۰هزار تومانءءء</span>
          </>
        </div>
        <div className='search-section '>
          <>
            <Input
              className='search-input'
              addonBefore={<BuyIcon />}
              placeholder='از مبلغ'
            />
            <Input
              className='search-input'
              addonBefore={<BuyIcon />}
              placeholder='تا مبلغ'
            />
          </>
        </div>
      </div>
    </>
  );
};
