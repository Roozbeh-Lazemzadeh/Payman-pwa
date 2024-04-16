import React, { useEffect, useState } from 'react';
import Search, { type SearchProps } from 'antd/es/input/Search';
import { Footer } from 'antd/es/layout/layout';
import { useAppSelector } from '../../hooks/reduxHooks';
import {
  filteredToggle,
  searchedToggle,
  selectCloseSearchFooter,
  selectFilteredFooter,
  selectSearchedFooter,
  selectSelectedSearchItem,
} from '../../../store/footer/footerSlice';
import { ReactComponent as TickSquareIcon } from '../../../icons/tickSquare.svg';
import { ReactComponent as BuyIcon } from '../../../icons/buy2.svg';
import { ReactComponent as MagnifierIcon } from '../../../icons/magnifier2.svg';
import { ReactComponent as CalendarIcon } from '../../../icons/calendar.svg';
import { ReactComponent as RemoveIcon } from '../../../icons/delete.svg';
import '../../Paymans/otherPaymans/style.css';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { Button, Input } from 'antd';
import DatePicker from 'react-multi-date-picker';
import { weekDays } from '../../types/calendar';
import './style.css';
import {
  allFilterHandler,
  selectAllFilter,
} from '../../../store/filter/filterSlice';
import { useDispatch } from 'react-redux';

export const SearchedFooter: React.FC = () => {
  const allFilter = useAppSelector(selectAllFilter);
  const filteredFooter = useAppSelector(selectFilteredFooter);

  const [values, setValues] = useState([]);
  const isSearchedFooterShown = useAppSelector(selectSearchedFooter);
  const closeSearchFooter = useAppSelector(selectCloseSearchFooter);
  const searchItem = useAppSelector(selectSelectedSearchItem);
  const [selectedQuickItems, setSelectedQuickItems] = useState<
    { title: string; id: number }[]
  >([]);
  console.log(selectedQuickItems);
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
    // dispatch(allFilterHandler([]));
  };
  const primaryImplementFiltering = () => {
    // setSelectedQuickItems([]);
    dispatch(allFilterHandler(selectedQuickItems));
  };

  const searchFooterFn = () => {
    switch (searchItem) {
      case '104':
        return (
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
        );
      case '103':
        return (
          <div className='search-datePicker'>
            <DatePicker
              placeholder='از تاریخ                              تا تاریخ'
              style={{
                direction: 'rtl',
              }}
              value={values}
              onChange={() => setValues(values)}
              dateSeparator='                  '
              locale={persian_fa}
              calendar={persian}
              className='rmdp-mobile'
              calendarPosition='bottom-right'
              range
              weekDays={weekDays}
              monthYearSeparator='  '
            />
            <div className='icon'>
              <CalendarIcon />
            </div>
            <div className='divider'></div>
          </div>
        );
      case '102':
        return (
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
        );
      default:
        return null;
    }
  };

  const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
    console.log(info?.source, value);

  return (
    <Footer
      className={`searched-footer${isSearchedFooterShown ? ' active' : ''} ${
        closeSearchFooter ? 'close' : ''
      }`}
    >
      <div className='searched-footer-wrapper'>
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
            {/* merchants  */}
            {searchItem === '104' && (
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
            )}
            {/* date  */}
            {searchItem === '103' && (
              <>
                <span>هفتگی</span>
                <span>ماهانه</span>
                <span>3 ماهه</span>
              </>
            )}
            {/* price  */}
            {searchItem === '102' && (
              <>
                <span>۱۰۰هزار تومانءءء</span>
                <span>2۰۰هزار تومانءءء</span>
                <span>3۰۰هزار تومانءءء</span>
              </>
            )}
          </div>
          <div
            className={`search-section ${
              searchItem === '103' ? 'search-bar' : ''
            } `}
          >
            {searchFooterFn()}
            {/* <div className='divider'></div> */}
          </div>
        </div>
      </div>
    </Footer>
  );
};
