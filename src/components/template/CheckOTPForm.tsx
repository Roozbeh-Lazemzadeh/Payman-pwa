/* eslint-disable react/jsx-no-undef */
// import { type FC, useState, type Dispatch, type SetStateAction } from 'react';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
// import { type FC, useState, useEffect } from 'react';

// import OtpInput from 'react-otp-input';

const CheckOTPForm = () => {
  const [otp, setOtp] = useState<number>();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [time, setTime] = useState({ minutes: 2, seconds: 33 });

  // const [style, setStyle] = useState<string>();

  useEffect(() => {
    const intervalId = setInterval(() => {
      // If both minutes and seconds are 0, clear the interval
      if (time.minutes === 0 && time.seconds === 0) {
        clearInterval(intervalId);
        return;
      }

      let updatedSeconds = time.seconds - 1;
      let updatedMinutes = time.minutes;

      // If seconds reach 0, decrease minutes by 1 and reset seconds to 59
      if (updatedSeconds < 0) {
        updatedSeconds = 59;
        updatedMinutes -= 1;
      }

      // Update the time state
      setTime({ minutes: updatedMinutes, seconds: updatedSeconds });
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [time]);
  const formattedTime = `${time.minutes}:${time.seconds < 10 ? '0' : ''}${
    time.seconds
  }`;

  const handleSelectedSpot = (e: any) => {
    e.preventDefault();
    setOtp(e.target.value);
    const otpInputLength = e.target.value.length;
    switch (otpInputLength) {
      case 0:
        setSelectedIndex(0);
        break;
      case 1:
        setSelectedIndex(1);
        break;
      case 2:
        setSelectedIndex(2);
        break;
      case 3:
        setSelectedIndex(3);
        break;
    }
  };

  return (
    <div className="check-otp__style">
      <p className="check-title">
        کاربر گرامی لطفا کد ۴رقمی پیامک‌شده را وارد کنید.
      </p>
      <p className="check-number">۹۸۹۳۷۱۱۰۹۲۲۷+</p>
      <form className="check-wrapper">
        <div className="form-items-wrapper">
          {/* <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span>{''}</span>}
            // renderInput={(props) => <input {...props} />}
            renderInput={(props) => <input {...props} />}
            containerStyle='check-otp-inputs'
            inputStyle='check-otp-input'
          /> */}
          <div className="otp-inputs-wrapper">
            <input
              type="text"
              className="checks-otp-inputs"
              maxLength={4}
              value={otp}
              onChange={(e) => handleSelectedSpot(e)}
            />
            <div className="otp-inputs-borders">
              <span
                className={`otp-inputs-border ${
                  selectedIndex === 3 ? 'selected' : ''
                }`}
              ></span>
              <span
                className={`otp-inputs-border ${
                  selectedIndex === 2 ? 'selected' : ''
                }`}
              ></span>
              <span
                className={`otp-inputs-border ${
                  selectedIndex === 1 ? 'selected' : ''
                }`}
              ></span>
              <span
                className={`otp-inputs-border ${
                  selectedIndex === 0 ? 'selected' : ''
                }`}
              ></span>
            </div>
          </div>

          <p className="check-timer"> {formattedTime} ثانیه باقی مانده</p>
        </div>
        <div className="btns-wrapper-check-otp">
          <Button
            type="default"
            className="otp-form_btn-wrapper customer-login-btn"
          >
            <input
              type="submit"
              value="ورود یا ثبت‌نام"
              className="otp-form_submit colorBtn"
            />
          </Button>
          <Button
            className="otp-form_btn-wrapper"
            type="default"
            // icon="/assets/pics/swap-login-icon.svg"
          >
            <img
              src="/assets/login/swap.svg"
              alt=""
              className="logo-login-swap"
            />
            <input
              type="submit"
              value="تغییر شماره موبایل"
              className="otp-form_submit"
            />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CheckOTPForm;
