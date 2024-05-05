import React, { useState } from 'react';
import { ReactComponent as TapsiIcon } from './icon.svg';
import { ReactComponent as SamanBankIcon } from '../../../icons/samanBank.svg';
// import { DetailedDrawer } from '../Drawer/DetailedDrawer';
// import { Button } from 'antd';
import './style.css';

export const NearExpiredPaymanCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // const DetailedDrawerArray = [
  //   { nameItem1: 'تاریخ شروع', nameItem2: '۰۲ / ۱۰ / ۲۴' },
  //   { nameItem1: 'تاریخ پایان', nameItem2: '۰۲ / ۱۰ / ۲۴' },
  //   { nameItem1: 'بانک مبدا', nameItem2: 'سامان' },
  //   { nameItem1: 'مبلغ باقی‌مانده', nameItem2: '۱۵۰٬۰۰۰ تومانءءء' },
  //   { nameItem1: 'تعداد باقی‌مانده', nameItem2: '۲ تراکنش ' },
  //   { nameItem1: 'شماره موبایل', nameItem2: '989385445348+' },
  //   { nameItem1: 'شناسه پیمان', nameItem2: 'Ajdfni830874p39vfndl' },
  // ];
  return (
    <div
      className='near-expiration-card-wrapper shadow-ani'
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className='merchant-row'>
        <div className='merchant-name-logo'>
          <TapsiIcon />
          <span className='merchant-name'>تپسی</span>
        </div>
        <div className='remain-dates-wrapper'>
          <span className='remain-dates-title'>زمان باقی‌مانده: </span>
          <span className='remain-dates-value'>۳ روز </span>
        </div>
      </div>
      <div className='bank-row-wrapper'>
        <div className='bank-logo'>
          <SamanBankIcon />
        </div>
        <div className='ceiling-qnt-wrapper'>
          <div className='price-ceiling'>
            <span className='remain-dates-title'>سقف مبلغ روزانه: </span>
            <span className='ceiling-value'>۲۰۰٬۰۰۰ تومانءءء</span>
          </div>
          <div className='transaction-ceiling'>
            <span className='remain-dates-title'>سقف تعداد تراکنش: </span>
            <span className='ceiling-value transaction'>۵ تراکنش در روز</span>
          </div>
        </div>
      </div>
      {/* <DetailedDrawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={'جزییات پیمان'}
        data={DetailedDrawerArray}
      >
        <div className='more-trans-btn-wrapper'>
          <Button className='more-trans-btn' type='primary'>
            مشاهده همه تراکنش‌های این پیمان
          </Button>
        </div>
      </DetailedDrawer> */}
    </div>
  );
};
