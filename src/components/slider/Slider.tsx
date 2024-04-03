/* eslint-disable react/react-in-jsx-scope */
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Autoplay, EffectCards, Pagination } from "swiper/modules";
import { ReactComponent as LeftArrowIcon } from "../../icons/Arrow-Left2.svg";
import { ReactComponent as RightArrowIcon } from "../../icons/Arrow-Right2.svg";
import "swiper/css";
import "swiper/css/effect-cards";
import "./style-slider-home.css";
import { type FC } from "react";

export interface SliderProps {
  ImgArray: any[];
}

const Slider: FC<SliderProps> = ({ ImgArray }) => {
  return (
    <Swiper
      effect={"cards"}
      slidesOffsetAfter={3}
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination, EffectCards]}
      className="mySwiper slider-home"
    >
      {/* <SwiperSlide className="banner-home">
          <img src="/assets/pics/Baner-home.svg" className="banner-home-1" />
        </SwiperSlide> */}
      {ImgArray.map((item) => (
        <SwiperSlide key={item.id}>
          <img src={item.img} className="banner-home-1" />
        </SwiperSlide>
      ))}
      <SliderButtons />
    </Swiper>
  );
};

export default Slider;

export const SliderButtons = () => {
  const swiper = useSwiper();

  return (
    <div className="slider-buttons">
      <span onClick={() => swiper.slideNext()} className="slider-button">
        <RightArrowIcon />
      </span>

      <span onClick={() => swiper.slidePrev()} className="slider-button">
        <LeftArrowIcon />
      </span>
    </div>
  );
};
