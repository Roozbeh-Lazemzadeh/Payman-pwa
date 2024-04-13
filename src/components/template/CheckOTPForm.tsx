/* eslint-disable react/jsx-no-undef */
// import { type FC, useState, type Dispatch, type SetStateAction } from 'react';
import { Button } from 'antd';
import { type FC, useState, useEffect } from 'react';

import OtpInput from 'react-otp-input';

const CheckOTPForm: FC = () => {
  const [otp, setOtp] = useState<string>();
  // const [style, setStyle] = useState<string>();

  useEffect(() => {
    console.log(otp);
  }, [otp]);

  // const handleOtp = (value: string) => {
  //   console.log(value);
  //   setOtp(value);
  // };

  return (
    <div className='check-otp__style'>
      <p className='check-title'>
        کاربر گرامی لطفا کد ۴رقمی پیامک‌شده را وارد کنید.
      </p>
      <p className='check-number'>۹۸۹۳۷۱۱۰۹۲۲۷+</p>
      <form className='check-wrapper'>
        <div className='form-items-wrapper'>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span>{''}</span>}
            // renderInput={(props) => <input {...props} />}
            renderInput={(props) => <input {...props} />}
            containerStyle='check-otp-inputs'
            inputStyle='check-otp-input'
          />
          <p className='check-timer'>۲:۳۲ ثانیه باقی مانده</p>
        </div>
        <div className='btns-wrapper-check-otp'>
          <Button
            type='default'
            className='otp-form_btn-wrapper customer-login-btn'
          >
            <input
              type='submit'
              value='ورود یا ثبت‌نام'
              className='otp-form_submit'
            />
          </Button>
          <Button
            className='otp-form_btn-wrapper'
            type='default'
            // icon="/assets/pics/swap-login-icon.svg"
          >
            <input
              type='submit'
              value='تغییر شماره موبایل'
              className='otp-form_submit'
            />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CheckOTPForm;
