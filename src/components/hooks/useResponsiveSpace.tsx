import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useResponsiveSpace = () => {
  const location = useLocation();
  const [spaceCount, setSpaceCount] = useState(20);
  const [dateSpace, setDateSpace] = useState(20);
  const pathName = location.pathname;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 375) {
        if (pathName !== '/paymans/me') {
          setSpaceCount(18);
          setDateSpace(13);
        } else {
          setSpaceCount(8);
          setDateSpace(20);
        }
      } else if (window.innerWidth >= 375 && window.innerWidth < 390) {
        if (pathName !== '/paymans/me') {
          setSpaceCount(20);
          setDateSpace(14);
        } else {
          setSpaceCount(3);
          setDateSpace(17);
        }
      } else if (window.innerWidth >= 390 && window.innerWidth < 415) {
        if (pathName !== '/paymans/me') {
          setSpaceCount(23);
          setDateSpace(17);
        } else {
          setSpaceCount(5);
          setDateSpace(19);
        }
      } else if (window.innerWidth >= 415 && window.innerWidth <= 440) {
        if (pathName !== '/paymans/me') {
          setSpaceCount(27);
          setDateSpace(21);
        } else {
          setSpaceCount(10);
          setDateSpace(22);
        }
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { spaceCount, dateSpace };
};

export default useResponsiveSpace;
