import React from 'react';
import { ReactComponent as FilterIcon } from '../../icons/bilbil.svg';
import { ReactComponent as FilteredCircleIcon } from '../../icons/filteringCirc.svg';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
// transaction filter import
import {
  selectTransactionFilter,
  selectTransactionSearchedFilter,
  transactionCloseSearchToggle,
  transactionCloseSearchFalse,
  transactionFilteredToggle,
  transactionSearchedToggle,
} from '../../store/filterMenu/transactionFilterMenuSlice';
import {
  selectTransactionFilterNumber,
  selectShowTransactionFilterIcon,
} from '../../store/filterPage/transactionFilterSlice';
// home filter import
import {
  selectHomeFilter,
  selectHomeSearchedFilter,
  homeCloseSearchToggle,
  homeCloseSearchFalse,
  homeFilteredToggle,
  homeSearchedToggle,
} from '../../store/filterMenu/homeFilterMenuSlice';
import {
  selectHomeFilterNumber,
  selectHomeShowFilterIcon,
} from '../../store/filterPage/homeFilterSlice';
// style
import { useLocation } from 'react-router-dom';
import './style.css';

export const Filter: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const currentPath = location.pathname;

  // transaction filter
  const transactionFilteredIcon = useAppSelector(
    selectShowTransactionFilterIcon
  );
  const transactionTotalFilterNumber = useAppSelector(
    selectTransactionFilterNumber
  );
  const isTransactionFilterShown = useAppSelector(selectTransactionFilter);
  const isTransactionSearchedFilterShown = useAppSelector(
    selectTransactionSearchedFilter
  );

  // home filter
  const homeFilteredIcon = useAppSelector(selectHomeShowFilterIcon);
  const homeTotalFilterNumber = useAppSelector(selectHomeFilterNumber);
  const isHomeFilterShown = useAppSelector(selectHomeFilter);
  const isHomeSearchedFilterShown = useAppSelector(selectHomeSearchedFilter);

  // payman filter

  const handlePrimaryFilterShow = () => {
    switch (currentPath) {
      case '/transactions':
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
        console.log('true');
        if (!isHomeFilterShown && !isHomeSearchedFilterShown) {
          dispatch(homeFilteredToggle());
          dispatch(homeCloseSearchFalse());
        } else if (isHomeSearchedFilterShown) {
          dispatch(homeCloseSearchToggle());
          dispatch(homeFilteredToggle());
          dispatch(homeSearchedToggle(''));
        } else if (isHomeFilterShown) {
          dispatch(homeFilteredToggle());
        }
        break;
      case '/paymans/me':
        break;

      default:
        break;
    }
  };

  return (
    <span className='filter-icon'>
      {transactionFilteredIcon || homeFilteredIcon ? (
        <div className='filtered-wrapper'>
          <div className='filtered'>
            <FilterIcon onClick={handlePrimaryFilterShow} />
          </div>
          <div className='filtered-circle'>
            <FilteredCircleIcon />
          </div>
          <span
            className={`filter-number ${
              transactionTotalFilterNumber === 1 || homeTotalFilterNumber === 1
                ? 'number-one'
                : ''
            }`}
          >
            {transactionTotalFilterNumber || homeTotalFilterNumber}
          </span>
        </div>
      ) : (
        <FilterIcon onClick={handlePrimaryFilterShow} />
      )}
    </span>
  );
};
