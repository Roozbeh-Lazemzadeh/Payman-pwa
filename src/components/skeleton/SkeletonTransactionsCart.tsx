/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React from 'react';
import './style.css';

const SkeletonTransactionsCart: React.FC = () => {
  return (
    <>
      <div className='skeleton-transactions-wrapper'>
        <div className='skeleton-transactions-avatar'></div>
        <div className='skeleton-transactions-description'>
          <div className='transactions-description-one'></div>
          <div className='transactions-description-two'></div>
        </div>
        <div className='skeleton-transactions-icon'>
          <div className='status-skeleton-transactions'></div>
        </div>
      </div>
    </>
  );
};

export default SkeletonTransactionsCart;
