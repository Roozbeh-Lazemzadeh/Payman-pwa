import React from 'react';
import './style.css';
import { OtherPaymansCard } from '../../shared/Cards/OtherPaymansCard';

export const OtherPaymans: React.FC = () => {
  return (
    <div>
      <span>سایر ‌‌پیمان‌ها</span>
      <OtherPaymansCard />
    </div>
  );
};
