import { Button } from 'antd';
import { useEffect, useState } from 'react';
import './style.css';
// import './CheckOTPForm.css'; // Ensure to import the CSS file

const CheckOTPForm = () => {
  const [otp, setOtp] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [time, setTime] = useState({ minutes: 2, seconds: 33 });

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (time.minutes === 0 && time.seconds === 0) {
        clearInterval(intervalId);
        return;
      }

      let updatedSeconds = time.seconds - 1;
      let updatedMinutes = time.minutes;

      if (updatedSeconds < 0) {
        updatedSeconds = 59;
        updatedMinutes -= 1;
      }

      setTime({ minutes: updatedMinutes, seconds: updatedSeconds });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  const formattedTime = `${time.minutes}:${time.seconds < 10 ? '0' : ''}${
    time.seconds
  }`;

  const handleSelectedSpot = (e: { target: { value: any } }) => {
    const newValue = e.target.value;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setOtp(newValue);
    const otpInputLength = newValue.length;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setSelectedIndex(otpInputLength > 3 ? 3 : otpInputLength);
  };

  return (
    <div className='check-otp__style'>
      <p className='check-title'>
        کاربر گرامی لطفا کد ۴رقمی پیامک‌شده را وارد کنید.
      </p>
      <p className='check-number'>۹۸۹۳۷۱۱۰۹۲۲۷+</p>
      <form className='check-wrapper'>
        <div className='form-items-wrapper'>
          <div className='otp-inputs-wrapper'>
            <input
              type='text'
              className='checks-otp-inputs'
              maxLength={4}
              value={otp}
              onChange={handleSelectedSpot}
            />
            <div className='otp-inputs-borders'>
              {Array.from({ length: 4 }, (_, index) => (
                <span
                  key={index}
                  className={`otp-inputs-border ${
                    selectedIndex === index ? 'selected' : ''
                  }`}
                ></span>
              ))}
            </div>
          </div>
          <p className='check-timer'> {formattedTime} ثانیه باقی مانده</p>
        </div>
        <div className='btns-wrapper-check-otp'>
          <Button
            type='default'
            className='otp-form_btn-wrapper customer-login-btn'
          >
            <input
              type='submit'
              value='ورود یا ثبت‌نام'
              className='otp-form_submit colorBtn'
            />
          </Button>
          <Button className='otp-form_btn-wrapper' type='default'>
            <img
              src='/assets/login/swap.svg'
              alt=''
              className='logo-login-swap'
            />
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
