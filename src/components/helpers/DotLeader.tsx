import React from 'react';
import './style.css';

interface DotLeaderProps {
  firstWord: string;
  secondWord: string | number;
  className?: string;
}

export const DotLeader: React.FC<DotLeaderProps> = ({
  firstWord,
  secondWord,
  className,
}) => {
  return (
    <div className='dot-leader-wrapper'>
      <span className='start-text'>{firstWord}</span>
      <span className='dots'>
        {Array.from({ length: 1000 }, (value) => value).map(() => '.')}
      </span>
      <span className={`end-text${className ? ` ${className}` : ''}`}>
        {secondWord}
      </span>
    </div>
  );
};
