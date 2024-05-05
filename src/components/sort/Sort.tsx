import React from 'react';
import { Dropdown, Space } from 'antd';
import { ReactComponent as ArrowDownIcon } from '../../icons/arrowDown2.svg';
import { useAppDispatch } from '../hooks/reduxHooks';
import { handleSortKey } from '../../store/filterPage/transactionFilterSlice';
import './style.css';

interface MenuItems {
  label: string;
  key: string;
  onClick: () => void;
}

export const Sort: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleClick = (key: string) => {
    dispatch(handleSortKey(key));
  };
  const items: MenuItems[] = [
    {
      label: 'آخرین تراکنش',
      key: '0',
      onClick: () => handleClick('0'),
    },
    {
      label: 'بیشترین مبلغ',
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
