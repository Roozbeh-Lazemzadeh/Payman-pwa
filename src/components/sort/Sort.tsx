import React from 'react';
import { Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';
import { ReactComponent as ArrowDownIcon } from '../../icons/arrowDown2.svg';
import './style.css';

export const Sort: React.FC = () => {
  const items: MenuProps['items'] = [
    {
      label: 'آخرین تراکنش',
      key: '0',
    },
    {
      label: 'بیشترین مبلغ',
      key: '1',
    },
  ];
  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <Space className="sort-wrapper">
        <span className="title">براساس</span>
        <ArrowDownIcon />
      </Space>
    </Dropdown>
  );
};
