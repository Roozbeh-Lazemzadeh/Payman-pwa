import React, { useState } from 'react';
import { BusinessSection } from './BusinessSection';
import SelectedMerchants from '../../template/SelectedMerchants';
import OtherMerchants from '../../template/OtherMerchants';
import {
  otherMerchantsArray,
  selectedMerchantsArray,
} from '../../shared/Constant';
import MerchantSearch from '../../shared/Merchant/MerchantSearch';
import { MerchantBottomSheet } from '../../shared/Drawer/MerchantBottomSheet';
import MerchantInfo from '../../shared/Merchant/MerchantInfo';
import { type Merchant } from '../../types/Merchant';

import './style.css';
import '../../template/style.css';

export const OtherPaymans: React.FC = () => {
  const [selectedMerchants, setSelectedMerchants] = useState<Merchant[]>(
    selectedMerchantsArray
  );
  const [otherMerchants, setOtherMerchants] =
    useState<Merchant[]>(otherMerchantsArray);

  return (
    <div>
      <p className='info-login payman'>
        راهکار پرداخت مستقیم در کسب‌وکارهای متنوعی فعال است. شما می‌توانید با
        مراجعه به هر یک از آن‌ها، پیمان دلخواه خود را فعال کنید.
      </p>
      <MerchantSearch
        setSelectedMerchants={setSelectedMerchants}
        setOtherMerchants={setOtherMerchants}
      />
      <BusinessSection />
      <div className='home-merchants-wrapper'>
        <div className='home-merchants payman'>
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
