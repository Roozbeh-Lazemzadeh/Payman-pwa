import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  filteredToggle,
  searchedToggle,
  selectSearchItem,
} from '../../../store/filterMenu/filterMenuSlice';
import { ReactComponent as TickSquareIcon } from '../../../icons/tickSquare.svg';
import { ReactComponent as BuyIcon } from '../../../icons/buy2.svg';
import { ReactComponent as TomanIcon } from '../../../icons/Toman.svg';
import { ReactComponent as RemoveIcon } from '../../../icons/delete.svg';
import { ReactComponent as InfoIcon } from '../../../icons/yellowInfo.svg';
import {
  transactionsFiltering,
  priceHandler,
  selectAllFilter,
  paymansFiltering,
} from '../../../store/filterPage/filterSlice';
import { persianToEnglishNumber } from '../../helpers/persianToEnglishNumbers';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { showNotifyToast } from '../../shared/Toast/CustomToast';
// helper
import { MAX_SAFE_INTEGER } from '../../helpers';
import { formatNumberWithCommas } from '../../helpers/seperatorInNumbers';
// style
import '../../Paymans/otherPaymans/style.css';
import '../style.css';

export const PriceFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const allFilter = useAppSelector(selectAllFilter);
  const searchItem = useAppSelector(selectSearchItem);
  const [selectedQuickItems, setSelectedQuickItems] = useState<number[]>([]);
  const [prices, setPrices] = useState<number[]>([]);
  const [priceFrom, setPriceFrom] = useState<string>();
  const [priceTo, setPriceTo] = useState<string>();
  const [isFromFilled, setIsFromFilled] = useState(false);
  const [isToFilled, setIsToFilled] = useState(false);

  const handleRemoveFilter = () => {
    if (prices.length === 0) return null;
    setSelectedQuickItems([]);
    dispatch(priceHandler([]));
    dispatch(searchedToggle(''));
    dispatch(filteredToggle());
    location.pathname === '/paymans/me'
      ? dispatch(paymansFiltering({ prices: [] }))
      : dispatch(transactionsFiltering({ prices: [] }));
  };

  const selectedQuickAccess = (value: number) => {
    setSelectedQuickItems([0, value]);

    switch (value) {
      case 100000:
        setPriceFrom('0'); // Update priceFrom to 0
        setPriceTo('100,000'); // Update priceTo to 100000
        setPrices([0, 100000]);
        break;

      case 200000:
        setPriceFrom('0'); // Update priceFrom to 0
        setPriceTo('200,000'); // Update priceTo to 200000
        setPrices([0, 200000]);
        break;

      case 300000:
        setPriceFrom('0'); // Update priceFrom to 0
        setPriceTo('300,000'); // Update priceTo to 300000
        setPrices([0, 300000]);
        break;

      default:
        break;
    }
  };
  const handlePriceFilter = () => {
    if (prices.length === 0) return null;
    if (prices[0] > prices[1]) {
      return showNotifyToast(
        'بازه قیمت از قیمت پایین به بالا فیلتر شود.',
        <InfoIcon />
      );
    }
    if (!prices[0] && prices[1]) {
      dispatch(priceHandler([0, prices[1]]));
      location.pathname === '/paymans/me'
        ? dispatch(paymansFiltering({ prices: [0, prices[1]] }))
        : dispatch(transactionsFiltering({ prices: [0, prices[1]] }));
    } else if (prices[0] && !prices[1]) {
      dispatch(priceHandler([prices[0], 100000000]));
      location.pathname === '/paymans/me'
        ? dispatch(paymansFiltering({ prices: [prices[0], 100000000] }))
        : dispatch(transactionsFiltering({ prices: [prices[0], 100000000] }));
    } else {
      dispatch(priceHandler(prices));
      location.pathname === '/paymans/me'
        ? dispatch(paymansFiltering({ prices }))
        : dispatch(transactionsFiltering({ prices }));
    }
    dispatch(searchedToggle(''));
    dispatch(filteredToggle());
  };

  useEffect(() => {
    // Check the search item and initialize the selectedQuickItems state
    const prices = allFilter.price;
    setSelectedQuickItems(prices);
    setPrices(prices);
  }, [searchItem]);

  const handlePriceFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const parsedValue = Number(persianToEnglishNumber(value.replace(/,/g, '')));
    const isNumeric = !isNaN(parsedValue);

    if (parsedValue !== 0) {
      // Remove the selected class when priceFrom changes from 0 to any other number
      setSelectedQuickItems([]);
    } else {
      setSelectedQuickItems([0, prices[1]]);
    }
    if (isNumeric && parsedValue <= MAX_SAFE_INTEGER) {
      // Update the state only if the input value is a valid number
      setPriceFrom(formatNumberWithCommas(Number(parsedValue)));
      setPrices([Number(parsedValue), prices[1]]);
    } else {
      setPriceFrom('');
    }
  };

  const handlePriceTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const parsedValue = Number(persianToEnglishNumber(value.replace(/,/g, '')));
    const isNumeric = !isNaN(parsedValue);

    if (
      parsedValue !== 100000 &&
      parsedValue !== 200000 &&
      parsedValue !== 300000
    ) {
      // Remove the selected class when priceTo changes to a value other than 100000, 200000, or 300000
      setSelectedQuickItems([]);
    } else {
      setSelectedQuickItems([prices[0], parsedValue]);
    }

    if (isNumeric && parsedValue <= MAX_SAFE_INTEGER) {
      // Update the state only if the input value is a valid number
      setPriceTo(formatNumberWithCommas(parsedValue));
      setPrices([prices[0], parsedValue]);
    } else {
      setPriceTo('');
    }
  };

  useEffect(() => {
    if (prices[0] > 0) {
      setIsFromFilled(true);
    } else {
      setIsFromFilled(false);
    }
    if (
      prices[1] >= 0 &&
      prices[1] !== 100000 &&
      prices[1] !== 200000 &&
      prices[1] !== 300000
    ) {
      setIsToFilled(true);
    } else {
      setIsToFilled(false);
    }
  }, [prices]);

  return (
    <>
      <ToastContainer rtl />
      <div className='implement-remove-wrapper'>
        <div
          className={`remove-button ${
            !prices[1] && !prices[0] ? 'disabled' : ''
          }`}
          onClick={handleRemoveFilter}
        >
          <RemoveIcon />
          <span>حذف فیلتر</span>
        </div>
        <div
          className={`implement-button half ${
            !prices[1] && !prices[0] ? 'disabled' : ''
          }`}
          onClick={handlePriceFilter}
        >
          <TickSquareIcon />
          <span>اعمال</span>
        </div>
      </div>

      <div className='searched-footer-content'>
        <div className='quick-access-section'>
          {/* price  */}
          <>
            <span
              className={
                selectedQuickItems[0] === 0 && selectedQuickItems[1] === 100000
                  ? 'selected'
                  : ''
              }
              onClick={() => selectedQuickAccess(100000)}
            >
              تا ۱۰۰هزار تومانءءء
            </span>
            <span
              className={
                selectedQuickItems[0] === 0 && selectedQuickItems[1] === 200000
                  ? 'selected'
                  : ''
              }
              onClick={() => selectedQuickAccess(200000)}
            >
              تا ۲۰۰هزار تومانءءء
            </span>
            <span
              className={
                selectedQuickItems[0] === 0 && selectedQuickItems[1] === 300000
                  ? 'selected'
                  : ''
              }
              onClick={() => selectedQuickAccess(300000)}
            >
              تا ۳۰۰هزار تومانءءء
            </span>
          </>
        </div>
        <div className='search-section '>
          <>
            <Input
              type='text'
              inputMode='numeric'
              className={`search-input ${isFromFilled ? 'filled' : ''}`}
              addonBefore={prices[0] ? <TomanIcon /> : <BuyIcon />}
              placeholder='از مبلغ'
              onChange={(e) => handlePriceFrom(e)}
              value={priceFrom ?? (formatNumberWithCommas(prices[0]) || '')}
            />
            <Input
              type='text'
              inputMode='numeric'
              className={`search-input ${isToFilled ? 'filled' : ''}`}
              addonBefore={prices[1] ? <TomanIcon /> : <BuyIcon />}
              placeholder='تا مبلغ'
              onChange={(e) => handlePriceTo(e)}
              value={priceTo ?? (formatNumberWithCommas(prices[1]) || '')}
            />
          </>
        </div>
      </div>
    </>
  );
};
