import React, { useEffect, useRef, useState } from 'react';
import { Select, type SelectProps, Input } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  closeDropDown,
  filteredToggle,
  openDropDown,
  searchedToggle,
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
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const selectRef = useRef<any>(null);
  const inputRef = useRef<any>(null);

  const selectedQuickAccess = (title: string) => {
    const currentOptionsLength = selectedOptions.length;
    if (currentOptionsLength === 3 && selectedOptions.includes(title)) {
      const updateSelectedOptions = selectedOptions.filter(
        (item) => item !== title
      );
      setSelectedOptions(updateSelectedOptions);
    } else if (
      selectedOptions.length === 3 &&
      !selectedOptions.includes(title)
    ) {
      return showNotifyToast(
        'شما مجاز به انتخاب سه کسب و کار می باشید.',
        <InfoIcon />
      );
    }

    let updatedSelectedItems: string[] = [];

    if (selectedOptions.includes(title)) {
      updatedSelectedItems = selectedOptions.filter((item) => item !== title);
      setSelectedOptions(updatedSelectedItems);
    } else {
      updatedSelectedItems = [...selectedOptions, title];
      setSelectedOptions(updatedSelectedItems); // Update the selected options state
    }
  };
  const handleMerchantFilter = () => {
    if (selectedOptions.length === 0) return null;

    dispatch(merchantHandler(selectedOptions));
    dispatch(searchedToggle(''));
    dispatch(filteredToggle());
    location.pathname === '/paymans/me'
      ? dispatch(paymansFiltering({ merchants: selectedOptions }))
      : dispatch(transactionsFiltering({ merchants: selectedOptions }));
  };

  const handleRemoveFilter = () => {
    if (selectedOptions.length === 0) {
      return null;
    }
    dispatch(merchantHandler([]));
    dispatch(searchedToggle(''));
    dispatch(filteredToggle());
    location.pathname === '/paymans/me'
      ? dispatch(paymansFiltering({ merchants: [] }))
      : dispatch(transactionsFiltering({ merchants: [] }));
  };

  const handleSelectedOptions = (newSelectedOptions: string[]) => {
    if (newSelectedOptions.length > 3) {
      selectRef.current.blur();
      setIsOpen(false);
      return showNotifyToast(
        'شما مجاز به انتخاب سه کسب و کار می باشید.',
        <InfoIcon />
      );
    }
    setSelectedOptions(newSelectedOptions); // Update the selected options state
  };

  // useEffects :

  // fetching unique merchants
  useEffect(() => {
    // Extract the unique creditor values from the JSON data
    const uniqueCreditors = Array.from(
      new Set(jsonData.map((item) => item.creditor))
    );

    // Convert the filtered creditor values to the format required by the Select component
    const selectOptions = uniqueCreditors.map((creditor) => ({
      value: creditor,
    }));

    setOptions(selectOptions);
  }, []);

  useEffect(() => {
    setSelectedOptions(
      allFilter.merchants?.filter((merchant) =>
        options?.some((option) => option.value === merchant)
      )
    );
  }, [options]);

  const handleSelectFocus = () => {
    inputRef.current.focus();
    // dispatch(openDropDown());
    setTimeout(() => {
      selectRef.current.focus();
    }, 300);
    setIsOpen(true);
  };

  // Custom filter function to ignore leading spaces
  const customFilterOption = (input: string, option: any) =>
    option?.value?.toLowerCase().indexOf(input.trim().toLowerCase()) >= 0;

  useEffect(() => {
    if (isOpen) {
      dispatch(openDropDown());
    } else if (!isOpen) {
      dispatch(closeDropDown());
    }
  }, [isOpen]);

  return (
    <>
      <ToastContainer rtl />
      <div className='implement-remove-wrapper'>
        <div
          className={`remove-button ${
            selectedOptions.length === 0 ? 'disabled' : ''
          }`}
          onClick={handleRemoveFilter}
        >
          <RemoveIcon />
          <span>حذف فیلتر</span>
        </div>
        <div
          className={`implement-button half ${
            selectedOptions.length === 0 ? 'disabled' : ''
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
            <span onClick={() => selectedQuickAccess('اسنپ')}>اسنپ</span>
            <span onClick={() => selectedQuickAccess('تپسی')}>تپسی</span>
            <span onClick={() => selectedQuickAccess('فیلیمو')}>فیلیمو</span>
          </>
        </div>
        <div className='search-section '>
          <Input
            onClick={handleSelectFocus}
            ref={inputRef}
            className={`${isOpen ? 'hidden' : 'dummy-input'}`}
          />
          <Select
            onDropdownVisibleChange={(open) => setIsOpen(open)}
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
                  return `${lastValue.substring(0, 4)}...`;
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
