import React from 'react';
import './style.css';

function OtherMerchants() {
  return (
    <div className="selected-merchants-wrapper">
      <p className="selected-merchants-title">سایر کسب‌وکارها</p>

      <div className="selected-merchants">
        <div
          className="selected-merchant"
          style={{ backgroundImage: 'url(/assets/pics/mask-group.svg)' }}
        >
          <div className="img-wrapper">
            <img className="selected-merchant-img" src="/assets/pics/680.svg" />
          </div>
          <p className="selected-merchant-title">آسان پرداخت</p>
        </div>
        <div
          className="selected-merchant"
          style={{ backgroundImage: 'url(/assets/pics/mask-group.svg)' }}
        >
          <div className="img-wrapper">
            <div className="img-wrapper">
              <img
                className="selected-merchant-img"
                src="/assets/pics/MTN-Logo.png"
              />
            </div>
          </div>
          <p className="selected-merchant-title">ایرانسل</p>
        </div>
        <div
          className="selected-merchant"
          style={{ backgroundImage: 'url(/assets/pics/mask-group.svg)' }}
        >
          <div className="img-wrapper">
            <img
              className="selected-merchant-img"
              src="/assets/pics/cafe-bazar.png"
            />
          </div>
          <p className="selected-merchant-title">کافه بازار</p>
        </div>
        <div
          className="selected-merchant"
          style={{ backgroundImage: 'url(/assets/pics/mask-group.svg)' }}
        >
          <div className="img-wrapper">
            <img
              className="selected-merchant-img"
              src="/assets/pics/myket.png"
            />
          </div>
          <p className="selected-merchant-title">مایکت</p>
        </div>
        <div
          className="selected-merchant"
          style={{ backgroundImage: 'url(/assets/pics/mask-group.svg)' }}
        >
          <div className="img-wrapper">
            <img
              className="selected-merchant-img"
              src="/assets/pics/filimo.png"
            />
          </div>
          <p className="selected-merchant-title">فیلیمو</p>
        </div>
        <div
          className="selected-merchant"
          style={{ backgroundImage: 'url(/assets/pics/mask-group.svg)' }}
        >
          <img
            className="selected-merchant-img"
            src="/assets/pics/shatel.png"
          />
          <p className="selected-merchant-title">شاتل موبایل</p>
        </div>
      </div>
    </div>
  );
}

export default OtherMerchants;
