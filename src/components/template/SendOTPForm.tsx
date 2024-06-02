/* eslint-disable react/no-unescaped-entities */
import { type FC, type Dispatch, type SetStateAction } from 'react';
import { Checkbox, Button } from 'antd';
// import OtpInput from 'react-otp-input';
import { CustomDrawer } from '../shared/Drawer/Drawer';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import {
  openBottomSheet,
  selectBottomSheetIsOpen,
} from '../../store/bottomSheet/bottomSheetSlice';

import './style.css';
interface OnboardingProps {
  setStep: Dispatch<SetStateAction<number>>;
}

const SendOTPForm: FC<OnboardingProps> = ({ setStep }) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectBottomSheetIsOpen);
  // const [otp, setOtp] = useState<string>();
  // const [otpVal, setOtpVal] = useState<string>();

  // useEffect(() => {
  //   // console.log(otp);
  // }, [otp]);

  // const sharedProps = {
  //   onChange,
  // };
  const handleBottomSheet = () => {
    dispatch(openBottomSheet());
  };
  return (
    <div className='send-otp-wrapper'>
      <div className='send-otp-form__wrapper'>
        <form className='send-otp-form'>
          {/* <Input.OTP formatter={(str) => str.toUpperCase()} {...sharedProps} /> */}
          <span className='send-otp__title'>ورود یا ثبت نام</span>
          <div className='otp-form_input-wrapper'>
            <div className='otp-form_input'>
              <span className='form-input_title'>شماره موبایل</span>
              <span className='form-input_num'>
                {/* <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={9}
                  renderSeparator={<span>{''}</span>}
                  renderInput={(props) => <input {...props} />}
                  containerStyle='phone-num-inputs'
                  inputStyle='phone-num-input'
                /> */}
                <input type='text' className='phone-num-inputs' />
                <span>۰۹</span>
              </span>
            </div>
            <div className='otp-form_input'>
              <span className='form-input_title'>کد ملی</span>
              <span className='form-input_num'>
                {/* <OtpInput
                  value={otpVal}
                  onChange={setOtpVal}
                  numInputs={10}
                  renderSeparator={<span>{''}</span>}
                  renderInput={(props) => <input {...props} />}
                  containerStyle='phone-num-inputs'
                  inputStyle='phone-num-input'
                /> */}
                {/* <span>۰۹</span> */}
                <input type='text' className='phone-num-inputs' />
              </span>
            </div>
          </div>
          {/* <input type="checkbox" className="otp-form_checked" /> */}
          <Checkbox className='otp-Checkbox'>
            <span onClick={handleBottomSheet}>
              <span className='otp-Checkbox__open-drawer'>
                توافق‌نامه کاربری پیمان{' '}
              </span>
              را خوانده‌ام و می‌پذیرم.
            </span>
          </Checkbox>
          <Button className='otp-form_btn-wrapper' type='primary'>
            {/* <input
              type="submit"
              value="تایید و ادامه"
              className="otp-form_submit"
            /> */}
            تایید و ادامه
          </Button>
        </form>
      </div>
      <div className='cover-customer__login'>
        <p className='cover-customer__login-p'>
          نیاز به کمک دارید؟
          <span className='cover-customer__login-link'>{' پشتیبانی'} </span>
        </p>
      </div>
      <p className='info-login login'>
        پیمان برای استعلام اطلاعات هویتی شما، از سامانه شاهکار بانک مرکزی
        استفاده می‌کند؛ بنابراین توجه کنید که کد ملی و شماره موبایل، متعلق به یک
        نفر باشد.
      </p>
      <CustomDrawer isOpen={isOpen} title={'توافق‌نامه کاربری پیمان'}>
        <div style={{ fontWeight: 500 }}>
          <div
            style={{
              height: 300,
              marginTop: 20,
              overflow: 'scroll',
              padding: '0px 20px',
              color: 'rgba(16, 24, 40, 1)',
              fontSize: 14,
              direction: 'ltr'
            }}
          >
            <div className='rules-wrapper'>
              <div>
                با سلام بسیار خوش‌آمدید به "پیمان". لطفاً قبل از ادامه، وقت
                بگذارید و مقررات زیر را با دقت مطالعه فرمایید. این قوانین و
                مقررات برای اطمینان از تجربه‌ای امن و محترمانه برای تمامی
                کاربران ما وضع شده‌اند.
              </div>
              <br />
              <div>۱. احترام به حریم خصوصی</div>
              <div>
                ما احترام کاملی به حریم خصوصی و اطلاعات شما داریم. هیچگونه
                اطلاعات شخصی شما به اشتراک گذاشته نخواهد شد و تنها برای بهبود
                خدمات ما استفاده می‌شود.
              </div>
              <br />
              <div>۲. پذیرش و ارتقاء قوانین</div>
              <div>
                استفاده از این اپلیکیشن به معنی پذیرش کامل قوانین و مقررات ما
                است. ما ممکن است این قوانین را به‌روز کنیم، ولی هرگونه تغییری از
                طریق اطلاعیه به شما اطلاع داده خواهد شد.
              </div>
              <br />
              <div> ۳. امنیت اطلاعات</div>
              <div>
                امنیت اطلاعات شما برای ما بسیار مهم است. ما تمهیدات امنیتی لازم
                را انجام داده‌ایم تا اطلاعات شما در امان باشد.
              </div>
              <br />
              <div>۴. خاتمه</div>
              <div>
                با تشکر از اعتماد شما به ما و استفاده از اپلیکیشن "پیمان".
                امیدواریم تجربه خوبی از خدمات ما داشته باشید. هرگونه پرسش یا
                بازخوردی دارید، لطفاً با ما در تماس باشید.
              </div>
              <br></br>
            </div>
          </div>
          <div
            style={{
              paddingTop: 40,
              paddingBottom: 40,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              style={{ display: 'flex' }}
              type='primary'
              icon={
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M7.03369 10.0001L9.01202 11.9776L12.967 8.02258'
                    stroke='white'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M2.2915 10.0001C2.2915 15.7809 4.219 17.7084 9.99984 17.7084C15.7807 17.7084 17.7082 15.7809 17.7082 10.0001C17.7082 4.21925 15.7807 2.29175 9.99984 2.29175C4.219 2.29175 2.2915 4.21925 2.2915 10.0001Z'
                    stroke='white'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              }
            >
              توافق‌نامه کاربری پیمان را خوانده‌ام و می‌پذیرم.
            </Button>
          </div>
        </div>
      </CustomDrawer>
    </div>
  );
};

export default SendOTPForm;
