import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { useDispatch } from 'react-redux';
import {
  filteredToggle,
  searchedToggle,
  selectFilteredFooter,
  selectSelectedSearchItem,
} from '../../../../store/footer/footerSlice';
import { ReactComponent as TickSquareIcon } from '../../../../icons/tickSquare.svg';
import { ReactComponent as CalendarIcon } from '../../../../icons/calendar.svg';
import { ReactComponent as RemoveIcon } from '../../../../icons/delete.svg';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DatePicker from 'react-multi-date-picker';
import { weekDays } from '../../../types/calendar';
import {
  allFilterHandler,
  selectAllFilter,
} from '../../../../store/filter/filterSlice';
import '../../../Paymans/otherPaymans/style.css';
import '../style.css';

export const DateFilter: React.FC = () => {
  const allFilter = useAppSelector(selectAllFilter);
  const filteredFooter = useAppSelector(selectFilteredFooter);
  const [values, setValues] = useState([]);
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
          {/* date  */}
          <>
            <span>هفتگی</span>
            <span>ماهانه</span>
            <span>3 ماهه</span>
          </>
        </div>
        <div className='search-section search-bar'>
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
        </div>
      </div>
    </>
  );
};
