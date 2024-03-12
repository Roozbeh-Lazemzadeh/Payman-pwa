import React from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { ReactComponent as LeftArrowIcon } from '../../icons/arrowLeft2.svg';
import './style.css';

interface CollapseItem {
  label: string;
  text: string;
  key: string;
}

interface CustomCollapseProps {
  list: CollapseItem[];
}

export const CustomCollapse: React.FC<CustomCollapseProps> = ({ list }) => {
  const items: CollapseProps['items'] = list.map((item) => ({
    key: item.key,
    label: item.label,
    children: <span>{item.text}</span>,
  }));

  return (
    <>
      <Collapse
        ghost
        accordion
        style={{ background: '#fff' }}
        // defaultActiveKey={['1']}
        items={items}
        expandIcon={({ isActive }) => (
          <LeftArrowIcon
            style={{ transform: isActive ? 'rotate(-90deg)' : 'rotate(0)' }}
          />
        )}
      />
    </>
  );
};
