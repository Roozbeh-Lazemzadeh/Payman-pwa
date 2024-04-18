import React, { useEffect, useState } from 'react';
import { Select, SelectProps } from 'antd';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks/reduxHooks';
import {
  filteredToggle,
  searchedToggle,
  selectFilteredFooter,
  selectSelectedSearchItem,
} from '../../../../store/footer/footerSlice';
import { ReactComponent as TickSquareIcon } from '../../../../icons/tickSquare.svg';
// import { ReactComponent as MagnifierIcon } from '../../../../icons/magnifier2.svg';
import { ReactComponent as RemoveIcon } from '../../../../icons/delete.svg';
import {
  allFilterHandler,
  selectAllFilter,
} from '../../../../store/filter/filterSlice';
import '../../../Paymans/otherPaymans/style.css';
import jsonData from '../../../../transaction.json';
import '../style.css';

export const MerchantFilter: React.FC = () => {
  const dispatch = useDispatch();
  const allFilter = useAppSelector(selectAllFilter);
  console.log(allFilter.merchants);
  const filteredFooter = useAppSelector(selectFilteredFooter);
  const searchItem = useAppSelector(selectSelectedSearchItem);
  const [selectedQuickItems, setSelectedQuickItems] = useState<
    { title: string; id: number }[]
  >([]);
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const selectedQuickAccess = (title: string, id: number) => {
    // handle merchants case
    if (searchItem === '104') {
      // Create a new array of selected items with the new title and id
      const updatedSelectedItems = selectedQuickItems.some(
        (item) => item.title === title && item.id === id
      )
        ? // If the item already exists, filter it out
          selectedQuickItems.filter(
            (item) => !(item.title === title && item.id === id)
          )
        : // If the item doesn't exist, add it to the array
          [...selectedQuickItems, { title, id }];

      // Update the state with the new array of selected items
      setSelectedQuickItems(updatedSelectedItems);
    }
  };

  useEffect(() => {
    setSelectedQuickItems([]);
  }, [filteredFooter]);

  useEffect(() => {
    // Check the search item and initialize the selectedQuickItems state
    if (searchItem === '104') {
      setSelectedQuickItems(allFilter.merchants);
    } else {
      setSelectedQuickItems([]);
    }
  }, [searchItem, allFilter.merchants]);

  const secondaryImplementFiltering = () => {
    dispatch(allFilterHandler(selectedQuickItems));
    dispatch(searchedToggle(''));
    dispatch(filteredToggle());
  };
  console.log(allFilter);

  const handleRemoveFilter = () => {
    setSelectedQuickItems([]);
    dispatch(allFilterHandler([]));
    dispatch(searchedToggle(''));
    dispatch(filteredToggle());
  };

  useEffect(() => {
    // Extract the unique creditor values from the JSON data
    const uniqueCreditors = Array.from(
      new Set(jsonData.map((item) => item.creditor))
    );

    // Convert the unique creditor values to the format required by the Select component
    const selectOptions = uniqueCreditors.map((creditor) => ({
      value: creditor,
    }));

    setOptions(selectOptions);
    console.log(selectOptions);
  }, []);

  const handleSelectedOptions = (newSelectedOptions: string[]) => {
    // Check if the number of selected options exceeds 3
    console.log(newSelectedOptions.slice(0, 3));
    if (newSelectedOptions.length > 3) {
      return;
    }
    setSelectedOptions(newSelectedOptions.slice(0, 3));
  };

  return (
    <>
      {selectedQuickItems.length > 0 ? (
        <div className="implement-remove-wrapper">
          <div className="remove-button" onClick={handleRemoveFilter}>
            <RemoveIcon />
            <span>حذف فیلتر</span>
          </div>
          <div
            className="implement-button half"
            onClick={secondaryImplementFiltering}
          >
            <TickSquareIcon />
            <span>اعمال</span>
          </div>
        </div>
      ) : (
        // <div className='implement-button' onClick={primaryImplementFiltering}>
        <div className="implement-button">
          <TickSquareIcon />
          <span>اعمال</span>
        </div>
      )}
      <div className="searched-footer-content">
        <div className="quick-access-section">
          {/* merchants  */}
          <>
            <span
              className={
                selectedQuickItems.some((item) => item.id === 0)
                  ? 'selected'
                  : ''
              }
              onClick={() => selectedQuickAccess('اسنپ', 0)}
            >
              اسنپ
            </span>
            <span
              className={
                selectedQuickItems.some((item) => item.id === 1)
                  ? 'selected'
                  : ''
              }
              onClick={() => selectedQuickAccess('تپسی', 1)}
            >
              تپسی
            </span>
            <span
              className={
                selectedQuickItems.some((item) => item.id === 2)
                  ? 'selected'
                  : ''
              }
              onClick={() => selectedQuickAccess('فیلیمو', 2)}
            >
              فیلیمو
            </span>
          </>
        </div>
        <div className="search-section ">
          <Select
            placeholder="جستجوی نام کسب‌وکار"
            mode="multiple"
            style={{ width: '100%' }}
            options={options}
            onChange={handleSelectedOptions}
            maxTagCount={2}
            value={selectedOptions}
          />
        </div>
      </div>
    </>
  );
};
