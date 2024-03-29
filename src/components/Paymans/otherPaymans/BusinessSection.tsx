import React, { useState } from 'react';
import BusinessCard from './BusinessCard';
import { ReactComponent as OpratorIcon } from '../../../icons/calling2.svg';
import { ReactComponent as AllIcon } from '../../../icons/payman.svg';
import { ReactComponent as ScanIcon } from '../../../icons/scan.svg';
import { ReactComponent as BuyIcon } from '../../../icons/buy.svg';
import { ReactComponent as VideoIcon } from '../../../icons/video.svg';
import { ReactComponent as HeartIcon } from '../../../icons/heart.svg';
import './style.css';

export const BusinessSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>('1');

  const handleSelectedCard = (id: string) => {
    setSelectedId(id);
  };

  return (
    <div className="business-content">
      <div className="business-section-wrapper">
        <div id="1" onClick={() => handleSelectedCard('1')}>
          <BusinessCard
            title="همه"
            icon={AllIcon}
            active={selectedId === '1'}
          />
        </div>
        <div id="2" onClick={() => handleSelectedCard('2')}>
          <BusinessCard
            title="تکنولوژی"
            icon={ScanIcon}
            active={selectedId === '2'}
          />
        </div>
        <div id="3" onClick={() => handleSelectedCard('3')}>
          <BusinessCard
            title="اپراتورها"
            icon={OpratorIcon}
            active={selectedId === '3'}
          />
        </div>
        <div id="4" onClick={() => handleSelectedCard('4')}>
          <BusinessCard
            title="مارکت"
            icon={BuyIcon}
            active={selectedId === '4'}
          />
        </div>
        <div id="5" onClick={() => handleSelectedCard('5')}>
          <BusinessCard
            title="فیلم"
            icon={VideoIcon}
            active={selectedId === '5'}
          />
        </div>
        <div id="6" onClick={() => handleSelectedCard('6')}>
          <BusinessCard
            title="سفر"
            icon={HeartIcon}
            active={selectedId === '6'}
          />
        </div>
      </div>
      <div className="rect-overlay-right"></div>
      <div className="rect-overlay-left"></div>
    </div>
  );
};
