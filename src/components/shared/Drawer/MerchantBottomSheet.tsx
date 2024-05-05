import React, { type Dispatch, type SetStateAction } from 'react';
import { CustomDrawer } from './Drawer';
import './style.css';

interface DetailedDrawerProps {
  title: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children?: React.ReactNode;
}
export const MerchantBottomSheet: React.FC<DetailedDrawerProps> = ({
  isOpen,
  children,
}) => {
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
