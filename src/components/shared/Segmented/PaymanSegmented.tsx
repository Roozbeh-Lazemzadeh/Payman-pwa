import { Segmented } from 'antd';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import { useAppDispatch } from '../../hooks/reduxHooks';
// import { removeAllFiltersHandler } from '../../../store/filterPage/filterSlice';

import './style.css';

export const PaymanSegmented: React.FC = () => {
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  // Check if the URL includes 'paymans/me' or 'paymans/other'
  let showDefaultValue;
  switch (pathname) {
    case '/paymans':
      showDefaultValue = 'پیمان‌های من';
      break;
    case '/paymans/me':
      showDefaultValue = 'پیمان‌های من';
      break;
    case '/paymans/others':
      showDefaultValue = 'سایر ‌هم‌پیمان‌ها';
      break;

    default:
      break;
  }

  const handleSelectedTab = (value: string) => {
    switch (value) {
      case 'سایر ‌هم‌پیمان‌ها':
        // dispatch(removeAllFiltersHandler());
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
      style={{ direction: 'ltr', height: 40, transition: 'none' }}
      options={['سایر ‌هم‌پیمان‌ها', 'پیمان‌های من']}
      block
      defaultValue={showDefaultValue}
      onChange={handleSelectedTab}
    />
  );
};
