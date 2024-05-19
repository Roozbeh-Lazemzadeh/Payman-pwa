import React from 'react';
import { Dropdown, Space } from 'antd';
import { ReactComponent as ArrowDownIcon } from '../../icons/arrowDown2.svg';
import { useAppDispatch } from '../hooks/reduxHooks';
import { handleSortKey } from '../../store/filterPage/filterSlice';
import './style.css';
import { useLocation } from 'react-router-dom';

interface MenuItems {
  label: string;
  key: string;
  onClick: () => void;
}

export const Sort: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const pathName = location.pathname;

  const handleClick = (key: string) => {
    dispatch(handleSortKey(key));
  };
  const items: MenuItems[] = [
    {
      label: `${
        pathName === '/paymans/me' ? 'پیمان های فعال' : 'آخرین تراکنش'
      }`,
      key: '0',
      onClick: () => handleClick('0'),
    },
    {
      label: `${pathName === '/paymans/me' ? 'منقضی شده' : 'بیشترین مبلغ'}`,
      key: '1',
      onClick: () => handleClick('1'),
    },
  ];

  return (
    <Dropdown
      menu={{
        items: items.map((item) => ({
          ...item,
          onClick: () => handleClick(item.key),
        })),
        defaultSelectedKeys: ['0'],
        selectable: true,
      }}
      trigger={['click']}
    >
      <Space className='sort-wrapper'>
        <span className='title'>براساس</span>
        <ArrowDownIcon />
      </Space>
    </Dropdown>
  );
};
