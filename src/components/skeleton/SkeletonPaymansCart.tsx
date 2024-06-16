/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React from 'react';
import './style.css';

const SkeletonPaymansCart: React.FC = () => {
  return (
    <>
      <div className='skeleton-paymans-wrapper'>
        <div className='skeleton-paymans-avatar'></div>
        <div className='skeleton-paymans-description'>
          <div className='paymans-description-one'></div>
          <div className='paymans-description-two'></div>
          <div className='paymans-description-three'></div>
        </div>
      </div>
    </>
  );
};

export default SkeletonPaymansCart;
