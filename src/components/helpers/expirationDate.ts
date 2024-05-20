import { parse } from 'date-fns';

const today = new Date();

export const isNearExpired = (endDate: string): boolean => {
  const parsedExpirationDate = parse(
    endDate,
    'yy-MMM-dd hh.mm.ss.SSSSSSSSS a',
    new Date()
  );
  const diffDays = Math.ceil(
    (parsedExpirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  return diffDays >= 0 && diffDays <= 10; // 7 days is the assumption
};

export const isExpired = (endDate: string): boolean => {
  const parsedExpirationDate = parse(
    endDate,
    'yy-MMM-dd hh.mm.ss.SSSSSSSSS a',
    new Date()
  );
  return parsedExpirationDate < today;
};

export const getFormattedRemainingDays = (endDate: string): string => {
  const parsedExpirationDate = parse(
    endDate,
    'yy-MMM-dd hh.mm.ss.SSSSSSSSS a',
    new Date()
  );
  const diffDays = Math.ceil(
    (parsedExpirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays <= 0) {
    return 'پایان یافته';
  } else if (diffDays <= 10) {
    return `${diffDays} روز`;
  } else {
    const monthsRemaining = Math.floor(diffDays / 30);
    const daysRemaining = diffDays % 30;
    return `${monthsRemaining} ماه و ${daysRemaining} روز`;
  }
};
