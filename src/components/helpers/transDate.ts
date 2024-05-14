import jalaliMoment from 'jalali-moment';
import { format, parse } from 'date-fns';

export const transDate = (inputDate: string) => {
  const parsedDate = parse(
    inputDate,
    'yy-MMM-dd hh.mm.ss.SSSSSSSSS a',
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
  const parsedDate = parse(inputDate, 'yy-MMM-dd hh:mm:ss aaa', new Date());
  const formattedDate = format(parsedDate, 'yyyy-MM-dd HH:mm:ss');
  const jalaliDate = jalaliMoment(formattedDate).format('jYYYY/jMM/jDD');
  return ` ${jalaliDate}`;
};

export const jalaliDate = (inputDate: string) => {
  const jalaliDate = jalaliMoment(
    format(
      parse(inputDate, 'yy-MMM-dd hh.mm.ss.SSSSSSSSS a', new Date()),
      'yyyy-MM-dd HH:mm:ss'
    )
  ).format('jYYYY/jM');
  return jalaliDate;
};

export const jalaliDateConvert = (inputDate: string) => {
  const jalaliDate = jalaliMoment(
    format(
      parse(inputDate, 'yy-MMM-dd hh.mm.ss.SSSSSSSSS a', new Date()),
      'yyyy-MM-dd HH:mm:ss'
    )
  ).format('jYYYY/jMM');
  return jalaliDate;
};
