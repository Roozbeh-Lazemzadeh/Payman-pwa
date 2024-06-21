import jalaliMoment from 'jalali-moment';
import { format, parse } from 'date-fns';
import { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';

export const transDate = (inputDate: string) => {
  const parsedDate = parse(
    inputDate,
    'dd-MMM-yy hh.mm.ss.SSSSSSSSS a',
    new Date()
  );
  const formattedDate = format(parsedDate, 'yyyy-MM-dd HH:mm:ss');
  const jalaliDate = jalaliMoment(formattedDate).format(
    'jYYYY/jMM/jDD - HH:mm:ss'
  );
  const weekday = jalaliMoment(formattedDate).locale('fa').format('dddd');
  return `${weekday} ، ${jalaliDate}`;
};

export const filterConvertDate = (inputDate: string) => {
  const parsedDate = parse(inputDate, 'dd-MMM-yy hh:mm:ss aaa', new Date());
  const formattedDate = format(parsedDate, 'yyyy-MM-dd HH:mm:ss');
  const jalaliDate = jalaliMoment(formattedDate).format('jYYYY/jMM/jDD');
  return ` ${jalaliDate}`;
};

export const jalaliDate = (inputDate: string) => {
  const jalaliDate = jalaliMoment(
    format(
      parse(inputDate, 'dd-MMM-yy hh.mm.ss.SSSSSSSSS a', new Date()),
      'yyyy-MM-dd HH:mm:ss'
    )
  ).format('jYYYY/jM');
  return jalaliDate;
};

export const jalaliDateConvert = (inputDate: string) => {
  const jalaliDate = jalaliMoment(
    format(
      parse(inputDate, 'dd-MMM-yy hh.mm.ss.SSSSSSSSS a', new Date()),
      'yyyy-MM-dd HH:mm:ss'
    )
  ).format('jYYYY/jMM');
  return jalaliDate;
};

export const paymanTransDate = (inputDate: string) => {
  const parsedDate = parse(
    inputDate,
    'dd-MMM-yy hh.mm.ss.SSSSSSSSS a',
    new Date()
  );
  const formattedDate = format(parsedDate, 'yyyy-MM-dd HH:mm:ss');
  const jalaliDate = jalaliMoment(formattedDate).format('jYY / jMM / jDD');
  return jalaliDate;
};

// Function to convert the dates to Persian format
export const convertToPersianFormat = (dates: string[]) => {
  if (!dates.length) return '';

  const persianDates = dates.map((dateString) => {
    const dateObject = new DateObject(
      parse(dateString, 'dd-MMM-yy hh:mm:ss a', new Date())
    );
    return dateObject.convert(persian, persian_fa).format('YYYY/MM/DD');
  });

  return `${persianDates[0]}~${persianDates[1]}`;
};

export const convertDate = (date: Date) => {
  return new DateObject(date)
    .convert(gregorian, gregorian_en)
    .format('DD-MMM-YY hh:mm:ss a');
};
