// import { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

// const useResponsiveSpace = () => {
//   const location = useLocation();
//   const [spaceCount, setSpaceCount] = useState(20);
//   const [dateSpace, setDateSpace] = useState(20);
//   const pathName = location.pathname;

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 375) {
//         if (pathName !== '/paymans/me') {
//           setSpaceCount(18);
//           setDateSpace(13);
//         } else {
//           setSpaceCount(8);
//           setDateSpace(20);
//         }
//       } else if (window.innerWidth >= 375 && window.innerWidth < 390) {
//         if (pathName !== '/paymans/me') {
//           setSpaceCount(22);
//           setDateSpace(16);
//         } else {
//           setSpaceCount(3);
//           setDateSpace(17);
//         }
//       } else if (window.innerWidth >= 390 && window.innerWidth < 415) {
//         if (pathName !== '/paymans/me') {
//           setSpaceCount(25);
//           setDateSpace(19);
//         } else {
//           setSpaceCount(5);
//           setDateSpace(19);
//         }
//       } else if (window.innerWidth >= 415 && window.innerWidth <= 440) {
//         if (pathName !== '/paymans/me') {
//           setSpaceCount(29);
//           setDateSpace(23);
//         } else {
//           setSpaceCount(10);
//           setDateSpace(22);
//         }
//       }
//     };

//     handleResize(); // Set initial value
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return { spaceCount, dateSpace };
// };

// export default useResponsiveSpace;
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const useResponsiveSpace = () => {
  const location = useLocation();
  const [spaceCount, setSpaceCount] = useState(20);
  const [dateSpace, setDateSpace] = useState(20);
  const inputRef = useRef<HTMLDivElement>(null); // Type the inputRef correctly
  const pathName = location.pathname;

  useEffect(() => {
    const calculateSpaces = () => {
      if (inputRef.current) {
        const inputWidth = inputRef.current.offsetWidth;
        console.log(inputWidth);
        if (pathName !== '/paymans/me') {
          setSpaceCount(Math.floor((inputWidth - 50) / 8.5));
          setDateSpace(Math.floor((inputWidth - 50) / 12.5));
        } else {
          setSpaceCount(Math.floor((inputWidth - 50) / 28));
          setDateSpace(Math.floor((inputWidth - 50) / 9));
        }
      }
    };

    calculateSpaces(); // Set initial value
    window.addEventListener('resize', calculateSpaces);

    return () => {
      window.removeEventListener('resize', calculateSpaces);
    };
  }, []);

  return { spaceCount, dateSpace, inputRef };
};

export default useResponsiveSpace;
