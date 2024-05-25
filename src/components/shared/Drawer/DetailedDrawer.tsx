import React from 'react';
import { CustomDrawer } from './Drawer';
import { DotLeader } from '../../helpers/DotLeader';
import { useAppSelector } from '../../hooks/reduxHooks';
import { selectBottomSheetIsOpen } from '../../../store/bottomSheet/bottomSheetSlice';

interface DetailedDrawerItem {
  firstWord: string;
  secondWord: string | number;
}
interface DetailedDrawerProps {
  title: string;
  isOpen: boolean;
  data: DetailedDrawerItem[];
  children?: React.ReactNode;
}

export const DetailedDrawer: React.FC<DetailedDrawerProps> = ({
  title,
  data,
  children,
}) => {
  const isOpen = useAppSelector(selectBottomSheetIsOpen);
  return (
    <CustomDrawer isOpen={isOpen} title={title}>
      {
        <div className='detailed-drawer'>
          {data.map((value, index) => (
            <DotLeader
              key={index}
              firstWord={value.firstWord}
              secondWord={value.secondWord}
            />
          ))}
          <div className='drawer-children'>{children}</div>
        </div>
      }
    </CustomDrawer>
  );
};
