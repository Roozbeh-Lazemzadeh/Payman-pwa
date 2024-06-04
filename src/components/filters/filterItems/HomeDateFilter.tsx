import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as TickSquareIcon } from '../../../icons/tickSquare.svg';
import { ReactComponent as CalendarIcon } from '../../../icons/calendar.svg';
import { ReactComponent as RemoveIcon } from '../../../icons/delete.svg';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import { weekDays } from '../../types/calendar';
import gregorian from 'react-date-object/calendars/gregorian';
import { startOfDay, subDays, subWeeks, parse } from 'date-fns';
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
import useResponsiveSpace from '../../hooks/useResponsiveSpace';
import { selectSelectedMonth } from '../../../store/monthlyBill/monthlyBillSlice';

// style
import '../../Paymans/otherPaymans/style.css';
import '../style.css';

export const HomeDateFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const datePickerRef = useRef<any>(null);
  const allFilter = useAppSelector(selectAllFilter);
  const searchItem = useAppSelector(selectSearchItem);
  const datePeriod = useAppSelector(selectDatePeriod);
  const [dates, setDates] = useState<string[]>([]);
  const [selectedQuickItems, setSelectedQuickItems] = useState<string>('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const { spaceCount, dateSpace, inputRef } = useResponsiveSpace();
  const month = useAppSelector(selectSelectedMonth);

  // Use fallback values if month is null
  const initialFirstDay =
    (month && new Date(Date.parse(month?.firstDayOfMonth))) ?? new Date();
  const initialLastDay =
    (month && new Date(Date.parse(month?.lastDayOfMonth))) ?? new Date();

  const [values, setValues] = useState<Date[]>([
    initialFirstDay,
    initialLastDay,
  ]);
  const handleDateChange = (dates: DateObject[]) => {
    if (dates) {
      const formattedDates: string[] = dates.map((date) =>
        new DateObject(date)
          .convert(gregorian, gregorian_en)
          .format('DD-MMM-YY hh:mm:ss a')
      );
      if (formattedDates.length === 1) {
        const currentDate = new DateObject(new Date())
          .convert(gregorian, gregorian_en)
          .format('DD-MMM-YY hh:mm:ss a');
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
    dispatch(searchedToggle(''));
    dispatch(filteredToggle());
    dispatch(transactionsFiltering({ dates }));
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
    const today = startOfDay(new Date());
    const yesterday = subDays(today, 1);
    const threeDaysAgo = subDays(today, 3);
    const oneWeekAgo = subWeeks(today, 1);
    // Filter out the previously selected item from the selectedQuickItems array
    setSelectedQuickItems(title);

    switch (title) {
      case 'روز گذشته':
        formattedDates = [
          new DateObject(yesterday)
            .convert(gregorian, gregorian_en)
            .format('DD-MMM-YY hh:mm:ss a'),
          new DateObject(today)
            .convert(gregorian, gregorian_en)
            .format('DD-MMM-YY hh:mm:ss a'),
        ];
        setDates(formattedDates);
        setValues([yesterday, today]);
        dispatch(dateQuickAccessHandler('روز گذشته'));
        break;

      case '۳ روز گذشته':
        formattedDates = [
          new DateObject(threeDaysAgo)
            .convert(gregorian, gregorian_en)
            .format('DD-MMM-YY hh:mm:ss a'),
          new DateObject(today)
            .convert(gregorian, gregorian_en)
            .format('DD-MMM-YY hh:mm:ss a'),
        ];
        setDates(formattedDates);
        setValues([threeDaysAgo, today]);
        dispatch(dateQuickAccessHandler('۳ روز گذشته'));

        break;

      case 'هفته گذشته':
        formattedDates = [
          new DateObject(oneWeekAgo)
            .convert(gregorian, gregorian_en)
            .format('DD-MMM-YY hh:mm:ss a'),
          new DateObject(today)
            .convert(gregorian, gregorian_en)
            .format('DD-MMM-YY hh:mm:ss a'),
        ];
        setDates(formattedDates);
        setValues([oneWeekAgo, today]);
        dispatch(dateQuickAccessHandler('هفته گذشته'));

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

  // // Function to get the value of the input field
  // const getInputValue = () => {
  //   if (datePickerRef.current) {
  //     const inputElement = datePickerRef.current.querySelector('.rmdp-input');
  //     if (inputElement) {
  //       console.log(inputElement.value);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   // Example usage of getInputValue function
  //   getInputValue();
  //   console.log(dates);
  // }, [dates]);

  // Function to convert the dates to Persian format
  const convertToPersianFormat = (dates: string[]) => {
    if (!dates.length) return '';

    const persianDates = dates.map((dateString) => {
      const dateObject = new DateObject(
        parse(dateString, 'dd-MMM-yy hh:mm:ss a', new Date())
      );
      return dateObject.convert(persian, persian_fa).format('YYYY/MM/DD');
    });

    return `${persianDates[0]}~${persianDates[1]}`;
  };

  useEffect(() => {
    if (dates.length > 0) {
      const Dates = convertToPersianFormat(dates);
      Dates !== '' && setFromDate(Dates.split('~')[0]);
      Dates !== '' && setToDate(Dates.split('~')[1]);
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
              className={selectedQuickItems === 'روز گذشته' ? 'selected' : ''}
              onClick={() => selectedQuickAccess('روز گذشته')}
            >
              روز گذشته
            </span>
            <span
              className={selectedQuickItems === '۳ روز گذشته' ? 'selected' : ''}
              onClick={() => selectedQuickAccess('۳ روز گذشته')}
            >
              ۳ روز گذشته
            </span>
            <span
              className={selectedQuickItems === 'هفته گذشته' ? 'selected' : ''}
              onClick={() => selectedQuickAccess('هفته گذشته')}
            >
              ۷ روز گذشته
            </span>
          </>
        </div>
        <div className='search-section search-bar'>
          <div className='search-datePicker' ref={inputRef}>
            <DatePicker
              ref={datePickerRef}
              placeholder={`از تاریخ${' '.repeat(spaceCount)}تا تاریخ`}
              style={{
                direction: 'rtl',
              }}
              value={values}
              onChange={handleDateChange}
              dateSeparator={' '.repeat(dateSpace)}
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
              minDate={month?.firstDayOfMonth}
              maxDate={month?.lastDayOfMonth}
              currentDate={new DateObject(initialFirstDay)} // Set the initial view to the startDate
            />
            <span className='date_from'>{fromDate}</span>
            <span className='date_to'>{toDate}</span>
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
