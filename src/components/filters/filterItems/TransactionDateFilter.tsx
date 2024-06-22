import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as TickSquareIcon } from '../../../icons/tickSquare.svg';
import { ReactComponent as CalendarIcon } from '../../../icons/calendar.svg';
import { ReactComponent as RemoveIcon } from '../../../icons/delete.svg';
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
  transactionsFiltering,
  selectAllFilter,
  selectDatePeriod,
} from '../../../store/filterPage/filterSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  filteredToggle,
  searchedToggle,
  selectSearchItem,
} from '../../../store/filterMenu/filterMenuSlice';

// style
import '../../Paymans/otherPaymans/style.css';
import '../style.css';
import { convertDate, convertToPersianFormat } from '../../helpers/transDate';

export const TransactionDateFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const datePickerRef = useRef<any>(null);
  const allFilter = useAppSelector(selectAllFilter);
  const searchItem = useAppSelector(selectSearchItem);
  const datePeriod = useAppSelector(selectDatePeriod);
  const [dates, setDates] = useState<string[]>([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [isFilled, setIsFilled] = useState(false);
  const [values, setValues] = useState<Date[]>([]);
  const [selectedQuickItems, setSelectedQuickItems] = useState<string>('');
  const today = startOfDay(new Date());
  const yesterday = subDays(today, 1);
  const oneWeekAgo = subWeeks(today, 1);
  const oneMonthAgo = subMonths(today, 1);

  const handleDateChange = (dates: DateObject[]) => {
    if (dates) {
      const formattedDates: string[] = dates.map((date) =>
        new DateObject(date)
          .convert(gregorian, gregorian_en)
          .format('DD-MMM-YY hh:mm:ss a')
      );
      if (formattedDates.length === 1) {
        const currentDate = convertDate(new Date());
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
    dispatch(transactionsFiltering({ dates }));
    dispatch(searchedToggle(''));
    dispatch(filteredToggle());
  };

  useEffect(() => {
    const parsedDates: Date[] = allFilter?.date.map((date) =>
      parse(date, 'dd-MMM-yy hh:mm:ss a', new Date())
    );
    setValues(parsedDates);
    // dispatching if user implement the same date filter
    const formattedDates: string[] = parsedDates.map((date) =>
      new DateObject(date)
        .convert(gregorian, gregorian_en)
        .format('DD-MMM-YY hh:mm:ss a')
    );
    setDates(formattedDates);
  }, [allFilter.date]);

  const selectedQuickAccess = (title: string) => {
    let formattedDates: string[] = [];

    // Filter out the previously selected item from the selectedQuickItems array
    setSelectedQuickItems(title);

    switch (title) {
      case 'روز گذشته':
        formattedDates = [convertDate(yesterday), convertDate(today)];
        setDates(formattedDates);
        setValues([yesterday, today]);
        dispatch(dateQuickAccessHandler('روز گذشته'));
        break;

      case 'هفته گذشته':
        formattedDates = [convertDate(oneWeekAgo), convertDate(today)];
        setDates(formattedDates);
        setValues([oneWeekAgo, today]);
        dispatch(dateQuickAccessHandler('هفته گذشته'));

        break;

      case 'ماه گذشته':
        formattedDates = [convertDate(oneMonthAgo), convertDate(today)];
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
    dispatch(transactionsFiltering({ dates: [] }));
  };

  useEffect(() => {
    // Check the search item and initialize the selectedQuickItems state
    setSelectedQuickItems(datePeriod);
  }, [searchItem]);

  useEffect(() => {
    if (dates.length > 0) {
      const Dates = convertToPersianFormat(dates);
      Dates !== '' && setFromDate(Dates.split('~')[0]);
      Dates !== '' && setToDate(Dates.split('~')[1]);
    }
  }, [dates]);

  useEffect(() => {
    if (
      dates.length > 0 &&
      dates[0]?.toString() !== convertDate(yesterday) &&
      dates[0]?.toString() !== convertDate(oneWeekAgo) &&
      dates[0]?.toString() !== convertDate(oneMonthAgo)
    ) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, [dates]);

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
              className={
                selectedQuickItems === 'روز گذشته' &&
                dates[0].toString() === convertDate(yesterday)
                  ? 'selected'
                  : ''
              }
              onClick={() => selectedQuickAccess('روز گذشته')}
            >
              روز گذشته
            </span>
            <span
              className={
                selectedQuickItems === 'هفته گذشته' &&
                dates[0].toString() === convertDate(oneWeekAgo)
                  ? 'selected'
                  : ''
              }
              onClick={() => selectedQuickAccess('هفته گذشته')}
            >
              7 روز گذشته
            </span>
            <span
              className={
                selectedQuickItems === 'ماه گذشته' &&
                dates[0].toString() === convertDate(oneMonthAgo)
                  ? 'selected'
                  : ''
              }
              onClick={() => selectedQuickAccess('ماه گذشته')}
            >
              30 روز گذشته
            </span>
          </>
        </div>
        <div className='search-section search-bar'>
          <div className={`search-datePicker ${isFilled ? 'filled' : ''}`}>
            <DatePicker
              ref={datePickerRef}
              style={{
                direction: 'rtl',
              }}
              value={values}
              onChange={handleDateChange}
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
            <span
              className={`date_from ${fromDate.length !== 0 ? 'filled' : ''}`}
              onClick={() => datePickerRef.current.openCalendar()}
            >
              {fromDate !== '' ? fromDate : 'از تاریخ'}
            </span>
            <span
              className={`date_to ${toDate.length !== 0 ? 'filled' : ''}`}
              onClick={() => datePickerRef.current.openCalendar()}
            >
              {toDate !== '' ? toDate : 'تا تاریخ'}
            </span>
            <div className='icon'>
              <CalendarIcon
                onClick={() => datePickerRef.current.openCalendar()}
              />
            </div>
            <div className='divider'></div>
          </div>
        </div>
      </div>
    </>
  );
};
