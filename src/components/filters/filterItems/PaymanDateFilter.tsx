/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import { ReactComponent as TickSquareIcon } from '../../../icons/tickSquare.svg';
import { ReactComponent as CalendarIcon } from '../../../icons/calendar.svg';
import { ReactComponent as RemoveIcon } from '../../../icons/delete.svg';
import { Segmented } from 'antd';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import { weekDays } from '../../types/calendar';
import gregorian from 'react-date-object/calendars/gregorian';
import { parse } from 'date-fns';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import {
  dateHandler,
  dateQuickAccessHandler,
  endingDateHandler,
  handleListFiltering,
  selectAllFilter,
} from '../../../store/filterPage/filterSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  filteredToggle,
  searchedToggle,
} from '../../../store/filterMenu/filterMenuSlice';

import '../../Paymans/otherPaymans/style.css';
import '../style.css';

export const PaymanDateFilter: React.FC = () => {
  const dispatch = useAppDispatch();
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
  // const memoizedStartingDate = useMemo(() => allFilter.date, [allFilter.date]);
  // const memoizedEndingDate = useMemo(
  //   () => allFilter.endingDate,
  //   [allFilter.endingDate]
  // );
  console.log(allFilter);
  console.log('startingDates', startingDates);

  const handleDateChange = (dates: DateObject | DateObject[] | null) => {
    if (dates) {
      const formattedDates: string[] = Array.isArray(dates)
        ? dates.map((date: DateObject) =>
            new DateObject(date)
              .convert(gregorian, gregorian_en)
              .format('YY-MMM-DD hh:mm:ss a')
          )
        : [
            new DateObject(dates)
              .convert(gregorian, gregorian_en)
              .format('YY-MMM-DD hh:mm:ss a'),
          ];

      if (formattedDates.length === 1) {
        const currentDate = new DateObject(new Date())
          .convert(gregorian, gregorian_en)
          .format('YY-MMM-DD hh:mm:ss a');
        formattedDates.push(currentDate);
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

  const handleDateFilter = () => {
    // if (startingDates.length === 0 && endingDates.length === 0) return null;
    dispatch(dateHandler(startingDates));
    dispatch(endingDateHandler(endingDates));

    // dispatch(handleListFiltering({ startingDates }));
    dispatch(searchedToggle(''));
    dispatch(filteredToggle());
  };

  useEffect(() => {
    console.log('allFilter.date:', allFilter.date);
    console.log('allFilter.endingDate:', allFilter.endingDate);
    // starting date
    const startingParsedDates: Date[] = allFilter?.date.map((date) =>
      parse(date, 'yy-MMM-dd hh:mm:ss a', new Date())
    );
    console.log(startingParsedDates);
    const startingFormattedDates: string[] = startingParsedDates.map((date) =>
      new DateObject(date)
        .convert(gregorian, gregorian_en)
        .format('YY-MMM-DD hh:mm:ss a')
    );
    console.log(startingFormattedDates);

    setStartingDates(startingFormattedDates);
    setDateValues({
      startingDateValues: startingParsedDates,
      endingDateValues: dateValues.endingDateValues,
    });

    // ending date
    const endingParsedDates: Date[] = allFilter?.endingDate.map((date) =>
      parse(date, 'yy-MMM-dd hh:mm:ss a', new Date())
    );
    const endingFormattedDates: string[] = endingParsedDates.map((date) =>
      new DateObject(date)
        .convert(gregorian, gregorian_en)
        .format('YY-MMM-DD hh:mm:ss a')
    );
    setEndingDates(endingFormattedDates);
    setDateValues({
      startingDateValues: dateValues.startingDateValues,
      endingDateValues: endingParsedDates,
    });
  }, []);

  const handleRemoveFilter = () => {
    if (startingDates.length === 0) return null;
    setStartingDates([]);
    // setStartingDateValues([]);
    dispatch(dateHandler([]));
    dispatch(searchedToggle(''));
    dispatch(filteredToggle());
    dispatch(dateQuickAccessHandler(''));
    dispatch(handleListFiltering({ dates: [] }));
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
  console.log(selectedDateTab);
  return (
    <>
      <div className='implement-remove-wrapper'>
        <div
          className={`remove-button ${
            startingDates.length === 0 ? 'disabled' : ''
          }`}
          onClick={handleRemoveFilter}
        >
          <RemoveIcon />
          <span>حذف فیلتر</span>
        </div>
        <div
          className={`implement-button half ${
            startingDates.length === 0 ? 'disabled' : ''
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
                  ? 'شروع پیمان از تاریخ   شروع پیمان تا تاریخ'
                  : 'پایان پیمان از تاریخ    پایان پیمان تا تاریخ'
              }
              style={{ direction: 'rtl', fontSize: 12 }}
              value={
                selectedDateTab === 'start'
                  ? dateValues.startingDateValues
                  : dateValues.endingDateValues
              }
              onChange={(dates) => handleDateChange(dates)}
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
            <div className='divider payman'></div>
          </div>
        </div>
      </div>
    </>
  );
};
