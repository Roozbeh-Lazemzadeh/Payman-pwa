import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as TickSquareIcon } from '../../../icons/tickSquare.svg';
import { ReactComponent as CalendarIcon } from '../../../icons/calendar.svg';
import { ReactComponent as RemoveIcon } from '../../../icons/delete.svg';
import { Segmented } from 'antd';
import { parse } from 'date-fns';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import { weekDays } from '../../types/calendar';
import gregorian from 'react-date-object/calendars/gregorian';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import {
  dateHandler,
  dateQuickAccessHandler,
  endingDateHandler,
  transactionsFiltering,
  selectAllFilter,
  paymansFiltering,
} from '../../../store/filterPage/filterSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  filteredToggle,
  searchedToggle,
} from '../../../store/filterMenu/filterMenuSlice';
import { useLocation } from 'react-router-dom';

// style
import '../style.css';
import '../../Paymans/otherPaymans/style.css';
import { convertDate, convertToPersianFormat } from '../../helpers/transDate';

export const PaymanDateFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const datePickerRef = useRef<any>(null);
  const allFilter = useAppSelector(selectAllFilter);
  const [startingDates, setStartingDates] = useState<string[]>([]);
  const [endingDates, setEndingDates] = useState<string[]>([]);
  const [viewStartingPayman, setViewStartingPayman] = useState<string[]>([]);
  const [viewEndingPayman, setViewEndingPayman] = useState<string[]>([]);
  const [isStartingFilled, setIsStartingFilled] = useState(false);
  const [isEndingFilled, setIsEndingFilled] = useState(false);
  const [selectedDateTab, setSelectedDateTab] = useState('start');
  const [dateValues, setDateValues] = useState<{
    startingDateValues: Date[];
    endingDateValues: Date[];
  }>({
    startingDateValues: [],
    endingDateValues: [],
  });

  const handleDateChange = (dates: DateObject | DateObject[] | null) => {
    if (dates) {
      const formattedDates: string[] = Array.isArray(dates)
        ? dates.map((date: DateObject) =>
            new DateObject(date)
              .convert(gregorian, gregorian_en)
              .format('DD-MMM-YY hh:mm:ss a')
          )
        : [
            new DateObject(dates)
              .convert(gregorian, gregorian_en)
              .format('DD-MMM-YY hh:mm:ss a'),
          ];

      // Check if only one date is selected and if it's in the future
      if (formattedDates.length === 1) {
        const parsedDate = parse(
          formattedDates[0],
          'dd-MMM-yy hh:mm:ss a',
          new Date()
        );
        const currentDate = new Date(); // current date as Date object

        const isFutureDate = parsedDate > currentDate; // Compare the actual Date objects
        if (isFutureDate) {
          formattedDates.unshift(convertDate(currentDate));
        } else {
          formattedDates.push(convertDate(currentDate));
        }
      }

      if (selectedDateTab === 'start') {
        setStartingDates(formattedDates);
        setDateValues((prevValues) => ({
          ...prevValues,
          startingDateValues: Array.isArray(dates)
            ? dates.map((date) => new DateObject(date).toDate())
            : [new DateObject(dates).toDate()],
        }));
      } else {
        setEndingDates(formattedDates);
        setDateValues((prevValues) => ({
          ...prevValues,
          endingDateValues: Array.isArray(dates)
            ? dates.map((date) => new DateObject(date).toDate())
            : [new DateObject(dates).toDate()],
        }));
      }
    }
  };

  useEffect(() => {
    // starting date
    const startingParsedDates: Date[] = allFilter.date.map((date) =>
      parse(date, 'dd-MMM-yy hh:mm:ss a', new Date())
    );
    const startingFormattedDates: string[] = startingParsedDates.map((date) =>
      convertDate(date)
    );
    setStartingDates(startingFormattedDates);
    setDateValues((prevValues) => ({
      ...prevValues,
      startingDateValues: startingParsedDates,
    }));
  }, [allFilter.date]);

  useEffect(() => {
    // ending date
    const endingParsedDates: Date[] = allFilter.endingDate.map((date) =>
      parse(date, 'dd-MMM-yy hh:mm:ss a', new Date())
    );
    const endingFormattedDates: string[] = endingParsedDates.map((date) =>
      convertDate(date)
    );
    setEndingDates(endingFormattedDates);
    setDateValues((prevValues) => ({
      ...prevValues,
      endingDateValues: endingParsedDates,
    }));
  }, [allFilter.endingDate]);

  const handleDateFilter = () => {
    if (startingDates.length === 0 && endingDates.length === 0) return null;
    dispatch(dateHandler(startingDates));
    dispatch(endingDateHandler(endingDates));
    dispatch(searchedToggle(''));
    dispatch(filteredToggle());
    dispatch(
      paymansFiltering({ dates: startingDates, endingDate: endingDates })
    );
  };

  const handleRemoveFilter = () => {
    if (startingDates.length === 0 && endingDates.length === 0) return null;
    dispatch(dateHandler([]));
    dispatch(endingDateHandler([]));
    dispatch(searchedToggle(''));
    dispatch(filteredToggle());
    dispatch(dateQuickAccessHandler(''));
    location.pathname === '/paymans/me'
      ? dispatch(paymansFiltering({ dates: [] }))
      : dispatch(transactionsFiltering({ dates: [] }));
  };

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

  useEffect(() => {
    if (startingDates.length > 0) {
      const Dates = convertToPersianFormat(startingDates);
      const splitDates = Dates.split('~');
      if (splitDates.length > 0) {
        setViewStartingPayman([splitDates[0], splitDates[1]]);
      }
      // border of the input
      setIsStartingFilled(true);
      console.log('start');
    }
    if (endingDates.length > 0) {
      const Dates = convertToPersianFormat(endingDates);
      const splitDates = Dates.split('~');
      if (splitDates.length > 0) {
        setViewEndingPayman([splitDates[0], splitDates[1]]);
      }
      // border of the input
      setIsEndingFilled(true);
    }
  }, [startingDates, endingDates]);

  return (
    <>
      <div className='implement-remove-wrapper'>
        <div
          className={`remove-button ${
            startingDates.length === 0 && endingDates.length === 0
              ? 'disabled'
              : ''
          }`}
          onClick={handleRemoveFilter}
        >
          <RemoveIcon />
          <span>حذف فیلتر</span>
        </div>
        <div
          className={`implement-button half ${
            startingDates.length === 0 && endingDates.length === 0
              ? 'disabled'
              : ''
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
            style={{ direction: 'ltr', height: 30 }}
            options={['پایان', 'شروع']}
            block
            defaultValue={'شروع'}
            onChange={handleSelectedTab}
          />
        </div>
        <div className='search-section search-bar'>
          <div
            className={`search-datePicker payman ${
              (selectedDateTab === 'start' && isStartingFilled) ||
              (selectedDateTab !== 'start' && isEndingFilled)
                ? 'filled'
                : ''
            }`}
          >
            <DatePicker
              ref={datePickerRef}
              style={{ direction: 'rtl', fontSize: 12 }}
              value={
                selectedDateTab === 'start'
                  ? dateValues.startingDateValues
                  : dateValues.endingDateValues
              }
              onChange={(dates) => handleDateChange(dates)}
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
            {selectedDateTab === 'start' ? (
              <>
                <span
                  className={`date_from ${
                    viewStartingPayman.length === 0 ? 'payman' : 'filled'
                  }`}
                  onClick={() => datePickerRef.current.openCalendar()}
                >
                  {viewStartingPayman.length > 0
                    ? viewStartingPayman[0]
                    : ' شروع پیمان از تاریخ'}
                </span>
                <span
                  className={`date_to ${
                    viewStartingPayman.length === 0 ? 'payman' : 'filled'
                  }`}
                  onClick={() => datePickerRef.current.openCalendar()}
                >
                  {viewStartingPayman.length > 0
                    ? viewStartingPayman[1]
                    : ' شروع پیمان تا تاریخ'}
                </span>
              </>
            ) : (
              <>
                <span
                  className={`date_from ${
                    viewEndingPayman.length === 0 ? 'payman' : 'filled'
                  }`}
                  onClick={() => datePickerRef.current.openCalendar()}
                >
                  {viewEndingPayman.length > 0
                    ? viewEndingPayman[0]
                    : ' پایان پیمان از تاریخ'}
                </span>
                <span
                  className={`date_to ${
                    viewEndingPayman.length === 0 ? 'payman' : 'filled'
                  }`}
                  onClick={() => datePickerRef.current.openCalendar()}
                >
                  {viewEndingPayman.length > 0
                    ? viewEndingPayman[1]
                    : ' پایان پیمان تا تاریخ'}
                </span>
              </>
            )}

            <div className='icon'>
              <CalendarIcon
                onClick={() => datePickerRef.current.openCalendar()}
              />
            </div>
            <div className='divider payman'></div>
          </div>
        </div>
      </div>
    </>
  );
};
