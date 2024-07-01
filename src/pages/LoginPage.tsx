import { type FC, useState, useEffect } from 'react';
import SendOTPForm from '../components/template/SendOTPForm';
import CheckOTPForm from '../components/template/CheckOTPForm';
import FooterApp from '../components/layout/sidebar/SidebarFooter';
import './style/style.css';
import SkeletonBannerLogin from '../components/skeleton/SkeletonBannerLogin';

const LoginPage: FC = () => {
  const [step, setStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching with a 1000ms delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  return (
    <>
      {isLoading ? (
        <SkeletonBannerLogin />
      ) : (
        <img className='login-banner' src='/assets/pics/img-login.svg'></img>
      )}
      <div className='login-body'>
        <div className='login-body-wrapper'>
          <div className='login-header'>
            <img
              src='/assets/onboarding-img/logo-payman-onboarding.svg'
              alt=''
              className='login-header__logo'
            />
            <p className='login-header__title'>پرداخت، این‌بار لذت‌بخش</p>
          </div>
          {step === 1 && <SendOTPForm setStep={setStep} />}
          {step === 2 && <CheckOTPForm />}
          <FooterApp topSpace='18px' />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
