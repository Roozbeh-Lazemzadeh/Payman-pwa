import React, { useEffect, useState } from 'react';
import Search, { type SearchProps } from 'antd/es/input/Search';
import { Footer } from 'antd/es/layout/layout';
import { useAppSelector } from '../../hooks/reduxHooks';
import {
  selectCloseSearchFooter,
  selectSearchedFooter,
  selectSelectedSearchItem,
} from '../../../store/footer/footerSlice';
import { ReactComponent as TickSquareIcon } from '../../../icons/tickSquare.svg';
import { ReactComponent as BuyIcon } from '../../../icons/buy2.svg';
import { ReactComponent as MagnifierIcon } from '../../../icons/magnifier2.svg';
import { ReactComponent as CalendarIcon } from '../../../icons/calendar.svg';
import '../../Paymans/otherPaymans/style.css';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { Button, Input } from 'antd';
import DatePicker from 'react-multi-date-picker';
import { weekDays } from '../../types/calendar';
import './style.css';
import {
  allFilterHandler,
  selectAllFilter,
} from '../../../store/filter/filterSlice';
import { useDispatch } from 'react-redux';

export const SearchedFooter: React.FC = () => {
  const allFilter = useAppSelector(selectAllFilter);
  const [firstTitle, setFirstTitle] = useState('');
  const [secondTitle, setSecondTitle] = useState('');
  const [thirdTitle, setThirdTitle] = useState('');
  const [values, setValues] = useState([]);
  const isSearchedFooterShown = useAppSelector(selectSearchedFooter);
  const closeSearchFooter = useAppSelector(selectCloseSearchFooter);
  const searchItem = useAppSelector(selectSelectedSearchItem);
  const [selectedTitles, setSelectedTitles] = useState<string[]>([]);
  const [stylebtns, setStylebtns] = useState<string>();
  const dispatch = useDispatch();
  console.log(allFilter.merchants);
  const { merchants } = allFilter;
  console.log(merchants);

  const selectedQuickAccess = (title: string, id: number) => {
    // handle merchants case
    if (searchItem === '104') {
      // handle only selected merchants UI (change the background color to blue)
      // if (selectedTitles.includes(title)) {
      //   setSelectedTitles(selectedTitles.filter((t) => t !== title));
      // } else {
      //   setSelectedTitles([...selectedTitles, title]);
      // }

      // fill the store with the selected merchant
      dispatch(allFilterHandler({ title, id }));
      // handle date case
    } else if (searchItem === '103') {
      if (selectedTitles.includes(title)) {
        setSelectedTitles(selectedTitles.filter((t) => t !== title));
      } else {
        setSelectedTitles([title]);
      }
    }
  };
  const handleMerchantSearch = (e: any): void => {
    console.log(e.target.value);
  };
  // const handleSelectedMerchant = (e: any) => {
  //   const selectedTitle = e.target.innerText;
  //   console.log(selectedTitle);
  //   setIsSelected(true);
  // };

  useEffect(() => {
    if (searchItem !== '')
      switch (searchItem) {
        case '104':
          setThirdTitle('فیلیمو');
          setSecondTitle('تپسی');
          setFirstTitle('اسنپ');
          break;
        case '103':
          setFirstTitle('هفتگی');
          setSecondTitle('ماهانه');
          setThirdTitle('۳ ماهه');
          break;
        case '102':
          setFirstTitle('۱۰۰هزار تومانءءء');
          setSecondTitle('۲۰۰هزار تومانءءء');
          setThirdTitle('۳۰۰هزار تومانءءء');
          break;

        default:
          break;
      }
  }, [searchItem]);
  const searchFooterFn = () => {
    switch (searchItem) {
      case '104':
        return (
          <Search
            onChange={(e) => handleMerchantSearch(e)}
            placeholder='جستجوی نام کسب‌وکار'
            onSearch={onSearch}
            style={{ width: '90%' }}
            className='home-search_input payman'
            enterButton={
              <Button
                className='search-btn'
                disabled
                icon={<MagnifierIcon />}
              />
            }
          />
        );
      case '103':
        return (
          <div className='search-datePicker'>
            <DatePicker
              placeholder='از تاریخ                              تا تاریخ'
              style={{
                direction: 'rtl',
              }}
              value={values}
              onChange={() => setValues(values)}
              dateSeparator='                  '
              locale={persian_fa}
              calendar={persian}
              className='rmdp-mobile'
              calendarPosition='bottom-right'
              range
              weekDays={weekDays}
              monthYearSeparator='  '
            />
            <div className='icon'>
              <CalendarIcon />
            </div>
          </div>
        );
      case '102':
        return (
          <>
            <Input
              className='search-input'
              addonBefore={<BuyIcon />}
              placeholder='از مبلغ'
            />
            <Input
              className='search-input'
              addonBefore={<BuyIcon />}
              placeholder='تا مبلغ'
            />
          </>
        );
      default:
        return null;
    }
  };

  const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
    console.log(info?.source, value);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleQuickAccessStyle = () => {
    if (searchItem !== '')
      switch (searchItem) {
        case '104':
         if(merchants[0].title.length>0){
          setStylebtns('selected');
         } else {
          setStylebtns('');
         }
         break;
            case '103':
          setFirstTitle('هفتگی');
          setSecondTitle('ماهانه');
          setThirdTitle('۳ ماهه');
          break;
        case '102':
          setFirstTitle('۱۰۰هزار تومانءءء');
          setSecondTitle('۲۰۰هزار تومانءءء');
          setThirdTitle('۳۰۰هزار تومانءءء');
          break;

        default:
          break;
      }
  };
  return (
    <Footer
      className={`searched-footer${isSearchedFooterShown ? ' active' : ''} ${
        closeSearchFooter ? 'close' : ''
      }`}
    >
      <div className='searched-footer-wrapper'>
        <div className='implement-button'>
          <TickSquareIcon />
          <span>اعمال</span>
        </div>
        <div className='searched-footer-content'>
          <div className='quick-access-section'>
            {[firstTitle, secondTitle, thirdTitle].map((title, index) => (
              <span
                key={index}
                // className={
                //   selectedTitles.includes(firstTitle) ? 'selected' : ''
                // }
                className={stylebtns}
                onClick={() => selectedQuickAccess(title, index)}
              >
                {title}
              </span>
            ))}
            {/* <span
              key={1}
              // onClick={() => selectedQuickAccess(firstTitle)}
              onClick={(e) => console.log(e)}
              className={selectedTitles.includes(firstTitle) ? 'selected' : ''}
            >
              {firstTitle}
            </span>
            <span
              key={2}
              // onClick={() => selectedQuickAccess(secondTitle)}
              onClick={(e) => console.log(e)}
              className={selectedTitles.includes(secondTitle) ? 'selected' : ''}
            >
              {secondTitle}
            </span>
            <span
              key={3}
              onClick={() => selectedQuickAccess(thirdTitle)}
              // onClick={(e) => console.log(e)}
              className={selectedTitles.includes(thirdTitle) ? 'selected' : ''}
            >
              {thirdTitle}
            </span> */}
          </div>
          <div
            className={`search-section ${
              searchItem === '103' ? 'search-bar' : ''
            } `}
          >
            {searchFooterFn()}
            <div className='divider'></div>
          </div>
        </div>
      </div>
    </Footer>
  );
};
