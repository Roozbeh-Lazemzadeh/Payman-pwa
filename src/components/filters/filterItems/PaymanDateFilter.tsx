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
import useResponsiveSpace from '../../hooks/useResponsiveSpace';

import '../style.css';
import '../../Paymans/otherPaymans/style.css';

export const PaymanDateFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const datePickerRef = useRef<any>(null);
  const allFilter = useAppSelector(selectAllFilter);
  const [startingDates, setStartingDates] = useState<string[]>([]);
  const [endingDates, setEndingDates] = useState<string[]>([]);
  const [selectedDateTab, setSelectedDateTab] = useState('start');
  const [dateValues, setDateValues] = useState<{
    startingDateValues: Date[];
    endingDateValues: Date[];
  }>({
    startingDateValues: [],
    endingDateValues: [],
  });
  // const { spaceCount, dateSpace } = useResponsiveSpace();
  const { spaceCount, dateSpace, inputRef } = useResponsiveSpace();
  console.log(spaceCount, dateSpace, inputRef);

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
          formattedDates.unshift(
            new DateObject(currentDate)
              .convert(gregorian, gregorian_en)
              .format('DD-MMM-YY hh:mm:ss a')
          );
        } else {
          formattedDates.push(
            new DateObject(currentDate)
              .convert(gregorian, gregorian_en)
              .format('DD-MMM-YY hh:mm:ss a')
          );
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
      new DateObject(date)
        .convert(gregorian, gregorian_en)
        .format('DD-MMM-YY hh:mm:ss a')
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
      new DateObject(date)
        .convert(gregorian, gregorian_en)
        .format('DD-MMM-YY hh:mm:ss a')
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
            style={{ direction: 'ltr', height: 30, transition: 'none' }}
            options={['پایان', 'شروع']}
            block
            defaultValue={'شروع'}
            onChange={handleSelectedTab}
          />
        </div>
        <div className='search-section search-bar'>
          <div className='search-datePicker payman' ref={inputRef}>
            <DatePicker
              ref={datePickerRef}
              placeholder={
                selectedDateTab === 'start'
                  ? `شروع پیمان از تاریخ${' '.repeat(
                      spaceCount
                    )}شروع پیمان تا تاریخ`
                  : `پایان پیمان از تاریخ${' '.repeat(
                      spaceCount
                    )}پایان پیمان تا تاریخ`
              }
              style={{ direction: 'rtl', fontSize: 12 }}
              value={
                selectedDateTab === 'start'
                  ? dateValues.startingDateValues
                  : dateValues.endingDateValues
              }
              onChange={(dates) => handleDateChange(dates)}
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
            />
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
