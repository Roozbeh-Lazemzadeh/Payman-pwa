import React, { type Dispatch, type SetStateAction } from "react";
import { CustomDrawer } from "./Drawer";
import { DotLeader } from "../../helpers/DotLeader";

interface DetailedDrawerProps {
  title: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  data: Array<any>;
  children?: React.ReactNode;
}



export const DetailedDrawer: React.FC<DetailedDrawerProps> = ({
  isOpen,
  setIsOpen,
  title,
  data,
  children,
}) => {
  return (
    <CustomDrawer isOpen={isOpen} title={title} setIsOpen={setIsOpen}>
      {
        <div className="detailed-drawer">
          {data.map((val, index) => (
            <DotLeader
              key={index}
              text1={val.nameItem1}
              text2={val.nameItem2}
            />
          ))}
          <div className="drawer-children">{children}</div>
        </div>
      }
    </CustomDrawer>
  );
};
