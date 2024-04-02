import React, { useState } from "react";
import { TransactionCard } from "../shared/Cards/TransactionCards";
import { DetailedDrawer } from "../shared/Drawer/DetailedDrawer";

export const TransactionsList: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const handleOpenDetailedDrawer = () => {};
  const DetailedDrawerArray = [
    { nameItem1: "بانک", nameItem2: "سامان" },
    { nameItem1: "شماره موبایل", nameItem2: "989385445348+" },
    { nameItem1: "شناسه پیمان", nameItem2: "Ajdfni830874p39vfndl" },
  ];
  const UnknownTextInfo: React.FC = () => {
    return (
      <div className="info-login detail">
        <div>دلیل نامشخص بودن تراکنش :</div>‌
        <div>
          سرویس بانکی شما ( سامان ) در حال حاظر پاسخگو نمی‌باشد . در صورت کم شدن
          موجودی مبلغ شما طی ۴۸ ساعت آینده برای شما واریز میشود .
        </div>
      </div>
    );
  };

  return (
    <div>
      <DetailedDrawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"جزئیات بیشتر"}
        data={DetailedDrawerArray}
      >
        <UnknownTextInfo />
      </DetailedDrawer>
      {Array.from({ length: 5 }, (value) => value).map((val, index) => (
        <div key={index} onClick={() => setIsOpen(!isOpen)}>
          <TransactionCard
            merchant="تپسی"
            price={4550}
            transStatus="موفق"
            transDate="سه‌شنبه، ۱۴۰۲/۰۷/۲۵- ۱۸:۴۸"
            transStatusIcon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.03369 9.99996L9.01202 11.9775L12.967 8.02246"
                  stroke="#12B76A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.2915 10.0001C2.2915 15.7809 4.219 17.7084 9.99984 17.7084C15.7807 17.7084 17.7082 15.7809 17.7082 10.0001C17.7082 4.21925 15.7807 2.29175 9.99984 2.29175C4.219 2.29175 2.2915 4.21925 2.2915 10.0001Z"
                  stroke="#12B76A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
        </div>
      ))}
    </div>
  );
};
