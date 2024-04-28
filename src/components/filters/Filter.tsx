import React from 'react';
import { ReactComponent as FilterIcon } from '../../icons/bilbil.svg';
import { ReactComponent as FilteredCircleIcon } from '../../icons/filteringCirc.svg';
import {
  selectTransactionFilter,
  selectTransactionSearchedFilter,
  transactionCloseSearchToggle,
  transactionCloseSearchFalse,
  transactionFilteredToggle,
  transactionSearchedToggle,
} from '../../store/filterMenu/transactionFilterMenuSlice';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import {
  selectFilterNumber,
  selectShowFilterIcon,
} from '../../store/filterPage/transactionFilterSlice';
import { useLocation } from 'react-router-dom';
import './style.css';

export const Filter: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const currentPath = location.pathname;
  console.log(currentPath);

  // transaction filter
  const filteredIcon = useAppSelector(selectShowFilterIcon);
  const filterNumber = useAppSelector(selectFilterNumber);
  const isTransactionFilterShown = useAppSelector(selectTransactionFilter);
  const isTransactionSearchedFilterShown = useAppSelector(
    selectTransactionSearchedFilter
  );

  // home filter
  // payman filter

  const handlePrimaryFilterShow = () => {
    switch (currentPath) {
      case '/transactions':
        console.log('yes');
        if (!isTransactionFilterShown && !isTransactionSearchedFilterShown) {
          dispatch(transactionFilteredToggle());
          dispatch(transactionCloseSearchFalse());
        } else if (isTransactionSearchedFilterShown) {
          dispatch(transactionCloseSearchToggle());
          dispatch(transactionFilteredToggle());
          dispatch(transactionSearchedToggle(''));
        } else if (isTransactionFilterShown) {
          dispatch(transactionFilteredToggle());
        }
        break;
      case '/home/with-mandate':
        console.log('yes');
        break;
      case '/paymans/me':
        console.log('yes');
        break;

      default:
        break;
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
              filterNumber === 1 ? 'number-one' : ''
            }`}
          >
            {filterNumber}
          </span>
        </div>
      ) : (
        <FilterIcon onClick={handlePrimaryFilterShow} />
      )}
    </span>
  );
};
