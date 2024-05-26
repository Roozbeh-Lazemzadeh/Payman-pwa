import React from 'react';
import { CustomDrawer } from './Drawer';
import { selectBottomSheetIsOpen } from '../../../store/bottomSheet/bottomSheetSlice';
import { useAppSelector } from '../../hooks/reduxHooks';

import './style.css';
interface DetailedDrawerProps {
  children?: React.ReactNode;
}
export const MerchantBottomSheet: React.FC<DetailedDrawerProps> = ({
  children,
}) => {
  const isOpen = useAppSelector(selectBottomSheetIsOpen);
  return (
    <CustomDrawer isOpen={isOpen} title={''}>
      {
        <div className='detailed-drawer merchant'>
          <div>{children}</div>
        </div>
      }
    </CustomDrawer>
  );
};
