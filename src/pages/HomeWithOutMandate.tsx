import { useState } from 'react';
import SelectedMerchants from '../components/template/SelectedMerchants';
import OtherMerchants from '../components/template/OtherMerchants';
import { Switch } from 'antd';
import { useNavigate } from 'react-router-dom';
import Slider from '../components/slider/Slider';
import { MerchantBottomSheet } from '../components/shared/Drawer/MerchantBottomSheet';
import {
  homeSliderArray,
  otherMerchantsArray,
  selectedMerchantsArray,
} from '../components/shared/Constant';
import MerchantSearch from '../components/shared/Merchant/MerchantSearch';
import MerchantInfo from '../components/shared/Merchant/MerchantInfo';
import { type Merchant } from '../components/types/Merchant';
import './style/style.css';

const HomeWithOutMandate: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMerchants, setSelectedMerchants] = useState<Merchant[]>(
    selectedMerchantsArray
  );
  const [otherMerchants, setOtherMerchants] =
    useState<Merchant[]>(otherMerchantsArray);

  const onChange = (checked: boolean) => {
    if (checked) {
      navigate('/home/with-mandate', { replace: true });
    }
  };

  return (
    <div className='home-wrapper'>
      <Slider ImgArray={homeSliderArray} />

      <div className='home-des'>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <p className='home-des_title'>پیمان چیست؟</p>
          <Switch onChange={onChange} />
        </div>

        <p className='home-des_parghraf'>
          «پیمان»، راهکار پرداخت مستقیم از حساب بانکی است که در آن، شما به
          اپلیکیشن یا کسب‌وکار آنلاین مورد نظر خود اجازه می‌دهید طبق شرایطی که
          در قرارداد بین طرفین ذکر می‌شود، در مدت زمان معینی از حساب بانکی‌تان
          هزینه خدمات را پرداخت کند.
        </p>
      </div>
      <MerchantSearch
        setSelectedMerchants={setSelectedMerchants}
        setOtherMerchants={setOtherMerchants}
      />
      <div className='home-merchants-wrapper'>
        <div className='home-merchants'>
          <SelectedMerchants merchants={selectedMerchants} />
          <OtherMerchants merchants={otherMerchants} />
        </div>
      </div>
      <MerchantBottomSheet>
        <MerchantInfo />
      </MerchantBottomSheet>
    </div>
  );
};

export default HomeWithOutMandate;
