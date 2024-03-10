import React from 'react';

interface OnboardingRedirectBtnProps {
  tickShow: boolean;
}

const OnboardingRedirectBtn: React.FC<OnboardingRedirectBtnProps> = ({
  tickShow,
}) => {
  return (
    <div className="headerOnboarding-navgit">{!tickShow && <p>رد کردن</p>}</div>
  );
};

export default OnboardingRedirectBtn;
