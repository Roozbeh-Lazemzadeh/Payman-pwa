import { Segmented } from 'antd';
import React from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

export const PaymanSegmented: React.FC = () => {
  const navigate = useNavigate();
  const handleSelectedTab = (value: string) => {
    switch (value) {
      case 'سایر ‌هم‌پیمان‌ها':
        navigate('others');
        break;
      case 'پیمان‌های من':
        navigate('me');
        break;

      default:
        navigate('me');
        break;
    }
  };
  return (
    <Segmented
      style={{ direction: 'ltr', height: 40 }}
      options={['سایر ‌هم‌پیمان‌ها', 'پیمان‌های من']}
      block
      defaultValue={'پیمان‌های من'}
      onChange={handleSelectedTab}
    />
  );
};
