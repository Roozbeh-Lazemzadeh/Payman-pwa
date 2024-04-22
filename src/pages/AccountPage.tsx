import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { Select } from 'antd';
import { CaretLeftOutlined, SearchOutlined } from '@ant-design/icons';
import DatePiker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { ReactComponent as TickSquarepro } from '../icons/TickSquarepro.svg';
import { ReactComponent as Logout } from '../icons/Logout.svg';
import 'react-multi-date-picker/styles/layouts/mobile.css';
import { weekDays } from '../components/types/calendar';

const onChange = (value: string) => {
  console.log(`selected ${value}`);
};

const onSearch = (value: string): void => {
  console.log('search:', value);
};

// Filter `option.label` match the user type `input`
const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const AccountPage: React.FC = () => {
  const [Icon, setIcon] = useState(true);
  const [value, setValue] = useState(new Date());

  const changeDateHandler = (e: any): void => {
    const date = new Date(e);
    setValue(date);
  };
  console.log(value)

  return (
    <div className='profile-wrapper'>
      <Input
        prefix='شماره تماس'
        suffix='09385455552'
        disabled
        className='profile-input-disabled'
      />
      <Input
        prefix='کد ملی'
        suffix='18102253366'
        disabled
        className='profile-input-disabled'
      />
      <Input placeholder='نام و نام خانوادگی' className='profile-input' />
      <Input placeholder='ایمیل' className='profile-input' />
      <Select
        showSearch
        placeholder='محل سکونت'
        optionFilterProp='children'
        suffixIcon={Icon ? <CaretLeftOutlined /> : <SearchOutlined />}
        onFocus={() => setIcon(!Icon)}
        style={{ width: '100%', height: '44px', borderRadius: '10px' }}
        onChange={onChange}
        onSearch={onSearch}
        filterOption={filterOption}
        options={[
          {
            value: 'تهران',
            label: 'تهران',
          },
          {
            value: 'کرج',
            label: 'کرج',
          },
          {
            value: 'اصفهان',
            label: 'اصفهان',
          },
        ]}
      />

      <div className='datepiker-wrapper'>
        <span className='datepiker-title'>تاریخ تولد</span>
        <span className='calendar-icon'>
          <svg
            width='16'
            height='18'
            viewBox='0 0 16 18'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M11.6757 1.30702L11.6766 1.93171C13.9721 2.11162 15.4885 3.67583 15.4909 6.07463L15.5 13.0961C15.5033 15.7115 13.8602 17.3207 11.2265 17.3248L4.79324 17.3332C2.17599 17.3365 0.512347 15.689 0.509056 13.0661L0.500006 6.1271C0.496714 3.71248 1.95961 2.15243 4.25514 1.9417L4.25432 1.31701C4.2535 0.95053 4.52501 0.674835 4.88703 0.674835C5.24905 0.674002 5.52057 0.948864 5.52139 1.31535L5.52221 1.89839L10.4095 1.89173L10.4087 1.30868C10.4078 0.942201 10.6794 0.667339 11.0414 0.666506C11.3952 0.665673 11.6749 0.940535 11.6757 1.30702ZM1.7679 6.38447L14.2247 6.36782V6.0763C14.1893 4.28553 13.2908 3.346 11.6782 3.20607L11.679 3.84741C11.679 4.20557 11.4001 4.48959 11.0463 4.48959C10.6843 4.49042 10.412 4.20723 10.412 3.84908L10.4111 3.17442L5.52386 3.18108L5.52468 3.85491C5.52468 4.2139 5.25399 4.49709 4.89197 4.49709C4.52995 4.49792 4.25761 4.21556 4.25761 3.85657L4.25679 3.21523C2.65238 3.37598 1.76461 4.31884 1.76708 6.12544L1.7679 6.38447ZM10.6999 10.1701V10.1792C10.7082 10.5624 11.0208 10.8531 11.4001 10.8447C11.7704 10.8356 12.0657 10.5182 12.0575 10.1351C12.0402 9.76861 11.7432 9.4696 11.3738 9.47043C10.9953 9.47876 10.6991 9.78694 10.6999 10.1701ZM11.3795 13.9099C11.0011 13.9015 10.6958 13.5859 10.695 13.2027C10.6868 12.8196 10.9904 12.5022 11.3688 12.4931H11.3771C11.7638 12.4931 12.0772 12.8088 12.0772 13.2002C12.0781 13.5917 11.7654 13.909 11.3795 13.9099ZM7.3101 10.1834C7.32655 10.5665 7.64003 10.8656 8.01851 10.8489C8.38875 10.8314 8.68413 10.5149 8.66768 10.1318C8.65862 9.75695 8.3542 9.46543 7.98395 9.46626C7.60547 9.48292 7.30928 9.80026 7.3101 10.1834ZM8.0218 13.8724C7.64332 13.8891 7.33067 13.59 7.31339 13.2069C7.31339 12.8238 7.60877 12.5072 7.98724 12.4898C8.35749 12.4889 8.66274 12.7804 8.67097 13.1544C8.68824 13.5384 8.39205 13.8549 8.0218 13.8724ZM3.92027 10.2126C3.93673 10.5957 4.2502 10.8955 4.62868 10.8781C4.99893 10.8614 5.2943 10.5441 5.27703 10.1609C5.2688 9.78611 4.96437 9.49458 4.5933 9.49542C4.21483 9.51208 3.91945 9.82942 3.92027 10.2126ZM4.63197 13.8766C4.2535 13.894 3.94084 13.5942 3.92356 13.2111C3.92274 12.8279 4.21894 12.5106 4.59741 12.4939C4.96766 12.4931 5.27291 12.7846 5.28114 13.1594C5.29842 13.5426 5.00304 13.8599 4.63197 13.8766Z'
              fill='#101828'
              fillOpacity='0.2'
            />
          </svg>
        </span>
        <DatePiker
          monthYearSeparator='  '
          onChange={changeDateHandler}
          value={value}
          locale={persian_fa}
          calendar={persian}
          className='rmdp-mobile'
          calendarPosition='bottom-right'
          weekDays={weekDays}
          range 
        />
      </div>
      <Button
        className='contact-us-with-icon profile'
        type='primary'
        icon={<TickSquarepro />}
      >
        ذخیره تغییرات
      </Button>
      <Button className='contact-us-with-icon logout' icon={<Logout />}>
        خروج از حساب کاربری
      </Button>
    </div>
  );
};

export default AccountPage;
