import React, { type FC } from 'react';
import { Sort } from '../sort/Sort';
import { Filter } from '../filter/Filter';

interface FilterToolsProps {
  title: string;
}

const FilterTools: FC<FilterToolsProps> = ({ title }) => {
  return (
    <div className='filter-tools-wrapper'>
      <p className='filter-tools-title'>{title}</p>
      <div className='filter-tools-component'>
        <Sort />
        <Filter />
      </div>
    </div>
  );
};

export default FilterTools;
