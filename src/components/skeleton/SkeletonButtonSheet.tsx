import React from 'react';
import './style.css';

const SkeletonButtonSheet: React.FC = () => {
  return (
    <>
      <div className='skeleton-ButtonSheet-wrapper'>
        <div className='skeleton-banner-wrapper'>
          <div className='skeleton-banner'></div>
        </div>
        <div className='skeleton-ButtonSheet-mid'>
          <div className='skeleton-ButtonSheet-avatar'></div>
          <div className='skeleton-ButtonSheet-disc'></div>
        </div>
        <div className='skeleton-ButtonSheet-first'></div>
        <div className='skeleton-ButtonSheet-two'></div>
        <div className='skeleton-ButtonSheet-three'></div>
      </div>
    </>
  );
};

export default SkeletonButtonSheet;
