import Search, { type SearchProps } from 'antd/es/input/Search';
import SelectedMerchants from '../components/template/SelectedMerchants';
import OtherMerchants from '../components/template/OtherMerchants';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-cards';
import { Pagination, EffectCards, Autoplay } from 'swiper/modules';

import './style-slider-home.css';
function HomeWithOutMandate() {
  const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
    console.log(info?.source, value);

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
          <img src="/assets/pics/Baner-home.svg" />
        </SwiperSlide>
        <SwiperSlide className="banner-home">
          <img src="/assets/pics/Baner-home.svg" />
        </SwiperSlide>
        <SwiperSlide className="banner-home">
          <img src="/assets/pics/Baner-home.svg" />
        </SwiperSlide>
        <SwiperSlide className="banner-home">
          <img src="/assets/pics/Baner-home.svg" />
        </SwiperSlide>
        <SliderButtons />
      </Swiper>
      {/* <div className="banner-home">
        <img src="/assets/pics/Baner-home.svg" />
      </div> */}
      <div className="home-des">
        <p className="home-des_title">پیمان چیست؟</p>
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
          <div className="home-merchants_">
            <SelectedMerchants />
            <OtherMerchants />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeWithOutMandate;

const SliderButtons = () => {
  const swiper = useSwiper();

  return (
    <div className="flexCenter r-buttons">
      <button onClick={() => swiper.slideNext()}>
        <img src="/assets/onboarding-img/Arrow-Right.svg" />
      </button>
      <button onClick={() => swiper.slidePrev()}>
        <img src="/assets/onboarding-img/Arrow-Left.svg" />
      </button>
    </div>
  );
};
