import React, { useState } from 'react';
import { CustomDrawer } from './Drawer';
import { DotLeader } from '../../helpers/DotLeader';

export const DetailedDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <CustomDrawer
      isOpen={isOpen}
      title={'توافق‌نامه کاربری پیمان'}
      setIsOpen={setIsOpen}
    >
      {
        <div>
          {Array.from({ length: 5 }, (value, index) => value).map(
            (val, index) => (
              <DotLeader key={index} text1="نام" text2="بانک سامان" />
            )
          )}
        </div>
      }
    </CustomDrawer>
  );
};
