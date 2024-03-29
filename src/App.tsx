/* eslint-disable react/no-unescaped-entities */
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
// import { Button, ConfigProvider, Input, Tag } from 'antd';
import './App.css';
// import FilteredTag from './components/shared/Tags/Tag';
// import {
//   NotificationBadge,
//   NumberedBadge,
// } from './components/shared/Badges/Badge';
// import { CustomDrawer } from './components/shared/Drawer/Drawer';
// import { TransactionCard } from './components/shared/Cards/TransactionCards';
import { router } from './router/router';

function App(): JSX.Element {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: 'IranYekan',
            colorText: 'rgba(16, 24, 40, 1)',
          },
          components: {
            Button: {
              colorPrimary: '#0072ff',
              defaultBg: 'rgba(0, 114, 255, 0.2)',
              defaultBorderColor: '#0072FF',
              defaultColor: '#0072FF',
              borderRadius: 10,
              lineHeight: 28,
              fontWeight: 600,
              colorBgContainerDisabled: '#ACACAC',
              colorTextDisabled: 'rgba(255, 255, 255, 0.5)',
            },
            Input: {
              colorPrimary: '#0072ff',
              colorBorder: '#CDCDD0',
              borderRadius: 10,
              colorBgContainerDisabled: 'rgba(172, 172, 172, 0.2)',
            },
            Segmented: {
              itemSelectedColor: '#fff',
              itemSelectedBg: 'rgba(0, 114, 255, 1)',
              motionEaseInOut: 'linear',
              motionDurationSlow: '250ms',
            },
          },
        }}
      >
        {/* <div className="App">
        <Button
          type="primary"
          style={{ width: 120, marginLeft: 5, marginTop: 10 }}
        >
          primary
        </Button>
        <Button size="middle" style={{ marginLeft: 5 }}>
          default
        </Button>
        <Button size="small" disabled>
          default
        </Button>
        <Input disabled style={{ width: 200 }} />
        <Tag>فیلتر شده بر اساس نام کسب‌وکار : تپسی٬ اسنپ٬ فیلیمو</Tag>
        <FilteredTag
          text={'فیلتر شده بر اساس نام کسب‌وکار : تپسی٬ اسنپ٬ فیلیمو'}
        />
        <NumberedBadge number={2} />
        <NotificationBadge />
        <p>تومانءءء</p>
        <CustomDrawer title={'توافق‌نامه کاربری پیمان'}>
          <div style={{ fontWeight: 500 }}>
            <div
              style={{
                height: 300,
                overflow: 'scroll',
                padding: '0px 20px',
                color: 'rgba(16, 24, 40, 1)',
                fontSize: 14,
              }}
            >
              <div>
                با سلام بسیار خوش‌آمدید به "پیمان". لطفاً قبل از ادامه، وقت
                بگذارید و مقررات زیر را با دقت مطالعه فرمایید. این قوانین و
                مقررات برای اطمینان از تجربه‌ای امن و محترمانه برای تمامی
                کاربران ما وضع شده‌اند.
              </div>
              <br />
              <div>
                ۱. احترام به حریم خصوصی ما احترام کاملی به حریم خصوصی و اطلاعات
                شما داریم. هیچگونه اطلاعات شخصی شما به اشتراک گذاشته نخواهد شد و
                تنها برای بهبود خدمات ما استفاده می‌شود.
              </div>
              <br />
              <div>
                ۲. پذیرش و ارتقاء قوانین استفاده از این اپلیکیشن به معنی پذیرش
                کامل قوانین و مقررات ما است. ما ممکن است این قوانین را به‌روز
                کنیم، ولی هرگونه تغییری از طریق اطلاعیه به شما اطلاع داده خواهد
                شد.
              </div>
              <br />
              <div>
                ۳. امنیت اطلاعات امنیت اطلاعات شما برای ما بسیار مهم است. ما
                تمهیدات امنیتی لازم را انجام داده‌ایم تا اطلاعات شما در امان
                باشد.
              </div>
              <br />
              <div>
                ۴. خاتمه با تشکر از اعتماد شما به ما و استفاده از اپلیکیشن
                "پیمان". امیدواریم تجربه خوبی از خدمات ما داشته باشید. هرگونه
                پرسش یا بازخوردی دارید، لطفاً با ما در تماس باشید.
              </div>
              <br></br>
            </div>
            <div
              style={{
                paddingTop: 40,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Button
                style={{ display: 'flex' }}
                type="primary"
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.03369 10.0001L9.01202 11.9776L12.967 8.02258"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.2915 10.0001C2.2915 15.7809 4.219 17.7084 9.99984 17.7084C15.7807 17.7084 17.7082 15.7809 17.7082 10.0001C17.7082 4.21925 15.7807 2.29175 9.99984 2.29175C4.219 2.29175 2.2915 4.21925 2.2915 10.0001Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              >
                توافق‌نامه کاربری پیمان را خوانده‌ام و می‌پذیرم.
              </Button>
            </div>
          </div>
        </CustomDrawer>
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}
        >
          <TransactionCard
            merchant="تپسی"
            price={4550}
            transStatus="موفق"
            transDate="سه‌شنبه، ۱۴۰۲/۰۷/۲۵- ۱۸:۴۸"
            transStatusIcon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.03369 9.99996L9.01202 11.9775L12.967 8.02246"
                  stroke="#12B76A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.2915 10.0001C2.2915 15.7809 4.219 17.7084 9.99984 17.7084C15.7807 17.7084 17.7082 15.7809 17.7082 10.0001C17.7082 4.21925 15.7807 2.29175 9.99984 2.29175C4.219 2.29175 2.2915 4.21925 2.2915 10.0001Z"
                  stroke="#12B76A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
        </div>
      </div> */}
        <RouterProvider router={router} />
      </ConfigProvider>
    </>
  );
}

export default App;
