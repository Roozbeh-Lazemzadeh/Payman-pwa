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
import { ReactComponent as RemoveIcon } from '../../../icons/delete.svg';
import {
  handleListFiltering,
  priceHandler,
  selectAllFilter,
} from '../../../store/filterPage/filterSlice';

import '../style.css';
import '../../Paymans/otherPaymans/style.css';

export const PriceFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const allFilter = useAppSelector(selectAllFilter);
  const searchItem = useAppSelector(selectSearchItem);
  const [selectedQuickItems, setSelectedQuickItems] = useState<number[]>([]);
  const [prices, setPrices] = useState<number[]>([]);
  const [priceFrom, setPriceFrom] = useState<number>();
  const [priceTo, setPriceTo] = useState<number>();

  const handleRemoveFilter = () => {
    if (prices.length === 0) return null;
    setSelectedQuickItems([]);
    dispatch(priceHandler([]));
    dispatch(searchedToggle(''));
    dispatch(filteredToggle());
    dispatch(handleListFiltering({ prices: [] }));
  };

  const selectedQuickAccess = (value: number) => {
    setSelectedQuickItems([0, value]);

    switch (value) {
      case 100000:
        setPriceFrom(0); // Update priceFrom to 0
        setPriceTo(100000); // Update priceTo to 100000
        setPrices([0, 100000]);
        break;

      case 200000:
        setPriceFrom(0); // Update priceFrom to 0
        setPriceTo(200000); // Update priceTo to 200000
        setPrices([0, 200000]);
        break;

      case 300000:
        setPriceFrom(0); // Update priceFrom to 0
        setPriceTo(300000); // Update priceTo to 300000
        setPrices([0, 300000]);
        break;

      default:
        break;
    }
  };
  const handlePriceFilter = () => {
    if (prices.length === 0) return null;
    if (!prices[0] && prices[1]) {
      dispatch(priceHandler([0, prices[1]]));
      dispatch(handleListFiltering({ prices: [0, prices[1]] }));
    } else if (prices[0] && !prices[1]) {
      dispatch(priceHandler([prices[0], 100000000]));
      dispatch(handleListFiltering({ prices: [prices[0], 100000000] }));
    } else {
      dispatch(priceHandler(prices));
      dispatch(handleListFiltering({ prices }));
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

  const handlePriceFrom = (e: any) => {
    const { value } = e.target;
    const parsedValue = Number(value);
    if (parsedValue !== 0) {
      // Remove the selected class when priceFrom changes from 0 to any other number
      setSelectedQuickItems([]);
    } else {
      setSelectedQuickItems([0, prices[1]]);
    }
    if (!isNaN(parsedValue)) {
      // Update the state only if the input value is a valid number
      setPriceFrom(parsedValue);
      setPrices([parsedValue, prices[1]]);
    }
  };

  const handlePriceTo = (e: any) => {
    const { value } = e.target;
    const parsedValue = Number(value);

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

    if (!isNaN(parsedValue)) {
      // Update the state only if the input value is a valid number
      setPriceTo(parsedValue);
      setPrices([prices[0], parsedValue]);
    }
  };

  return (
    <>
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
              type='number'
              className='search-input'
              addonBefore={<BuyIcon />}
              placeholder='از مبلغ'
              onChange={(e) => handlePriceFrom(e)}
              value={priceFrom ?? prices[0]}
            />
            <Input
              type='number'
              className='search-input'
              addonBefore={<BuyIcon />}
              placeholder='تا مبلغ'
              onChange={(e) => handlePriceTo(e)}
              value={priceTo ?? prices[1]}
            />
          </>
        </div>
      </div>
    </>
  );
};
