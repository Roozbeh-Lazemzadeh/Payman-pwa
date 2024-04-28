import React from 'react';
import { Button } from 'antd';
import {
  selectMerchantImg,
  selectMerchantTitle,
} from '../../../store/merchant/merchantSlice';
import { useAppSelector } from '../../hooks/reduxHooks';

const MerchantInfo: React.FC = () => {
  const merchantTitle = useAppSelector(selectMerchantTitle);
  const merchantImg = useAppSelector(selectMerchantImg);
  return (
    <>
      <div className='embedded-video'>
        <iframe
          width='100%'
          height='110'
          src='https://www.youtube.com/embed/PGlGdID_Mm8?si=43SuHls706k1C6Rt'
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          referrerPolicy='strict-origin-when-cross-origin'
          allowFullScreen
        ></iframe>
      </div>
      <div className='merchant-title'>
        <img src={merchantImg && merchantImg}></img>
        <span>پرداخت مستقیم در اپلیکیشن {merchantTitle && merchantTitle}</span>
      </div>
      <div className='merchant-description'>
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
        از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و
        سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
        متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه
        درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم
        افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و
        فرهنگ پیشرو در زبان فارسی ایجاد کرد
      </div>
      <div className='merchants-btn'>
        <Button className='merchant-enter-btn' type='primary'>
          ورود به سایت {merchantTitle && merchantTitle}
        </Button>
        <Button className='merchant-more-details' type='default'>
          مشاهده بیشتر
        </Button>
      </div>
    </>
  );
};

export default MerchantInfo;
