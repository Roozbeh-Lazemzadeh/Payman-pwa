import React from 'react';
import { ReactComponent as FilterIcon } from '../../icons/bilbil.svg';
import {
  selectFilteredFooter,
  selectSearchedFooter,
  closeSearchFooterFalse,
  closeSearchFooterToggle,
  filteredToggle,
  searchedToggle,
} from '../../store/footer/footerSlice';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import './style.css';

export const Filter: React.FC = () => {
  const dispatch = useAppDispatch();
  const isFilteredFooterShown = useAppSelector(selectFilteredFooter);
  const isSearchedFooterShown = useAppSelector(selectSearchedFooter);

  const handlePrimaryFooterShow = () => {
    if (!isFilteredFooterShown && !isSearchedFooterShown) {
      dispatch(filteredToggle());
      dispatch(closeSearchFooterFalse());
    } else if (isSearchedFooterShown) {
      dispatch(closeSearchFooterToggle());
      dispatch(filteredToggle());
      dispatch(searchedToggle());
    } else if (isFilteredFooterShown) {
      dispatch(filteredToggle());
    }
  };
  return (
    <span className="filter-icon">
      <FilterIcon onClick={handlePrimaryFooterShow} />
    </span>
  );
};
