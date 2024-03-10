import { type FC } from 'react';
import { useState } from 'react';
import { Pagination, Navigation, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
// import 'swiper/modules/pagination/pagination.min.css';
// import 'swiper/modules/navigation/navigation.min.css';
// import 'swiper/modules/effect-fade/effect-fade.min.css';
import OnboardingRedirectBtn from '../components/onboarding/OnboardingRedirectBtn';
import OnboardingItem from '../components/onboarding/OnboardingItem';
import OnboardingSliderButtons from '../components/onboarding/OnboardingSliderButtons';
import mock from '../data.json';

export interface OnboardingProps {
  tickShow?: boolean;
}

const Onboarding: FC<OnboardingProps> = () => {
  const [tickShow, settickShow] = useState<boolean>(false);

  return (
    <div className="onboardingStyle">
      <div className="headerOnboarding">
        <div className="headerOnboarding-box"></div>
        <img
          className="headerOnboarding-img"
          src="/assets/onboarding-img/logo-payman-onboarding.svg"
        />
        <OnboardingRedirectBtn tickShow={tickShow} />
      </div>
      <div className="onboardingSlider">
        <Swiper
          className="mySwiper"
          spaceBetween={30}
          effect={'fade'}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Navigation, EffectFade]}
        >
          {mock.map((item) => (
            <SwiperSlide key={item.id}>
              <OnboardingItem item={item} />
            </SwiperSlide>
          ))}
          <OnboardingSliderButtons
            tickShow={tickShow}
            settickShow={settickShow}
          />
        </Swiper>
      </div>
    </div>
  );
};

export default Onboarding;
