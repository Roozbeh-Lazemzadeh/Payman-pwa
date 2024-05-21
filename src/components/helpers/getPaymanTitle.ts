import { type Payman } from '../Paymans/myPaymans/MyPaymans';

export const getPaymanTitle = (
  nearExpiredPaymans: Payman[],
  otherPaymans: Payman[],
  expiredPaymans: Payman[]
) => {
  if (nearExpiredPaymans.length === 1) {
    return 'پیمان‌ رو به اتمام';
  } else if (nearExpiredPaymans.length > 1) {
    return 'پیمان‌های رو به اتمام';
  } else if (otherPaymans.length > 0) {
    return 'لیست ‌‌پیمان‌ها';
  } else if (expiredPaymans.length === 1) {
    return 'پیمان‌ منقضی شده';
  } else if (expiredPaymans.length > 0) {
    return 'پیمان‌های منقضی شده';
  } else {
    return '';
  }
};
