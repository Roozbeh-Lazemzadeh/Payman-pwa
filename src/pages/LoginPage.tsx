import { type FC, useState } from 'react';
import SendOTPForm from '../components/template/SendOTPForm';
import CheckOTPForm from '../components/template/CheckOTPForm';
import FooterApp from '../components/shared/Footer/FooterApp';
import './style/style.css';

const LoginPage: FC = () => {
  const [step, setStep] = useState<number>(2);

  return (
    <div
      className='login-wrapper'
      style={{ backgroundImage: 'url(/assets/pics/img-login.svg)' }}
    >
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
          <FooterApp />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
