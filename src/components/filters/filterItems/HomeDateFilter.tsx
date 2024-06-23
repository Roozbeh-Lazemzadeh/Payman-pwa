import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { ReactComponent as TickSquareIcon } from '../../../icons/tickSquare.svg';
import { ReactComponent as CalendarIcon } from '../../../icons/calendar.svg';
import { ReactComponent as RemoveIcon } from '../../../icons/delete.svg';
import { ReactComponent as InfoIcon } from '../../../icons/yellowInfo.svg';
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
import { selectSelectedMonth } from '../../../store/monthlyBill/monthlyBillSlice';

// helper
import { convertDate, convertToPersianFormat } from '../../helpers/transDate';

// style
import '../../Paymans/otherPaymans/style.css';
import '../style.css';
import { showNotifyToast } from '../../shared/Toast/CustomToast';

export const HomeDateFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const datePickerRef = useRef<any>(null);
  const allFilter = useAppSelector(selectAllFilter);
  const searchItem = useAppSelector(selectSearchItem);
  const datePeriod = useAppSelector(selectDatePeriod);
  const [dates, setDates] = useState<string[]>([]);
  const [selectedQuickItems, setSelectedQuickItems] = useState<string>('');
  const [isFilled, setIsFilled] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const month = useAppSelector(selectSelectedMonth);

  // Use fallback values if month is null
  const initialFirstDay =
    (month && new Date(Date.parse(month?.firstDayOfMonth))) ?? new Date();
  const initialLastDay =
    (month && new Date(Date.parse(month?.lastDayOfMonth))) ?? new Date();

  const [values, setValues] = useState<Date[]>([
    // initialFirstDay,
    // initialLastDay,
  ]);
  const today = startOfDay(new Date());
  const yesterday = subDays(today, 1);
  const threeDaysAgo = subDays(today, 3);
  const oneWeekAgo = subWeeks(today, 1);

  const handleDateChange = (dates: DateObject[]) => {
    if (dates) {
      const formattedDates: string[] = dates.map((date) =>
        new DateObject(date)
          .convert(gregorian, gregorian_en)
          .format('DD-MMM-YY hh:mm:ss a')
      );
      if (formattedDates.length === 1) {
        const lastDateOfMonth = convertDate(initialLastDay);
        formattedDates.push(lastDateOfMonth);
        setDates(formattedDates);
        setValues([dates[0].toDate(), initialLastDay]);
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
    if (allFilter?.date.length > 0) {
      const parsedDates: Date[] = allFilter?.date.map((date) =>
        parse(date, 'dd-MMM-yy hh:mm:ss a', new Date())
      );
      setValues(parsedDates);
      // dispatching if user implement the same date filter
      const formattedDates: string[] = parsedDates.map((date) =>
        convertDate(date)
      );
      setDates(formattedDates);
    }
  }, [allFilter.date]);

  const selectedQuickAccess = (title: string) => {
    if (month?.id !== 0) {
      return showNotifyToast(
        'فقط قابل اجرا در ماه جاری می باشد.',
        <InfoIcon />
      );
    }
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

      case '۳ روز گذشته':
        formattedDates = [convertDate(threeDaysAgo), convertDate(today)];
        setDates(formattedDates);
        setValues([threeDaysAgo, today]);
        dispatch(dateQuickAccessHandler('۳ روز گذشته'));

        break;

      case 'هفته گذشته':
        formattedDates = [convertDate(oneWeekAgo), convertDate(today)];
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
    if (allFilter.date.length > 0) {
      setSelectedQuickItems(datePeriod);
    }
  }, [searchItem, allFilter.date]);

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
      dates[0]?.toString() !== convertDate(threeDaysAgo) &&
      dates[0]?.toString() !== convertDate(oneWeekAgo)
    ) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, [dates]);

  return (
    <>
      <ToastContainer />
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
              className={[
                month?.id !== 0 ? 'disabled' : '',
                selectedQuickItems === 'روز گذشته' &&
                dates[0].toString() === convertDate(yesterday)
                  ? 'selected'
                  : '',
              ]
                .join(' ')
                .trim()}
              onClick={() => selectedQuickAccess('روز گذشته')}
            >
              روز گذشته
            </span>
            <span
              className={
                selectedQuickItems === '۳ روز گذشته' &&
                dates[0].toString() === convertDate(threeDaysAgo)
                  ? 'selected'
                  : ''
              }
              onClick={() => selectedQuickAccess('۳ روز گذشته')}
            >
              ۳ روز گذشته
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
              ۷ روز گذشته
            </span>
          </>
        </div>
        <div className='search-section search-bar'>
          <div className={`search-datePicker ${isFilled ? 'filled' : ''}`}>
            <DatePicker
              key={values.toString()}
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
              minDate={month?.firstDayOfMonth}
              maxDate={month?.lastDayOfMonth}
              currentDate={new DateObject(initialFirstDay)} // Set the initial view to the startDate
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
