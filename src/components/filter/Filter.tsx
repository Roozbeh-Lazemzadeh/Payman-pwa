import React, { useEffect } from 'react';
import { ReactComponent as FilterIcon } from '../../icons/bilbil.svg';
import { ReactComponent as FilteredCircleIcon } from '../../icons/filteringCirc.svg';
import {
  selectFilteredFooter,
  selectSearchedFooter,
  closeSearchFooterFalse,
  closeSearchFooterToggle,
  filteredToggle,
  searchedToggle,
} from '../../store/footer/footerSlice';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import {
  selectAllFilter,
  selectFilterNumber,
  selectShowFilterIcon,
} from '../../store/filter/filterSlice';
import './style.css';

export const Filter: React.FC = () => {
  const dispatch = useAppDispatch();
  const allFilter = useAppSelector(selectAllFilter);
  const filteredIcon = useAppSelector(selectShowFilterIcon);
  const filterNumber = useAppSelector(selectFilterNumber);
  const isFilteredFooterShown = useAppSelector(selectFilteredFooter);
  const isSearchedFooterShown = useAppSelector(selectSearchedFooter);
  console.log(allFilter);
  useEffect(() => {}, []);

  const handlePrimaryFooterShow = () => {
    if (!isFilteredFooterShown && !isSearchedFooterShown) {
      dispatch(filteredToggle());
      dispatch(closeSearchFooterFalse());
    } else if (isSearchedFooterShown) {
      dispatch(closeSearchFooterToggle());
      dispatch(filteredToggle());
      dispatch(searchedToggle(''));
    } else if (isFilteredFooterShown) {
      dispatch(filteredToggle());
    }
  };
  return (
    <span className="filter-icon">
      {filteredIcon ? (
        <div className="filtered-wrapper">
          <div className="filtered">
            <FilterIcon onClick={handlePrimaryFooterShow} />
          </div>
          <div className="filtered-circle">
            <FilteredCircleIcon />
          </div>
          <span
            className={`filter-number ${
              filterNumber === 1 ? 'number-one' : ''
            }`}
          >
            {filterNumber}
          </span>
        </div>
      ) : (
        <FilterIcon onClick={handlePrimaryFooterShow} />
      )}
    </span>
  );
};
