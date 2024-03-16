import React from 'react';
import FilterTools from '../../template/FilterTools';
import './style.css';

export const ExpiredPaymansSection: React.FC = () => {
  return (
    <div className="payman-filter-title">
      <FilterTools title="پیمان‌های رو به اتمام" />
    </div>
  );
};
