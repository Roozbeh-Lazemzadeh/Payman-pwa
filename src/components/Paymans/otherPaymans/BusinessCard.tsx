import React from 'react';
import './style.css';

interface BusinessCardProps {
  title: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | string;
  active: boolean;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ title, icon, active }) => {
  return (
    <div className={`business-card-wrapper ${active ? 'clicked' : ''}`}>
      <div className='business-card-icon'>
        {typeof icon === 'string' ? (
          <img src={icon} alt={`${title} icon`} />
        ) : (
          React.createElement(icon, { className: active ? 'clicked' : '' })
        )}
      </div>
      <div className={`title ${active ? 'clicked' : ''}`}>{title}</div>
    </div>
  );
};

export default BusinessCard;
