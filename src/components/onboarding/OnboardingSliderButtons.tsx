/* eslint-disable multiline-ternary */
import { type FC, useState } from 'react';
import { Progress } from 'antd';
import { useSwiper } from 'swiper/react';
import { useNavigate } from 'react-router-dom';

interface OnboardingSliderButtonsProps {
  tickShow: boolean;
  settickShow: (value: boolean) => void;
}

const OnboardingSliderButtons: FC<OnboardingSliderButtonsProps> = ({
  tickShow,
  settickShow,
}) => {
  const navigate = useNavigate();
  const [btnShow, setbtnShow] = useState<boolean>(false);
  const [circle, setCircle] = useState<number>(33.33);
  const swiper = useSwiper();

  swiper.on('slideChange', function (e: any) {
    const currentIndex: number = e.activeIndex;

    switch (currentIndex) {
      case 0:
        setCircle(33.33);
        break;
      case 1:
        setCircle(66.66);
        break;
      case 2:
        setCircle(100);
        break;
      default:
        break;
    }
    setbtnShow(currentIndex > 0);
    settickShow(currentIndex === e.slides.length - 1);
  });

  const handleNextClick = (): void => {
    swiper.slideNext();
  };

  const handlePrevClick = (): void => {
    swiper.slidePrev();
  };

  const NavigateToHomePage = (): void => {
    navigate('/home');
  };

  return (
    <div className="btn-slid">
      <span onClick={handlePrevClick} className="prevClick">
        {btnShow ? <img src="/assets/onboarding-img/Arrow-Left.svg" /> : null}
      </span>
      <Progress
        className="progress-wrapper"
        type="circle"
        percent={circle}
        strokeColor="#0072FF"
        strokeWidth={2}
        size={[62, 69]}
        format={() => (
          <span onClick={handleNextClick} className="nextClick">
            {tickShow ? (
              <img
                src="/assets/onboarding-img/Path.svg"
                style={{
                  backgroundColor: '#0072FF',
                  padding: '1rem',
                  borderRadius: '50%',
                  width: '1rem',
                  height: '1rem',
                }}
                onClick={NavigateToHomePage}
              />
            ) : (
              <img
                src="/assets/onboarding-img/Arrow-Right.svg"
                style={{
                  backgroundColor: '#0072FF',
                  padding: '1rem',
                  borderRadius: '50%',
                  width: '1rem',
                  height: '1rem',
                }}
              />
            )}
          </span>
        )}
      />
    </div>
  );
};

export default OnboardingSliderButtons;
