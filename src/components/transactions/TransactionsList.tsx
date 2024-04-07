import React, { useState } from "react";
import { TransactionCard } from "../shared/Cards/TransactionCards";
import { DetailedDrawer } from "../shared/Drawer/DetailedDrawer";
import { ReactComponent as SuccessfulIcon } from "../../icons/success.svg";
import { ReactComponent as UnsuccessfulIcon } from "../../icons/unsuccess.svg";
import { ReactComponent as UnclearIcon } from "../../icons/unclearStatus.svg";
import "./style.css";

export const TransactionsList: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
    <div className="trans-list">
      <DetailedDrawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"جزئیات بیشتر"}
        data={DetailedDrawerArray}
      >
        <UnknownTextInfo />
      </DetailedDrawer>
      {Array.from({ length: 5 }, (value) => value).map((val, index) => (
        <div
          key={index}
          onClick={() => setIsOpen(!isOpen)}
          style={{ direction: "rtl" }}
        >
          <TransactionCard
            merchant="تپسی"
            price={4550}
            transStatus="موفق"
            transDate="سه‌شنبه، ۱۴۰۲/۰۷/۲۵- ۱۸:۴۸"
            transStatusIcon={<SuccessfulIcon />}
          />
        </div>
      ))}
      <div onClick={() => setIsOpen(!isOpen)} style={{ direction: "rtl" }}>
        <TransactionCard
          merchant="تپسی"
          price={4550}
          transStatus="ناموفق"
          transDate="سه‌شنبه، ۱۴۰۲/۰۷/۲۵- ۱۸:۴۸"
          transStatusIcon={<UnsuccessfulIcon />}
        />
      </div>
      <div onClick={() => setIsOpen(!isOpen)} style={{ direction: "rtl" }}>
        <TransactionCard
          merchant="تپسی"
          price={4550}
          transStatus="نامشخص"
          transDate="سه‌شنبه، ۱۴۰۲/۰۷/۲۵- ۱۸:۴۸"
          transStatusIcon={<UnclearIcon />}
        />
      </div>
    </div>
  );
};
