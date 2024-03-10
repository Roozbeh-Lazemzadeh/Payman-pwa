import Search, { type SearchProps } from 'antd/es/input/Search';
import SelectedMerchants from '../components/template/SelectedMerchants';
import OtherMerchants from '../components/template/OtherMerchants';
import './style.css';
import { Sort } from '../components/sort/Sort';
function HomeWithOutMandate() {
  const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
    console.log(info?.source, value);

  return (
    <div className="home-wrapper">
      <div className="banner-home">
        <img src="/assets/pics/Baner-home.svg" />
      </div>
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
            <Sort />
            <SelectedMerchants />
            <OtherMerchants />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeWithOutMandate;
