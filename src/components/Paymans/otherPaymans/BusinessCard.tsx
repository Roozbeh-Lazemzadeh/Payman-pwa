import React from 'react';
import './style.css';

interface BusinessCardProps {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  title: string;
  active: boolean;
}

const BusinessCard: React.FC<BusinessCardProps> = ({
  icon: Icon,
  title,
  active,
}) => {
  return (
    <div className={`business-card-wrapper ${active ? 'clicked' : ''}`}>
      <Icon className={active ? 'clicked' : ''} />
      <div className={`title ${active ? 'clicked' : ''}`}>{title}</div>
    </div>
  );
};

export default BusinessCard;
