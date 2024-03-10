import React from 'react';
import './style.css';

interface DotLeaderProps {
  text1: string;
  text2: string;
}

export const DotLeader: React.FC<DotLeaderProps> = ({ text1, text2 }) => {
  return (
    <div className="dot-leader-wrapper">
      <span className="start-text">{text1}</span>
      <span className="dots">
        {Array.from({ length: 1000 }, (value, index) => value).map(() => '.')}
      </span>
      <span className="end-text">{text2} </span>
    </div>
  );
};
