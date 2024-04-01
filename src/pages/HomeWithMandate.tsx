/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import { MerchantChartSection } from "../components/chart/MerchantChartSection";
import FilterTools from "../components/template/FilterTools";
import { TransactionHomeCard } from "../components/shared/Cards/TransactionHomeCards";
import { DetailedDrawer } from "../components/shared/Drawer/DetailedDrawer";

function HomeWithMandate() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const handleOpenDetailedDrawer = () => {};
  return (
    <div className="home-wrapper">
      <div className="home-datepickers">
        <div className="home-datepicker">
          <span className="home-datepicker-num">02</span>
          <span className="home-datepicker-p">اردبیهشت</span>
        </div>
        <div className="home-datepicker">
          <span className="home-datepicker-num">02</span>
          <span className="home-datepicker-p">خرداد</span>
        </div>
        <div className="home-datepicker">
          <span className="home-datepicker-num">02</span>
          <span className="home-datepicker-p">تیر</span>
        </div>
        <div className="home-datepicker">
          <span className="home-datepicker-num">02</span>
          <span className="home-datepicker-p">مرداد</span>
        </div>
        <div className="home-datepicker">
          <span className="home-datepicker-num">02</span>
          <span className="home-datepicker-p">شهریور</span>
        </div>
        <div className="home-datepicker">
          <span className="home-datepicker-num">02</span>
          <span className="home-datepicker-p">مهر</span>
        </div>
      </div>
      <MerchantChartSection />
      <DetailedDrawer isOpen={isOpen} setIsOpen={setIsOpen} title={""} />
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
