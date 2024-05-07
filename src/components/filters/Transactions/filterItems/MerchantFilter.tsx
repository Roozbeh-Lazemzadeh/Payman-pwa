/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { Select, type SelectProps, Input } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import {
  transactionFilteredToggle,
  transactionSearchedToggle,
  selectTransactionFilter,
  selectTransactionSearchItem,
  selectSearchingMerchantOpen,
  handleSearchingMerchantOpen,
  handleSearchingMerchantClose,
} from '../../../../store/filterMenu/transactionFilterMenuSlice';
import { ReactComponent as TickSquareIcon } from '../../../../icons/tickSquare.svg';
import { ToastContainer } from 'react-toastify';
import { showNotifyToast } from '../../../shared/Toast/CustomToast';
import { ReactComponent as RemoveIcon } from '../../../../icons/delete.svg';
import { ReactComponent as InfoIcon } from '../../../../icons/yellowInfo.svg';
import {
  handleListFiltering,
  merchantHandler,
  selectAllFilter,
} from '../../../../store/filterPage/transactionFilterSlice';
import '../../../Paymans/otherPaymans/style.css';
import jsonData from '../../../../transaction.json';
import '../../style.css';

export const MerchantFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectSearchingMerchantOpen);
  const allFilter = useAppSelector(selectAllFilter);
  const filteredFooter = useAppSelector(selectTransactionFilter);
  const searchItem = useAppSelector(selectTransactionSearchItem);
  const [selectedQuickItems, setSelectedQuickItems] = useState<string[]>([]);
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const selectRef = useRef<any>(null);
  const inputRef = useRef<any>(null);

  const selectedQuickAccess = (title: string) => {
    const currentOptionsLength = selectedOptions.length;
    const totalSelectedItems = selectedQuickItems.length + currentOptionsLength; // Check if the total length (selectedQuickItems + selectedOptions) is less than 3

    if (totalSelectedItems < 3) {
      // Create a new array of selected items with the new title and id
      const updatedSelectedItems = selectedQuickItems.some(
        (item) => item === title
      )
        ? selectedQuickItems.filter((item) => !(item === title))
        : [...selectedQuickItems, title];

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
        const copySelectedQuickItems = [...selectedQuickItems]; // If the item is not selected, replace one of the existing items with the clicked item
        copySelectedQuickItems.splice(0, 1);
        const updatedSelectedItems = [...copySelectedQuickItems, title];
        setSelectedQuickItems(updatedSelectedItems);
      }
    }
  };
  const handleMerchantFilter = () => {
    if (selectedQuickItems.length === 0 && selectedOptions.length === 0) {
      return null;
    }
    const combinedSelectedItems = [...selectedQuickItems, ...selectedOptions]; // Combine the selected quick items and selected options
    dispatch(merchantHandler(combinedSelectedItems));
    dispatch(transactionSearchedToggle(''));
    dispatch(transactionFilteredToggle());
    dispatch(handleListFiltering({ merchants: combinedSelectedItems }));
    dispatch(handleSearchingMerchantClose());
  };

  const handleRemoveFilter = () => {
    if (selectedQuickItems.length === 0 && selectedOptions.length === 0) {
      return null;
    }
    setSelectedQuickItems([]);
    dispatch(merchantHandler([]));
    dispatch(transactionSearchedToggle(''));
    dispatch(transactionFilteredToggle());
    dispatch(handleListFiltering({ merchants: [] }));
    dispatch(handleSearchingMerchantClose());
  };

  const handleSelectedOptions = (newSelectedOptions: string[]) => {
    const currentSelectedOptions = selectedOptions;
    const currentQuickItems = selectedQuickItems.map((item) => item); // Get the current selected quick items

    // Calculate the total number of selected items (quick items + new options)
    const totalSelectedItems =
      currentQuickItems.length + newSelectedOptions.length;

    if (totalSelectedItems > 3) {
      showNotifyToast(
        'شما مجاز به انتخاب سه کسب و کار می باشید.',
        <InfoIcon />
      );

      const maxNewOptions = 3 - selectedQuickItems.length;
      const limitedNewOptions = newSelectedOptions.slice(0, maxNewOptions);

      // Check if any options were deselected
      const deselectedOptions = currentSelectedOptions.filter(
        (option) => !newSelectedOptions.includes(option)
      );

      const updatedOptions = [...deselectedOptions, ...limitedNewOptions];

      setSelectedOptions(updatedOptions);
    } else {
      setSelectedOptions(newSelectedOptions);
    }
  };

  // useEffects :

  // fetching unique merchants
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

  const handleSelectFocus = () => {
    inputRef.current.focus();
    setTimeout(() => {
      selectRef.current.focus();
      dispatch(handleSearchingMerchantOpen());
    }, 500);
  };
  return (
    <>
      <ToastContainer rtl />
      <div className='implement-remove-wrapper'>
        <div
          className={`remove-button ${
            selectedQuickItems.length === 0 && selectedOptions.length === 0
              ? 'disabled'
              : ''
          }`}
          onClick={handleRemoveFilter}
        >
          <RemoveIcon />
          <span>حذف فیلتر</span>
        </div>
        <div
          className={`implement-button half ${
            selectedQuickItems.length === 0 && selectedOptions.length === 0
              ? 'disabled'
              : ''
          }`}
          onClick={handleMerchantFilter}
        >
          <TickSquareIcon />
          <span>اعمال</span>
        </div>
      </div>

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
          <Input
            onClick={handleSelectFocus}
            ref={inputRef}
            // className={`${isOpen ? 'hidden' : 'dummy-input'}`}
          />
          <Select
            className='custom-select'
            placeholder='جستجوی نام کسب‌وکار'
            mode='multiple'
            style={{ width: '100%' }}
            options={options}
            onChange={handleSelectedOptions}
            maxTagCount={2}
            maxTagTextLength={7}
            value={selectedOptions}
            placement='topRight'
            ref={selectRef}
            open={isOpen}
          />
        </div>
      </div>
    </>
  );
};
