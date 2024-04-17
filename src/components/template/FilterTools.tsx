import React from 'react';
import { Sort } from '../sort/Sort';
import { Filter } from '../filter/Filter';

interface FilterToolsProps {
  title: string;
  onSortChange?: (criteria: string) => void; // Define the onSortChange event handler
}

const FilterTools: React.FC<FilterToolsProps> = ({ title, onSortChange }) => {
  return (
    <div className="filter-tools-wrapper">
      <p className="filter-tools-title">{title}</p>
      <div className="filter-tools-component">
        <Sort onSortChange={onSortChange} />{' '}
        {/* Pass the onSortChange event handler to the Sort component */}
        <Filter />
      </div>
    </div>
  );
};

export default FilterTools;
