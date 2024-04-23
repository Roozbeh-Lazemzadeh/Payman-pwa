/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import { MerchantChartSection } from "../components/chart/MerchantChartSection";
import FilterTools from "../components/template/FilterTools";
import { TransactionHomeCard } from "../components/shared/Cards/TransactionHomeCards";
import { DetailedDrawer } from "../components/shared/Drawer/DetailedDrawer";
import transactionData from '../transaction.json'; // Import the JSON file
import useDrawerTransaction from "../components/hooks/useDrawerTransaction";

function HomeWithMandate() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(1);
  const {
    isOpen,
    detailedDrawerData,
    handleDrawerTransaction,
    handleCloseDrawer,
    selectedTransactionId,
  } = useDrawerTransaction(transactionData);

  // const DetailedDrawerArray = [
  //   { nameItem1: "بانک", nameItem2: "سامان" },
  //   { nameItem1: "شماره موبایل", nameItem2: "989385445348+" },
  //   { nameItem1: "شناسه پیمان", nameItem2: "Ajdfni830874p39vfndl" },
  // ];

  const HomedatepickersArray = [
    { id: 1, month: 'فروردین' },
    { id: 2, month: 'اردبیهشت' },
    { id: 3, month: 'خرداد' },
    { id: 4, month: 'تیر' },
    { id: 5, month: 'مرداد' },
    { id: 6, month: 'شهریور' },
    { id: 7, month: 'مهر' },
    { id: 8, month: 'آبان' },
    { id: 9, month: 'آذر' },
    { id: 10, month: 'دی' },
    { id: 11, month: 'بهمن' },
    { id: 12, month: 'اسفند' }
  ];

  const handleItemClick = (id: any) => {
    setSelectedItemIndex(id === selectedItemIndex ? null : id);
    const selectedMonth = HomedatepickersArray.find(
      (item) => item.id === selectedItemIndex
    );
    if (selectedMonth) {
      console.log(selectedMonth.month);
    } else {
      console.log('Error: Month not found');
    }
  };

  return (
    <div className="home-wrapper">
      <div className="home-datepickers">
        {HomedatepickersArray.map((item) => (
          <div
            className={`home-datepicker ${
              item.id === selectedItemIndex ? 'home-datepicker-click' : ''
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
        isOpen={isOpen && selectedTransactionId !== null}
        setIsOpen={handleCloseDrawer}
        title={'جزئیات بیشتر'}
        data={detailedDrawerData}
      />
      <FilterTools title="تراکنش‌های پرداخت مستقیم" />
      <div className="TransactionHomeCard-wrapper">
        <div className="TransactionHomeCard">
          <div className="TransactionHomeCard-wrapper-cards">
            <p className="TransactionHomeCard-p">امروز، ۱۸ آبان</p>
            {transactionData.map((transaction) => (
              <div
                key={transaction.id}
                onClick={() => handleDrawerTransaction(transaction.id)}
              >
                <TransactionHomeCard
                  merchant={transaction.creditor}
                  price={transaction.transaction_amount}
                  transDate={transaction.transaction_date}
                  img={transaction.img}
                />
              </div>
            ))}
          </div>
          <div className="TransactionHomeCard-wrapper-cards active">
            <p className="TransactionHomeCard-p">امروز، ۱۸ آبان</p>
            {/* {Array.from({ length: 1 }, (value) => value).map((item, index) => (
              <div onClick={() => setIsOpen(!isOpen)} key={index}>
                <TransactionHomeCard
                  merchant="خودرو"
                  price={4550}
                  transDate="سه‌شنبه، ۱۴۰۲/۰۷/۲۵- ۱۸:۴۸"
                />
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeWithMandate;
