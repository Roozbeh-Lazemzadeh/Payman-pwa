import React from 'react';
import './style.css';

function ContactUs() {
  return (
    <div className="contact-wrapper">
      <img className="contact-banner" src="/assets/pics/contact.svg" />
      <div className="contact-details">
        <div className="contact-detail">
          <a href="tel:02122989880" className="contact-btn">
            تماس با پشتیبانی
          </a>
          <span className="contact-title">۰۲۱-۲۲۹۸۹۸۸۰</span>
        </div>
        <div className="contact-detail">
          <a href="tel:02122989880" className="contact-btn">
            تماس با پشتیبانی
          </a>
          <span className="contact-title">۰۲۱-۲۲۹۸۹۸۸۰</span>
        </div>
        <div className="contact-detail">
          <a href="mailto:pay.payman.info@gmail.com" className="contact-btn">
            ارسال ایمیل
          </a>
          <span className="contact-title">pay.payman.info@gmail.com</span>
        </div>
        <p className="info-login">
          هم‌پیمان‌عزیز
          <br />
          در هر مرحله استفاده از اپلیکیشن، اگر به کمک و راهنمایی نیاز داشتید،
          همکاران ما در واحد پشتیبانی از ساعت ۹ صبح تا ۱۷ عصر پاسخ‌گوی شما
          خواهند بود.
        </p>
      </div>
    </div>
  );
}

export default ContactUs;
