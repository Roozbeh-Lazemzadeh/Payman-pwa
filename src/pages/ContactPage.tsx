import { ToastContainer } from 'react-toastify';
import { showCopiedToast } from '../components/shared/Toast/CustomToast';

import './style/style.css';
import { useEffect, useState } from 'react';
import SkeletonBannerContact from '../components/skeleton/SkeletonBannerContact';
// import SkeletonPaymansCart from '../components/skeleton/SkeletonPaymansCart';
const handleCopyClick = async (textToCopy: string) => {
  try {
    await navigator.clipboard.writeText(textToCopy);
    if (textToCopy === 'pay.payman.info@gmail.com') {
      showCopiedToast('آدرس ایمیل با موفقیت کپی شد.');
    } else {
      showCopiedToast('شماره تماس با موفقیت کپی شد.');
    }
  } catch (error) {
    console.error('Failed to copy', error);
  }
};

function ContactPage() {
  const [isLoading, setIsLoading] = useState(true);
  const handleDivClick = (e: {
    currentTarget: {
      querySelector: (arg0: string) => { (): any; new (): any; innerText: any };
    };
  }) => {
    const spanText: string =
      e.currentTarget.querySelector('.contact-title').innerText;
    handleCopyClick(spanText);
  };

  useEffect(() => {
    // Simulate data fetching with a 1000ms delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  return (
    <div className='contact-wrapper'>
      <ToastContainer position='bottom-center' />
      <div className='contact-banner_wrapper'>
        {isLoading ? (
          <SkeletonBannerContact />
        ) : (
          <img className='contact-banner' src='/assets/pics/contact.png' />
        )}
      </div>
      <div className='contact-details'>
        <div className='contact-detail'>
          <a href='tel:02122989880' className='contact-btn'>
            تماس با پشتیبانی
          </a>
          <div className='contact-left-wrapper' onClick={handleDivClick}>
            <img
              className='contact-left_img'
              src='/assets/pics/copy-icon.svg'
            />
            <span className='contact-title'>۰۲۱-۲۲۹۸۹۸۸۰</span>
          </div>
        </div>
        <div className='contact-detail'>
          <a href='tel:02122989880' className='contact-btn'>
            تماس با پشتیبانی
          </a>
          <div className='contact-left-wrapper' onClick={handleDivClick}>
            <img
              className='contact-left_img'
              src='/assets/pics/copy-icon.svg'
            />
            <span className='contact-title'>۰۲۱-۲۲۹۸۹۸۸۰</span>
          </div>
        </div>
        <div className='contact-detail'>
          <a href='mailto:pay.payman.info@gmail.com' className='contact-btn'>
            ارسال ایمیل
          </a>
          <div className='contact-left-wrapper' onClick={handleDivClick}>
            <img
              className='contact-left_img'
              src='/assets/pics/copy-icon.svg'
            />
            <span className='contact-title'>pay.payman.info@gmail.com</span>
          </div>
        </div>
        <p className='info-login contact'>
          هم‌پیمان‌ عزیز
          <br />
          در هر مرحله استفاده از اپلیکیشن، اگر به کمک و راهنمایی نیاز داشتید،
          همکاران ما در واحد پشتیبانی از ساعت ۹ صبح تا ۱۷ عصر پاسخ‌گوی شما
          خواهند بود.
        </p>
      </div>
    </div>
  );
}

export default ContactPage;
