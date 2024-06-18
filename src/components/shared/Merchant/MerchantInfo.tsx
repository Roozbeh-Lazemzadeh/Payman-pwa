import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import {
  selectMerchantImg,
  selectMerchantTitle,
} from '../../../store/merchant/merchantSlice';
import { useAppSelector } from '../../hooks/reduxHooks';
import SkeletonButtonSheet from '../../skeleton/SkeletonButtonSheet';

const MerchantInfo: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const merchantTitle = useAppSelector(selectMerchantTitle);
  const merchantImg = useAppSelector(selectMerchantImg);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup function to clear the timeout
  }, []);

  return (
    <>
    {isLoading ? <SkeletonButtonSheet/>
      : <><div className='h_iframe-aparat_embed_frame'>
          <iframe
            src='https://www.aparat.com/video/video/embed/videohash/k588l9q/vt/frame'
            allowFullScreen
            style={{ width: '100%', borderRadius: '10px', borderWidth: '1px' }}
          ></iframe>
        </div><div className='merchant-title'>
            <img src={merchantImg && merchantImg}></img>
            <span>پرداخت مستقیم در اپلیکیشن {merchantTitle && merchantTitle}</span>
          </div><div className='merchant-description'>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
            از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و
            سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
            متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه
            درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم
            افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و
            فرهنگ پیشرو در زبان فارسی ایجاد کرد
          </div></> }
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
