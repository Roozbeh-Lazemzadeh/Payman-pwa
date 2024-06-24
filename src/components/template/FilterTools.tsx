import React from 'react';
import { Sort } from '../sort/Sort';
import { Filter } from '../filters/Filter';

interface FilterToolsProps {
  title: string;
}

const FilterTools: React.FC<FilterToolsProps> = ({ title }) => {
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
