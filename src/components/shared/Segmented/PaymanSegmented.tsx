import { Segmented } from 'antd';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// style
import './style.css';

export const PaymanSegmented: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const [move, setMove] = useState(false);

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
      className={`payman-segmented ${move ? 'move' : ''}`}
      style={{ direction: 'ltr', height: 40, marginBottom: '1.2rem' }}
      options={['سایر ‌هم‌پیمان‌ها', 'پیمان‌های من']}
      block
      defaultValue={showDefaultValue}
      onChange={handleSelectedTab}
      onClick={() => setMove(false)}
      onTouchMove={() => setMove(true)}
    />
  );
};
