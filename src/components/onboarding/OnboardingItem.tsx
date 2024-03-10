import { type FC } from 'react';
import './style.css';

interface OnboardingItemProps {
  item: {
    img: string;
    title: string;
    description: string;
  };
}

const OnboardingItem: FC<OnboardingItemProps> = ({ item }) => {
  return (
    <div className="item-wrapper">
      <img className="item-onboarding_img" src={item.img} />
      <h3 className="item-onboarding_title">{item.title}</h3>
      <p className="item-onboarding-des">{item.description}</p>
    </div>
  );
};

export default OnboardingItem;
