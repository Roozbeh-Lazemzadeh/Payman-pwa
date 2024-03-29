import React from 'react';
import Search, { type SearchProps } from 'antd/es/input/Search';
import { BusinessSection } from './BusinessSection';
import './style.css';
import '../../template/style.css';
import SelectedMerchants from '../../template/SelectedMerchants';
import OtherMerchants from '../../template/OtherMerchants';

export const OtherPaymans: React.FC = () => {
  const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
    console.log(info?.source, value);
  return (
    <div>
      <p className="info-login payman">
        راهکار پرداخت مستقیم در کسب‌وکارهای متنوعی فعال است. شما می‌توانید با
        مراجعه به هر یک از آن‌ها، پیمان دلخواه خود را فعال کنید.
      </p>
      <Search
        placeholder="جستجوی کسب‌وکار"
        onSearch={onSearch}
        style={{ width: '90%' }}
        className="home-search_input payman"
      />
      <BusinessSection />
      <div className="home-merchants-wrapper">
        <div className="home-merchants payman">
          <SelectedMerchants />
          <OtherMerchants />
        </div>
      </div>
    </div>
  );
};
