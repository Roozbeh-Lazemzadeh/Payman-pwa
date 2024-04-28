import React, { useState } from 'react';
import { BusinessSection } from './BusinessSection';
import './style.css';
import '../../template/style.css';
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

export const OtherPaymans: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
          <SelectedMerchants
            merchants={selectedMerchants}
            setIsOpen={setIsOpen}
          />
          <OtherMerchants merchants={otherMerchants} setIsOpen={setIsOpen} />
        </div>
      </div>
      <MerchantBottomSheet
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={'جزئیات بیشتر'}
      >
        <MerchantInfo />
      </MerchantBottomSheet>
    </div>
  );
};
