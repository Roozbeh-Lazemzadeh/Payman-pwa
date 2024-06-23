import React, { useState } from 'react';
import BusinessCard from './BusinessCard';
import mock from '../../../data/category.json';
import './style.css';

export const BusinessSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>('1');

  const handleSelectedCard = (id: string) => {
    setSelectedId(id);
  };

  return (
    <div className='business-content'>
      <div className='business-section-wrapper'>
        {mock.map((item, index) => (
          <div
            key={index}
            id={item.id}
            onClick={() => handleSelectedCard(item.id)}
          >
            <BusinessCard
              title={item.title}
              icon={item.img} // Assuming item.img contains the path to the image
              active={selectedId === item.id}
            />
          </div>
        ))}
      </div>
      <div className='rect-overlay-right'></div>
      <div className='rect-overlay-left'></div>
    </div>
  );
};
