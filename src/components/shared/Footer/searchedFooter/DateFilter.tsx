import React, { useState } from 'react';
import { ReactComponent as TickSquareIcon } from '../../../../icons/tickSquare.svg';
import { ReactComponent as CalendarIcon } from '../../../../icons/calendar.svg';
import { ReactComponent as RemoveIcon } from '../../../../icons/delete.svg';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import { weekDays } from '../../../types/calendar';
import gregorian from 'react-date-object/calendars/gregorian';

import '../../../Paymans/otherPaymans/style.css';
import '../style.css';
import {
  dateHandler,
  selectAllFilter,
} from '../../../../store/filter/filterSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';

export const DateFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const allFilter = useAppSelector(selectAllFilter);
  const [values, setValues] = useState([
    // new DateObject({ calendar: gregorian }),
    // new DateObject({ calendar: gregorian }).add(2, 'day'),
  ]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedQuickItems, setSelectedQuickItems] = useState<string[]>([]);

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
        dispatch(dateHandler(formattedDates));
      }
    } else {
      setValues([]);
    }
  };

  return (
    <>
      {}
      <div className='implement-remove-wrapper'>
        <div
          className={`remove-button ${
            allFilter.date.length === 0 ? 'disabled' : ''
          }`}
        >
          <RemoveIcon />
          <span>حذف فیلتر</span>
        </div>
        <div
          className={`implement-button half ${
            allFilter.date.length === 0 ? 'disabled' : ''
          }`}
        >
          <TickSquareIcon />
          <span>اعمال</span>
        </div>
      </div>

      <div className='searched-footer-content'>
        <div className='quick-access-section'>
          {/* date  */}
          <>
            <span>روز گذشته</span>
            <span>هفته گذشته</span>
            <span>ماه گذشته</span>
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
