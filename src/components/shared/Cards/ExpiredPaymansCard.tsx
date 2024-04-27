import React, { useState } from 'react';
import { ReactComponent as SnapIcon } from '../../../icons/snapIcon.svg';
import { ReactComponent as DangerIcon } from '../../../icons/dangerTraingle.svg';
import { DetailedDrawer } from '../Drawer/DetailedDrawer';
import { Button } from 'antd';
import './style.css';

export const ExpiredPaymansCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const DetailedDrawerArray = [
    { nameItem1: 'تاریخ شروع', nameItem2: '۰۲ / ۱۰ / ۲۴' },
    { nameItem1: 'تاریخ پایان', nameItem2: '۰۲ / ۱۰ / ۲۴' },
    { nameItem1: 'بانک مبدا', nameItem2: 'سامان' },
    { nameItem1: 'مبلغ باقی‌مانده', nameItem2: '۱۵۰٬۰۰۰ تومانءءء' },
    { nameItem1: 'تعداد باقی‌مانده', nameItem2: '۲ تراکنش ' },
    { nameItem1: 'شماره موبایل', nameItem2: '989385445348+' },
    { nameItem1: 'شناسه پیمان', nameItem2: 'Ajdfni830874p39vfndl' },
  ];
  return (
    <div
      className='near-expiration-card-wrapper expired'
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className='merchant-logo-wrapper'>
        <div className='merchant-name-logo'>
          <SnapIcon />
          <span className='merchant-name expired'>اسنپ</span>
        </div>
        <div className='bank-logo'>
          <img src='/assets/pics/pasargadBank.png' />
        </div>
      </div>
      <div className='merchant-dateils-wrapper'>
        <div className='merchant-dateil-right'>
          <p className='merchant-dateil-time'>زمان باقی‌مانده: </p>
          <p className='merchant-dateil-maxtnx'>سقف مبلغ روزانه: </p>
          <p className='merchant-dateil-number'>سقف تعداد تراکنش: </p>
        </div>
        <div className='merchant-dateil-left'>
          <p className='merchant-dateil-time val'>۱ ماه</p>
          <p className='merchant-dateil-maxtnx val'>۲۰۰٬۰۰۰ تومانءءء </p>
          <p className='merchant-dateil-number val'>۵ تراکنش در روز</p>
        </div>
      </div>
      <div className='merchant-expiration-wrapper'>
        <span className='merchant-expiration-title'>منقضی شده</span>
        <DangerIcon />
      </div>
      <DetailedDrawer
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
      </DetailedDrawer>
    </div>
  );
};
