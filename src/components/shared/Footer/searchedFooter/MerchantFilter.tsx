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
  const filteredFooter = useAppSelector(selectFilteredFooter);
  const searchItem = useAppSelector(selectSelectedSearchItem);
  const [selectedQuickItems, setSelectedQuickItems] = useState<string[]>([]);
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const selectedQuickAccess = (title: string) => {
    // if (selectedOptions.length === 0) return null;

    const currentOptionsLength = selectedOptions.length;

    // Check if the total length (selectedQuickItems + selectedOptions) is less than 3
    const totalSelectedItems = selectedQuickItems.length + currentOptionsLength;

    if (totalSelectedItems < 3) {
      // Create a new array of selected items with the new title and id
      const updatedSelectedItems = selectedQuickItems.some(
        (item) => item === title
      )
        ? // If the item already exists, filter it out
          selectedQuickItems.filter((item) => !(item === title))
        : // If the item doesn't exist, add it to the array
          [...selectedQuickItems, title];

      // Update the state with the new array of selected items
      setSelectedQuickItems(updatedSelectedItems);
    } else if (totalSelectedItems === 3 && selectedQuickItems.length > 0) {
      // If the total number of selected items is 3, check if the clicked item is already in the selectedQuickItems array
      if (selectedQuickItems.includes(title)) {
        // If the item is already selected, filter it out
        const updatedSelectedItems = selectedQuickItems.filter(
          (item) => item !== title
        );
        setSelectedQuickItems(updatedSelectedItems);
      } else {
        // If the item is not selected, replace one of the existing items with the clicked item
        const copySelectedQuickItems = [...selectedQuickItems];
        copySelectedQuickItems.splice(0, 1);
        const updatedSelectedItems = [...copySelectedQuickItems, title];
        setSelectedQuickItems(updatedSelectedItems);
      }
    }
  };
  const secondaryImplementFiltering = () => {
    // Combine the selected quick items and selected options
    const combinedSelectedItems = [...selectedQuickItems, ...selectedOptions];
    dispatch(allFilterHandler(combinedSelectedItems));
    dispatch(searchedToggle(''));
    dispatch(filteredToggle());
  };

  const handleRemoveFilter = () => {
    setSelectedQuickItems([]);
    dispatch(allFilterHandler([]));
    dispatch(searchedToggle(''));
    dispatch(filteredToggle());
  };

  const handleSelectedOptions = (newSelectedOptions: string[]) => {
    const currentSelectedOptions = selectedOptions;
    // Get the current selected quick items
    const currentQuickItems = selectedQuickItems.map((item) => item);

    // Calculate the total number of selected items (quick items + new options)
    const totalSelectedItems =
      currentQuickItems.length + newSelectedOptions.length;

    if (totalSelectedItems > 3) {
      console.log('selectedQuickItems.length', selectedQuickItems.length);
      const maxNewOptions = 3 - selectedQuickItems.length;
      console.log('maxNewOptions', maxNewOptions);
      const limitedNewOptions = newSelectedOptions.slice(0, maxNewOptions);
      console.log('limitedNewOptions', limitedNewOptions);

      // Check if any options were deselected
      const deselectedOptions = currentSelectedOptions.filter(
        (option) => !newSelectedOptions.includes(option)
      );
      console.log('deselectedOptions', deselectedOptions);

      const updatedOptions = [...deselectedOptions, ...limitedNewOptions];

      setSelectedOptions(updatedOptions);
    } else {
      setSelectedOptions(newSelectedOptions);
    }
  };

  // useEffects :

  //fetching unique merchants
  useEffect(() => {
    // Extract the unique creditor values from the JSON data
    const uniqueCreditors = Array.from(
      new Set(jsonData.map((item) => item.creditor))
    );

    // Remove the specified items from the uniqueCreditors array
    const filteredCreditors = uniqueCreditors.filter(
      (creditor) => !['اسنپ', 'تپسی', 'فیلیمو'].includes(creditor)
    );

    // Convert the filtered creditor values to the format required by the Select component
    const selectOptions = filteredCreditors.map((creditor) => ({
      value: creditor,
    }));

    setOptions(selectOptions);
  }, []);

  useEffect(() => {
    setSelectedQuickItems([]);
  }, [filteredFooter]);

  useEffect(() => {
    // Check the search item and initialize the selectedQuickItems state
    if (searchItem === '104') {
      const filteredMerchants = allFilter.merchants.filter(
        (merchant) =>
          merchant === 'اسنپ' || merchant === 'تپسی' || merchant === 'فیلیمو'
      );
      console.log(filteredMerchants);
      setSelectedQuickItems(filteredMerchants);
    } else {
      setSelectedQuickItems([]);
    }
  }, [searchItem, allFilter.merchants]);

  useEffect(() => {
    setSelectedOptions(
      allFilter.merchants?.filter((merchant) =>
        options?.some((option) => option.value === merchant)
      )
    );
  }, [options]);

  return (
    <>
      {selectedQuickItems.length > 0 || selectedOptions.length > 0 ? (
        <div className='implement-remove-wrapper'>
          <div className='remove-button' onClick={handleRemoveFilter}>
            <RemoveIcon />
            <span>حذف فیلتر</span>
          </div>
          <div
            className='implement-button half'
            onClick={secondaryImplementFiltering}
          >
            <TickSquareIcon />
            <span>اعمال</span>
          </div>
        </div>
      ) : (
        <div className='implement-button'>
          <TickSquareIcon />
          <span>اعمال</span>
        </div>
      )}
      <div className='searched-footer-content'>
        <div className='quick-access-section'>
          {/* merchants  */}
          <>
            <span
              className={
                selectedQuickItems.some((item) => item === 'اسنپ')
                  ? 'selected'
                  : ''
              }
              onClick={() => selectedQuickAccess('اسنپ')}
            >
              اسنپ
            </span>
            <span
              className={
                selectedQuickItems.some((item) => item === 'تپسی')
                  ? 'selected'
                  : ''
              }
              onClick={() => selectedQuickAccess('تپسی')}
            >
              تپسی
            </span>
            <span
              className={
                selectedQuickItems.some((item) => item === 'فیلیمو')
                  ? 'selected'
                  : ''
              }
              onClick={() => selectedQuickAccess('فیلیمو')}
            >
              فیلیمو
            </span>
          </>
        </div>
        <div className='search-section '>
          <Select
            placeholder='جستجوی نام کسب‌وکار'
            mode='multiple'
            style={{ width: '100%' }}
            options={options}
            onChange={handleSelectedOptions}
            maxTagCount={2}
            value={selectedOptions}
            placement='topRight'
          />
        </div>
      </div>
    </>
  );
};
