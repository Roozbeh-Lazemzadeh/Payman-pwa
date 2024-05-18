/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { ReactComponent as TickSquareIcon } from '../../../icons/tickSquare.svg';
import { ReactComponent as CalendarIcon } from '../../../icons/calendar.svg';
import { ReactComponent as RemoveIcon } from '../../../icons/delete.svg';
import { Segmented } from 'antd';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import { weekDays } from '../../types/calendar';
import gregorian from 'react-date-object/calendars/gregorian';
import { startOfDay, subDays, subWeeks, subMonths, parse } from 'date-fns';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import {
  dateHandler,
  dateQuickAccessHandler,
  handleListFiltering,
  selectAllFilter,
  selectDatePeriod,
} from '../../../store/filterPage/filterSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  filteredToggle,
  searchedToggle,
  selectSearchItem,
} from '../../../store/filterMenu/filterMenuSlice';

import '../../Paymans/otherPaymans/style.css';
import '../style.css';

export const PaymanDateFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const allFilter = useAppSelector(selectAllFilter);
  const searchItem = useAppSelector(selectSearchItem);
  const datePeriod = useAppSelector(selectDatePeriod);
  const [dates, setDates] = useState<string[]>([]);
  const [values, setValues] = useState<Date[]>([
    // new DateObject({ calendar: gregorian }),
    // new DateObject({ calendar: gregorian }).add(2, 'day'),
  ]);
  const [selectedDateTab, setSelectedDateTab] = useState('start');

  const [selectedQuickItems, setSelectedQuickItems] = useState<string>('');

  const handleDateChange = (dates: DateObject[]) => {
    if (dates) {
      const formattedDates: string[] = dates.map((date) =>
        new DateObject(date)
          .convert(gregorian, gregorian_en)
          .format('YY-MMM-DD hh:mm:ss a')
      );
      if (formattedDates.length === 1) {
        const currentDate = new DateObject(new Date())
          .convert(gregorian, gregorian_en)
          .format('YY-MMM-DD hh:mm:ss a');
        formattedDates.push(currentDate);
        setDates(formattedDates);
      } else if (formattedDates.length === 2) {
        setDates(formattedDates);
      }
    }
  };
  const handleDateFilter = () => {
    if (dates.length === 0) return null;
    dispatch(dateHandler(dates));
    dispatch(handleListFiltering({ dates }));
    dispatch(searchedToggle(''));
    dispatch(filteredToggle());
  };

  useEffect(() => {
    const parsedDates: Date[] = allFilter?.date.map((date) =>
      parse(date, 'yy-MMM-dd hh:mm:ss a', new Date())
    );
    setValues(parsedDates);
    // dispatching if user implement the same date filter
    const formattedDates: string[] = parsedDates.map((date) =>
      new DateObject(date)
        .convert(gregorian, gregorian_en)
        .format('YY-MMM-DD hh:mm:ss a')
    );
    setDates(formattedDates);
  }, [allFilter.date]);

  const selectedQuickAccess = (title: string) => {
    let formattedDates: string[] = [];
    const today = startOfDay(new Date());
    const yesterday = subDays(today, 1);
    const oneWeekAgo = subWeeks(today, 1);
    const oneMonthAgo = subMonths(today, 1);
    // Filter out the previously selected item from the selectedQuickItems array
    setSelectedQuickItems(title);

    switch (title) {
      case 'روز گذشته':
        formattedDates = [
          new DateObject(yesterday)
            .convert(gregorian, gregorian_en)
            .format('YY-MMM-DD hh:mm:ss a'),
          new DateObject(today)
            .convert(gregorian, gregorian_en)
            .format('YY-MMM-DD hh:mm:ss a'),
        ];
        setDates(formattedDates);
        setValues([yesterday, today]);
        dispatch(dateQuickAccessHandler('روز گذشته'));
        break;

      case 'هفته گذشته':
        formattedDates = [
          new DateObject(oneWeekAgo)
            .convert(gregorian, gregorian_en)
            .format('YY-MMM-DD hh:mm:ss a'),
          new DateObject(today)
            .convert(gregorian, gregorian_en)
            .format('YY-MMM-DD hh:mm:ss a'),
        ];
        setDates(formattedDates);
        setValues([oneWeekAgo, today]);
        dispatch(dateQuickAccessHandler('هفته گذشته'));

        break;

      case 'ماه گذشته':
        formattedDates = [
          new DateObject(oneMonthAgo)
            .convert(gregorian, gregorian_en)
            .format('YY-MMM-DD hh:mm:ss a'),
          new DateObject(today)
            .convert(gregorian, gregorian_en)
            .format('YY-MMM-DD hh:mm:ss a'),
        ];
        setDates(formattedDates);
        setValues([oneMonthAgo, today]);
        dispatch(dateQuickAccessHandler('ماه گذشته'));

        break;

      default:
        break;
    }
  };

  const handleRemoveFilter = () => {
    if (dates.length === 0) return null;
    setSelectedQuickItems('');
    setDates([]);
    setValues([]);
    dispatch(dateHandler([]));
    dispatch(searchedToggle(''));
    dispatch(filteredToggle());
    dispatch(dateQuickAccessHandler(''));
    dispatch(handleListFiltering({ dates: [] }));
  };

  useEffect(() => {
    // Check the search item and initialize the selectedQuickItems state

    setSelectedQuickItems(datePeriod);
  }, [searchItem]);

  const handleSelectedTab = (value: string) => {
    switch (value) {
      case 'شروع':
        setSelectedDateTab('start');
        break;
      case 'پایان':
        setSelectedDateTab('end');
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className='implement-remove-wrapper'>
        <div
          className={`remove-button ${dates.length === 0 ? 'disabled' : ''}`}
          onClick={handleRemoveFilter}
        >
          <RemoveIcon />
          <span>حذف فیلتر</span>
        </div>
        <div
          className={`implement-button half ${
            dates.length === 0 ? 'disabled' : ''
          }`}
          onClick={handleDateFilter}
        >
          <TickSquareIcon />
          <span>اعمال</span>
        </div>
      </div>

      <div className='searched-footer-content'>
        <div className='quick-access-section payman'>
          {/* date  */}
          <span className='title'>مبنای فیلتر تاریخ بر اساس</span>
          <Segmented
            className='custom-date-segment'
            style={{ direction: 'ltr', height: 30, transition: 'none' }}
            options={['پایان', 'شروع']}
            block
            defaultValue={'شروع'}
            onChange={handleSelectedTab}
          />
        </div>
        <div className='search-section search-bar'>
          <div className='search-datePicker'>
            <DatePicker
              placeholder={
                selectedDateTab === 'start'
                  ? 'شروع پیمان از تاریخ    شروع پیمان تا تاریخ'
                  : 'پایان پیمان از تاریخ     پایان پیمان تا تاریخ'
              }
              style={{ direction: 'rtl', fontSize: 12 }}
              value={values}
              onChange={handleDateChange}
              dateSeparator='                  '
              locale={persian_fa}
              calendar={persian}
              className='rmdp-mobile'
              calendarPosition='bottom-right'
              range
              weekDays={weekDays}
              monthYearSeparator='  '
              mobileLabels={{
                OK: 'تایید',
                CANCEL: 'انصراف',
              }}
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
