import Search, { type SearchProps } from 'antd/es/input/Search';
import SelectedMerchants from '../components/template/SelectedMerchants';
import OtherMerchants from '../components/template/OtherMerchants';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { ReactComponent as LeftArrowIcon } from '../icons/Arrow-Left 2.svg';
import { Switch } from 'antd';

import 'swiper/css';
import 'swiper/css/effect-cards';
import { Pagination, EffectCards, Autoplay } from 'swiper/modules';
import './style-slider-home.css';
import { useNavigate } from 'react-router-dom';

function HomeWithOutMandate() {
  const navigate = useNavigate();

  const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
    console.log(info?.source, value);
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
    if (checked) {
      navigate('/home/with-mandate', { replace: true });
    }
  };

  return (
    <div className="home-wrapper">
      <Swiper
        effect={'cards'}
        slidesOffsetAfter={3}
        // grabCursor={true}
        // modules={[Pagination, Navigation, EffectCards]}
        // pagination={{
        //   clickable: true,
        // }}
        // className="mySwiper"
        spaceBetween={30}
        centeredSlides={true}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination, EffectCards]}
        className="mySwiper slider-home"
      >
        <SwiperSlide className="banner-home">
          <img src="/assets/pics/Baner-home.svg" className="banner-home-1" />
        </SwiperSlide>
        <SwiperSlide className="banner-home">
          <img src="/assets/pics/Baner-home.svg" className="banner-home-2" />
        </SwiperSlide>
        <SwiperSlide className="banner-home">
          <img src="/assets/pics/Baner-home.svg" className="banner-home-3" />
        </SwiperSlide>
        <SwiperSlide className="banner-home">
          <img src="/assets/pics/Baner-home.svg" className="banner-home-4" />
        </SwiperSlide>
        <SliderButtons />
      </Swiper>
      {/* <div className="banner-home">
        <img src="/assets/pics/Baner-home.svg" />
      </div> */}
      <div className="home-des">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <p className="home-des_title">پیمان چیست؟</p>
          <Switch onChange={onChange} />
        </div>
        <p className="home-des_parghraf">
          «پیمان»، راهکار پرداخت مستقیم از حساب بانکی است که در آن، شما به
          اپلیکیشن یا کسب‌وکار آنلاین مورد نظر خود اجازه می‌دهید طبق شرایطی که
          در قرارداد بین طرفین ذکر می‌شود، در مدت زمان معینی از حساب بانکی‌تان
          هزینه خدمات را پرداخت کند.
        </p>
      </div>
      <Search
        placeholder="جستجوی نام کسب‌وکار"
        onSearch={onSearch}
        style={{ width: '90%' }}
        className="home-search_input"
      />

      <div className="home-merchants-wrapper">
        <div className="home-merchants">
          <SelectedMerchants />
          <OtherMerchants />
        </div>
      </div>
    </div>
  );
}

export default HomeWithOutMandate;

const SliderButtons = () => {
  const swiper = useSwiper();

  return (
    <div className="slider-buttons">
      <button onClick={() => swiper.slideNext()} className="slider-button">
        <img src="/assets/onboarding-img/Arrow-Right.svg" />
      </button>
      <button onClick={() => swiper.slidePrev()} className="slider-button">
        {/* <img src="/assets/onboarding-img/Arrow-Left-white.svg" /> */}
        <LeftArrowIcon />
      </button>
    </div>
  );
};
