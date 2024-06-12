import React, { useEffect, useRef, useState } from 'react';
import { Select, type SelectProps, Input } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  filteredToggle,
  searchedToggle,
  selectFilter,
  selectSearchItem,
} from '../../../store/filterMenu/filterMenuSlice';
import { ReactComponent as TickSquareIcon } from '../../../icons/tickSquare.svg';
import { ToastContainer } from 'react-toastify';
import { showNotifyToast } from '../../shared/Toast/CustomToast';
import { ReactComponent as RemoveIcon } from '../../../icons/delete.svg';
import { ReactComponent as InfoIcon } from '../../../icons/yellowInfo.svg';
import {
  transactionsFiltering,
  merchantHandler,
  selectAllFilter,
  paymansFiltering,
} from '../../../store/filterPage/filterSlice';
import '../../Paymans/otherPaymans/style.css';
import jsonData from '../../../data/transaction.json';
import { useLocation } from 'react-router-dom';

import '../style.css';

export const MerchantFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const allFilter = useAppSelector(selectAllFilter);
  const filteredFooter = useAppSelector(selectFilter);
  const searchItem = useAppSelector(selectSearchItem);
  const [selectedQuickItems, setSelectedQuickItems] = useState<string[]>([]);
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const quickAccessItems = ['اسنپ', 'تپسی', 'فیلیمو'];
  const selectRef = useRef<any>(null);
  const inputRef = useRef<any>(null);

  const selectedQuickAccess = (title: string) => {
    if (selectedOptions.length === 3 && selectedQuickItems.length === 3) {
      const newQuickAccess = selectedQuickItems.filter(
        (item) => item !== title
      );
      setSelectedQuickItems(newQuickAccess);
    } else if (
      selectedOptions.length === 3 &&
      selectedQuickItems.length !== 3
    ) {
      return showNotifyToast(
        'شما مجاز به انتخاب سه کسب و کار می باشید.',
        <InfoIcon />
      );
    }
    let updatedSelectedItems = [];
    let updatedSelectedOptions = [...selectedOptions];

    if (selectedQuickItems.includes(title)) {
      // If the item is already selected, remove it from both arrays
      updatedSelectedItems = selectedQuickItems.filter(
        (item) => item !== title
      );
      updatedSelectedOptions = updatedSelectedOptions.filter(
        (item) => item !== title
      );
    } else {
      // Otherwise, add it to both arrays
      updatedSelectedItems = [...selectedQuickItems, title];
      updatedSelectedOptions = [...updatedSelectedOptions, title];
    }

    setSelectedQuickItems(updatedSelectedItems); // Update the quick access items state
    setSelectedOptions(updatedSelectedOptions); // Update the selected options state

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
    dispatch(searchedToggle(''));
    dispatch(filteredToggle());
    location.pathname === '/paymans/me'
      ? dispatch(paymansFiltering({ merchants: combinedSelectedItems }))
      : dispatch(transactionsFiltering({ merchants: combinedSelectedItems }));
  };

  const handleRemoveFilter = () => {
    if (selectedQuickItems.length === 0 && selectedOptions.length === 0) {
      return null;
    }
    setSelectedQuickItems([]);
    dispatch(merchantHandler([]));
    dispatch(searchedToggle(''));
    dispatch(filteredToggle());
    location.pathname === '/paymans/me'
      ? dispatch(paymansFiltering({ merchants: [] }))
      : dispatch(transactionsFiltering({ merchants: [] }));
  };

  const handleSelectedOptions = (newSelectedOptions: string[]) => {
    console.log(newSelectedOptions);
    const currentSelectedOptions = selectedOptions;
    const currentQuickItems = selectedQuickItems.map((item) => item); // Get the current selected quick items

    // Calculate the total number of selected items (quick items + new options)
    const totalSelectedItems =
      currentQuickItems.length + newSelectedOptions.length;

    if (totalSelectedItems > 3) {
      selectRef.current.blur();
      setIsOpen(false);
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
    // Add the quick access items if selected from the dropdown
    const updatedQuickItems = [...selectedQuickItems];
    newSelectedOptions.forEach((option) => {
      if (
        quickAccessItems.includes(option) &&
        !selectedQuickItems.includes(option)
      ) {
        updatedQuickItems.push(option);
      }
    });
    setSelectedQuickItems(updatedQuickItems);
  };

  // useEffects :

  // fetching unique merchants
  useEffect(() => {
    // Extract the unique creditor values from the JSON data
    const uniqueCreditors = Array.from(
      new Set(jsonData.map((item) => item.creditor))
    );

    // Remove the specified items from the uniqueCreditors array
    // const filteredCreditors = uniqueCreditors.filter(
    //   (creditor) => !['اسنپ', 'تپسی', 'فیلیمو'].includes(creditor)
    // );

    // Convert the filtered creditor values to the format required by the Select component
    const selectOptions = uniqueCreditors.map((creditor) => ({
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
    }, 300);
    setIsOpen(true);
  };

  // Custom filter function to ignore leading spaces
  const customFilterOption = (input: string, option: any) =>
    option?.value?.toLowerCase().indexOf(input.trim().toLowerCase()) >= 0;

  const handleDropDownVisibility = (open: boolean) => {
    setIsOpen(open);
    inputRef.current.blur();
    selectRef.current.blur();
  };
  useEffect(() => {
    if (!open) {
      inputRef.current.blur();
      selectRef.current.blur();
    }
  }, [open]);

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
            className={`${isOpen ? 'hidden' : 'dummy-input'}`}
          />
          <Select
            onDropdownVisibleChange={(open) => handleDropDownVisibility(open)}
            className='custom-select'
            placeholder='جستجوی نام کسب‌وکار'
            mode='multiple'
            style={{ width: '100%' }}
            options={options}
            onChange={handleSelectedOptions}
            maxTagCount={2}
            maxTagTextLength={5}
            maxTagPlaceholder={(omittedValues) => {
              if (omittedValues.length > 0) {
                const lastValue = omittedValues[omittedValues.length - 1].label;
                if (typeof lastValue === 'string') {
                  return `${lastValue.substring(0, 3)}...`;
                }
              }
              return '';
            }}
            value={selectedOptions}
            placement='topRight'
            ref={selectRef}
            open={isOpen}
            filterOption={customFilterOption}
          />
        </div>
      </div>
    </>
  );
};
