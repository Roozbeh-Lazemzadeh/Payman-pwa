import React, { useEffect, useState } from 'react';
import Search, { type SearchProps } from 'antd/es/input/Search';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks/reduxHooks';
import {
  filteredToggle,
  searchedToggle,
  selectFilteredFooter,
  selectSelectedSearchItem,
} from '../../../../store/footer/footerSlice';
import { ReactComponent as TickSquareIcon } from '../../../../icons/tickSquare.svg';
import { ReactComponent as MagnifierIcon } from '../../../../icons/magnifier2.svg';
import { ReactComponent as RemoveIcon } from '../../../../icons/delete.svg';
import {
  allFilterHandler,
  selectAllFilter,
} from '../../../../store/filter/filterSlice';
import '../../../Paymans/otherPaymans/style.css';
import '../style.css';

export const MerchantFilter: React.FC = () => {
  const allFilter = useAppSelector(selectAllFilter);
  console.log(allFilter.merchants);
  const filteredFooter = useAppSelector(selectFilteredFooter);
  const searchItem = useAppSelector(selectSelectedSearchItem);
  const [selectedQuickItems, setSelectedQuickItems] = useState<
    { title: string; id: number }[]
  >([]);

  const dispatch = useDispatch();

  const selectedQuickAccess = (title: string, id: number) => {
    // handle merchants case
    if (searchItem === '104') {
      // Create a new array of selected items with the new title and id
      const updatedSelectedItems = selectedQuickItems.some(
        (item) => item.title === title && item.id === id
      )
        ? // If the item already exists, filter it out
          selectedQuickItems.filter(
            (item) => !(item.title === title && item.id === id)
          )
        : // If the item doesn't exist, add it to the array
          [...selectedQuickItems, { title, id }];

      // Update the state with the new array of selected items
      setSelectedQuickItems(updatedSelectedItems);
    }
  };

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
    console.log('first', selectedQuickItems);

    dispatch(allFilterHandler(selectedQuickItems));
    dispatch(searchedToggle(''));
    dispatch(filteredToggle());
  };
  console.log(allFilter);
  const handleMerchantSearch = (e: any): void => {
    console.log(e.target.value);
  };
  const handleRemoveFilter = () => {
    setSelectedQuickItems([]);
    dispatch(allFilterHandler([]));
    dispatch(searchedToggle(''));
    dispatch(filteredToggle());
  };
  // const primaryImplementFiltering = () => {

  //   dispatch(allFilterHandler(selectedQuickItems));
  // };

  const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
    console.log(info?.source, value);

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
        // <div className='implement-button' onClick={primaryImplementFiltering}>
        <div className='implement-button'>
          <TickSquareIcon />
          <span>اعمال</span>
        </div>
      )}
      <div className='searched-footer-content'>
        <div className='quick-access-section'>
          {/* merchants  */}
          <>
            <span
              className={
                selectedQuickItems.some((item) => item.id === 0)
                  ? 'selected'
                  : ''
              }
              onClick={() => selectedQuickAccess('اسنپ', 0)}
            >
              اسنپ
            </span>
            <span
              className={
                selectedQuickItems.some((item) => item.id === 1)
                  ? 'selected'
                  : ''
              }
              onClick={() => selectedQuickAccess('تپسی', 1)}
            >
              تپسی
            </span>
            <span
              className={
                selectedQuickItems.some((item) => item.id === 2)
                  ? 'selected'
                  : ''
              }
              onClick={() => selectedQuickAccess('فیلیمو', 2)}
            >
              فیلیمو
            </span>
          </>
        </div>
        <div className='search-section '>
          <Search
            onChange={(e) => handleMerchantSearch(e)}
            placeholder='جستجوی نام کسب‌وکار'
            onSearch={onSearch}
            style={{ width: '90%' }}
            className='home-search_input payman'
            enterButton={
              <Button
                className='search-btn'
                disabled
                icon={<MagnifierIcon />}
              />
            }
          />
        </div>
      </div>
    </>
  );
};
