import React from 'react';
import { ReactComponent as FilterIcon } from '../../icons/bilbil.svg';
import { ReactComponent as FilteredCircleIcon } from '../../icons/filteringCirc.svg';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
// filter imports
import {
  selectFilter,
  selectSearchedFilter,
  closeSearchToggle,
  closeSearchFalse,
  filteredToggle,
  searchedToggle,
} from '../../store/filterMenu/filterMenuSlice';
import {
  selectFilterNumber,
  selectShowFilterIcon,
} from '../../store/filterPage/filterSlice';

// style
import './style.css';

export const Filter: React.FC = () => {
  const dispatch = useAppDispatch();

  // filter
  const filteredIcon = useAppSelector(selectShowFilterIcon);
  const totalFilterNumber = useAppSelector(selectFilterNumber);
  const isFilterShown = useAppSelector(selectFilter);
  const isSearchedFilterShown = useAppSelector(selectSearchedFilter);

  const handlePrimaryFilterShow = () => {
    if (!isFilterShown && !isSearchedFilterShown) {
      dispatch(filteredToggle());
      dispatch(closeSearchFalse());
    } else if (isSearchedFilterShown) {
      dispatch(closeSearchToggle());
      dispatch(filteredToggle());
      dispatch(searchedToggle(''));
    } else if (isFilterShown) {
      dispatch(filteredToggle());
    }
  };

  return (
    <span className='filter-icon'>
      {filteredIcon ? (
        <div className='filtered-wrapper'>
          <div className='filtered'>
            <FilterIcon onClick={handlePrimaryFilterShow} />
          </div>
          <div className='filtered-circle'>
            <FilteredCircleIcon />
          </div>
          <span
            className={`filter-number ${
              totalFilterNumber === 1 ? 'number-one' : ''
            }`}
          >
            {totalFilterNumber}
          </span>
        </div>
      ) : (
        <FilterIcon onClick={handlePrimaryFilterShow} />
      )}
    </span>
  );
};
