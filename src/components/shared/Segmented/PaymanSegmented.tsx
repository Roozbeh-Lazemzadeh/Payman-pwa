import { Segmented } from 'antd';
import React from 'react';
import './style.css';

export const PaymanSegmented: React.FC = () => {
  return (
    <Segmented
      style={{ direction: 'ltr', height: 40 }}
      options={['سایر ‌هم‌پیمان‌ها', 'پیمان‌های من']}
      block
      defaultValue={'پیمان‌های من'}
      onChange={(value) => {
        console.log(value);
      }}
    />
  );
};
