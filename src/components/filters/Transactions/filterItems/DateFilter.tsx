import React, { useEffect, useState } from 'react';
import { ReactComponent as TickSquareIcon } from '../../../../icons/tickSquare.svg';
import { ReactComponent as CalendarIcon } from '../../../../icons/calendar.svg';
import { ReactComponent as RemoveIcon } from '../../../../icons/delete.svg';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import { weekDays } from '../../../types/calendar';
import gregorian from 'react-date-object/calendars/gregorian';
import { startOfDay, subDays, subWeeks, subMonths, parse } from 'date-fns';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import {
  dateHandler,
  dateQuickAccessHandler,
  selectAllFilter,
  selectDatePeriod,
} from '../../../../store/filterPage/transactionFilterSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import {
  transactionFilteredToggle,
  transactionSearchedToggle,
  selectTransactionSearchItem,
} from '../../../../store/filterMenu/transactionFilterMenuSlice';

import '../../../Paymans/otherPaymans/style.css';
import '../../style.css';

export const DateFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const allFilter = useAppSelector(selectAllFilter);
  const searchItem = useAppSelector(selectTransactionSearchItem);
  const datePeriod = useAppSelector(selectDatePeriod);
  const [dates, setDates] = useState<string[]>([]);
  const [values, setValues] = useState<Date[]>([
    // new DateObject({ calendar: gregorian }),
    // new DateObject({ calendar: gregorian }).add(2, 'day'),
  ]);

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
    dispatch(transactionSearchedToggle(''));
    dispatch(transactionFilteredToggle());
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
    dispatch(transactionSearchedToggle(''));
    dispatch(transactionFilteredToggle());
    dispatch(dateQuickAccessHandler(''));
  };

  useEffect(() => {
    // Check the search item and initialize the selectedQuickItems state

    setSelectedQuickItems(datePeriod);
  }, [searchItem]);

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
        <div className='quick-access-section'>
          {/* date  */}
          <>
            <span
              className={selectedQuickItems === 'روز گذشته' ? 'selected' : ''}
              onClick={() => selectedQuickAccess('روز گذشته')}
            >
              روز گذشته
            </span>
            <span
              className={selectedQuickItems === 'هفته گذشته' ? 'selected' : ''}
              onClick={() => selectedQuickAccess('هفته گذشته')}
            >
              هفته گذشته
            </span>
            <span
              className={selectedQuickItems === 'ماه گذشته' ? 'selected' : ''}
              onClick={() => selectedQuickAccess('ماه گذشته')}
            >
              ماه گذشته
            </span>
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
