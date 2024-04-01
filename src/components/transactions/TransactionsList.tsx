import React from "react";
import { TransactionCard } from "../shared/Cards/TransactionCards";

export const TransactionsList: React.FC = () => {
  return (
    <div>
      {Array.from({ length: 5 }, (value) => value).map((val, index) => (
        <TransactionCard
          key={index}
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
      ))}
    </div>
  );
};
