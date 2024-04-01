import React from 'react';
import { useNavigate } from 'react-router-dom';

interface OnboardingRedirectBtnProps {
  tickShow: boolean;
}

const OnboardingRedirectBtn: React.FC<OnboardingRedirectBtnProps> = ({
  tickShow,
}) => {
  const navigate = useNavigate();

  const NavigateToHomePage = (): void => {
    navigate('/home');
  };
  return (
    <div className="headerOnboarding-navgit">
      {!tickShow && <p onClick={NavigateToHomePage}>رد کردن</p>}
    </div>
  );
};

export default OnboardingRedirectBtn;
