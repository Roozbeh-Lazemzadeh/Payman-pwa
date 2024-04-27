import React, { useState } from 'react';
import { Dropdown, Space } from 'antd';
import { ReactComponent as ArrowDownIcon } from '../../icons/arrowDown2.svg';
import './style.css';

interface SortProps {
  onSortChange?: (keyNum: string) => void; // Define the onSortChange event handler
}

export const Sort: React.FC<SortProps> = ({ onSortChange }) => {
  const [, setSelectedKey] = useState<string>('0');

  const handleClick = (key: string) => {
    setSelectedKey(() => {
      return key; // Update selected key
    });
    if (onSortChange) {
      onSortChange(key);
    }
  };

  interface MenuItems {
    label: string;
    key: string;
    onClick: () => void;
  }

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
      <Space className="sort-wrapper">
        <span className="title">براساس</span>
        <ArrowDownIcon />
      </Space>
    </Dropdown>
  );
};
