/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import { MerchantChartSection } from "../components/chart/MerchantChartSection";
import FilterTools from "../components/template/FilterTools";
import { TransactionHomeCard } from "../components/shared/Cards/TransactionHomeCards";
import { DetailedDrawer } from "../components/shared/Drawer/DetailedDrawer";

function HomeWithMandate() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(1);

  const DetailedDrawerArray = [
    { nameItem1: "بانک", nameItem2: "سامان" },
    { nameItem1: "شماره موبایل", nameItem2: "989385445348+" },
    { nameItem1: "شناسه پیمان", nameItem2: "Ajdfni830874p39vfndl" },
  ];

  const HomedatepickersArray = [
    { id: 1, month: "اردبیهشت" },
    { id: 2, month: "خرداد" },
    { id: 3, month: "تیر" },
    { id: 4, month: "مرداد" },
    { id: 5, month: "شهریور" },
    { id: 6, month: "مهر" },
  ];

  const handleItemClick = (id: any) => {
    setSelectedItemIndex(id === selectedItemIndex ? null : id);
  };

  return (
    <div className="home-wrapper">
      <div className="home-datepickers">
        {HomedatepickersArray.map((item) => (
          <div
            className={`home-datepicker ${
              item.id === selectedItemIndex ? "home-datepicker-click" : ""
            }`}
            key={item.id}
            onClick={() => handleItemClick(item.id)}
          >
            <span className="home-datepicker-num">03</span>
            <span className="home-datepicker-p">{item.month}</span>
          </div>
        ))}
      </div>
      <MerchantChartSection />
      <DetailedDrawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"جزئیات بیشتر"}
        data={DetailedDrawerArray}
      />
      <FilterTools title="تراکنش‌های پرداخت مستقیم" />
      <div className="TransactionHomeCard-wrapper">
        <div className="TransactionHomeCard">
          <div className="TransactionHomeCard-wrapper-cards">
            <p className="TransactionHomeCard-p">امروز، ۱۸ آبان</p>
            {Array.from({ length: 10 }, (value) => value).map((item, index) => (
              <div onClick={() => setIsOpen(!isOpen)} key={index}>
                <TransactionHomeCard
                  merchant="تپسی"
                  price={4550}
                  transDate="سه‌شنبه، ۱۴۰۲/۰۷/۲۵- ۱۸:۴۸"
                />
              </div>
            ))}
          </div>
          <div className="TransactionHomeCard-wrapper-cards active">
            <p className="TransactionHomeCard-p">امروز، ۱۸ آبان</p>
            {Array.from({ length: 1 }, (value) => value).map((item, index) => (
              <div onClick={() => setIsOpen(!isOpen)} key={index}>
                <TransactionHomeCard
                  merchant="خودرو"
                  price={4550}
                  transDate="سه‌شنبه، ۱۴۰۲/۰۷/۲۵- ۱۸:۴۸"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeWithMandate;
