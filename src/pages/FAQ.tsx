import React from 'react';
import { CustomCollapse } from '../components/collapse/CustomCollapse';
import '../components/collapse/style.css';
import { Button } from 'antd';
import { ReactComponent as ContactIcon } from '../icons/calling.svg';
import './style.css'
interface CollapseItem {
  label: string;
  text: string;
  key: string;
}
const items: CollapseItem[] = [
  {
    label: 'سرویس برداشت مستقیم پیمان چطور کار می کند؟',
    text: 'پرداخت مستقیم راهکار هوشمند و نوین در صنعت پرداخت به شما کمک میکند خرید لذت بخش تر باشد . شما خیلی راحت میتوانید با بستن یک قرار داد به راحتی با هر یک از شرکت های لیست زیر فقط با زدن یک دکمه بدون ورود به صفحه درگاه پرداخت خرید های و تراکنش های خود را نهایی کنید . ',
    key: '1',
  },
  {
    label: 'برای استفاده از سرویس پیمان به چه چیزی نیاز دارید؟',
    text: 'پرداخت مستقیم راهکار هوشمند و نوین در صنعت پرداخت به شما کمک میکند خرید لذت بخش تر باشد . شما خیلی راحت میتوانید با بستن یک قرار داد به راحتی با هر یک از شرکت های لیست زیر فقط با زدن یک دکمه بدون ورود به صفحه درگاه پرداخت خرید های و تراکنش های خود را نهایی کنید . ',
    key: '2',
  },
  {
    label: 'سرویس پیمان در کجا استفاده می شود؟',
    text: 'پرداخت مستقیم راهکار هوشمند و نوین در صنعت پرداخت به شما کمک میکند خرید لذت بخش تر باشد . شما خیلی راحت میتوانید با بستن یک قرار داد به راحتی با هر یک از شرکت های لیست زیر فقط با زدن یک دکمه بدون ورود به صفحه درگاه پرداخت خرید های و تراکنش های خود را نهایی کنید . ',
    key: '3',
  },
  {
    label: 'آیا این سرویس از مشتری کارمزد کسر می کند؟',
    text: 'پرداخت مستقیم راهکار هوشمند و نوین در صنعت پرداخت به شما کمک میکند خرید لذت بخش تر باشد . شما خیلی راحت میتوانید با بستن یک قرار داد به راحتی با هر یک از شرکت های لیست زیر فقط با زدن یک دکمه بدون ورود به صفحه درگاه پرداخت خرید های و تراکنش های خود را نهایی کنید . ',
    key: '4',
  },
  {
    label: 'سرویس پیمان چطور امنیت را تامین می کند؟',
    text: 'پرداخت مستقیم راهکار هوشمند و نوین در صنعت پرداخت به شما کمک میکند خرید لذت بخش تر باشد . شما خیلی راحت میتوانید با بستن یک قرار داد به راحتی با هر یک از شرکت های لیست زیر فقط با زدن یک دکمه بدون ورود به صفحه درگاه پرداخت خرید های و تراکنش های خود را نهایی کنید . ',
    key: '5',
  },
  {
    label: 'سرویس پیمان چطور امنیت را تامین می کند؟',
    text: 'پرداخت مستقیم راهکار هوشمند و نوین در صنعت پرداخت به شما کمک میکند خرید لذت بخش تر باشد . شما خیلی راحت میتوانید با بستن یک قرار داد به راحتی با هر یک از شرکت های لیست زیر فقط با زدن یک دکمه بدون ورود به صفحه درگاه پرداخت خرید های و تراکنش های خود را نهایی کنید . ',
    key: '6',
  },
];
// const handleCallSupport = () => {
//   window.location.href = 'tel:+982188332216';
// };

export const FAQPage: React.FC = () => {
  return (
    <>
      <CustomCollapse list={items} />
      <div className="question-title">
        به تعدادی از پرسش‌های احتمالی شما در زمینه راهکار پرداخت مستقیم پیمان
        پاسخ داده‌ایم. اگر هم‌چنان به کمک یا راهنمایی نیاز داشتید، از طریق دکمه
        زیر با ما ارتباط بگیرید.
      </div>
      <Button
        className="contact-us-with-icon"
        type="primary"
        // icon={}
      >
        <a href="tel:02122989880" className="btn-faq">
          <ContactIcon />
          تماس با پشتیبانی
        </a>
      </Button>
    </>
  );
};
