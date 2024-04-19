import React from 'react';
import { Dropdown, Space } from 'antd';
// import type { MenuProps } from 'antd';
import { ReactComponent as ArrowDownIcon } from '../../icons/arrowDown2.svg';
import './style.css';

interface SortProps {
  onSortChange?: (criteria: string) => void; // Define the onSortChange event handler
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Sort: React.FC<SortProps> = ({ onSortChange }) => {
  const handleClick = (key: string) => {
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
      onClick: () => handleClick('0'), // Here we provide an anonymous function to call handleClick('0')
    },
    {
      label: 'بیشترین مبلغ',
      key: '1',
      onClick: () => handleClick('1'), // Assuming handleClick is a function defined elsewhere
    },
  ];

  return (
    <Dropdown
      menu={{
        items: items.map((item) => ({
          ...item,
          onClick: () => handleClick(item.key),
        })),
      }}
      trigger={['click']}
    >
      {/* Call the onSelect event with the selected key */}
      <Space className="sort-wrapper">
        <span className="title">براساس</span>
        <ArrowDownIcon />
      </Space>
    </Dropdown>
  );
};
