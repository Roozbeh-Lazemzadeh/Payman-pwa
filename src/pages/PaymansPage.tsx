import React from 'react';
import { Outlet } from 'react-router-dom';
import { PaymanSegmented } from '../components/shared/Segmented/PaymanSegmented';

const PaymansLayout: React.FC = () => {
  return (
    <>
      <PaymanSegmented />
      <Outlet />
    </>
  );
};

export default PaymansLayout;
