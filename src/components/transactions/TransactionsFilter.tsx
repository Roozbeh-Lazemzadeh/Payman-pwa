import React from "react";
import FilterTools from "../template/FilterTools";
import "./style.css";
import { TransactionsList } from "./TransactionsList";
import Slider from "../slider/Slider";

export const TransactionsFilter: React.FC = () => {
  const homeSliderArray = [
    { img: "/assets/banner-sidbar/photo101.png" },
    { img: "/assets/banner-sidbar/photo101.png" },
    { img: "/assets/banner-sidbar/photo101.png" },
    { img: "/assets/banner-sidbar/photo101.png" },
    // { img: '/assets/banner-sidbar/photo102.png' },
    // { img: '/assets/banner-sidbar/photo103.png' },
    // { img: '/assets/banner-sidbar/photo104.png' }
  ];
  return (
    <div className="transaction-filter">
      <FilterTools title="تراکنش‌های اخیر" />
      <div
        style={{
          borderBottom: "1px solid rgba(5, 5, 5, 0.06)",
          width: 220,
          margin: "20px auto",
        }}
      >
        <Slider ImgArray={homeSliderArray} />
      </div>
      <TransactionsList />
    </div>
  );
};
