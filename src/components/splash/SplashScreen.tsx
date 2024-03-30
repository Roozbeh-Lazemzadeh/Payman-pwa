import React from 'react';
import './style.css';

const SplashScreen: React.FC = () => {
  return (
    <div className="splash-container">
      <div className="logo-wrapper">
        <div className="logo-animation">
          <div className="logo-wrapper__top">
            <img
              src="/assets/logo-splash/logo-top.svg"
              alt=""
              className="logo-top"
            />
          </div>
          <img
            src="/assets/logo-splash/logo-Mid.svg"
            alt=""
            className="logo-mid"
          />
          <img
            src="/assets/logo-splash/logo-Bottom.svg"
            alt=""
            className="logo-bottom"
          />
        </div>
      </div>
      <div className="footer-wrapper">
        <span>توسعه‌یافته توسط پیمان</span>
        <img
          className="footer-wrapper__img"
          src="/assets/logo-splash/Payman.png"
          alt="توسعه‌یافته توسط پیمان"
        />
      </div>
    </div>
  );
};

export default SplashScreen;
