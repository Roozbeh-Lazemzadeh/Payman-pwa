import React, { useEffect, useState } from "react";
import { Footer } from "antd/es/layout/layout";
import { useAppSelector } from "../../hooks/reduxHooks";
import {
  selectCloseSearchFooter,
  selectSearchedFooter,
  selectSelectedSearchItem,
} from "../../../store/footer/footerSlice";
import { ReactComponent as TickSquareIcon } from "../../../icons/tickSquare.svg";
import { ReactComponent as CalendarIcon } from "../../../icons/calendar.svg";
import { ReactComponent as BuyIcon } from "../../../icons/buy2.svg";

import "./style.css";

import { Input } from "antd";
import Search from "antd/es/input/Search";

export const SearchedFooter: React.FC = () => {
  const [firstTitle, setFirstTitle] = useState("");
  const [secondTitle, setSecondTitle] = useState("");
  const [thirdTitle, setThirdTitle] = useState("");
  const isSearchedFooterShown = useAppSelector(selectSearchedFooter);
  const closeSearchFooter = useAppSelector(selectCloseSearchFooter);
  const searchItem = useAppSelector(selectSelectedSearchItem);

  useEffect(() => {
    if (searchItem !== "")
      switch (searchItem) {
        case "104":
          setThirdTitle("فیلیمو");
          setSecondTitle("تپسی");
          setFirstTitle("اسنپ");
          break;
        case "103":
          setFirstTitle("هفتگی");
          setSecondTitle("ماهانه");
          setThirdTitle("۳ ماهه");
          break;
        case "102":
          setFirstTitle("۱۰۰هزار تومانءءء");
          setSecondTitle("۲۰۰هزار تومانءءء");
          setThirdTitle("۳۰۰هزار تومانءءء");
          break;

        default:
          break;
      }
  }, [searchItem]);

  return (
    <Footer
      className={`searched-footer${isSearchedFooterShown ? " active" : ""} ${
        closeSearchFooter ? "close" : ""
      }`}
    >
      <div className="searched-footer-wrapper">
        <div className="implement-button">
          <TickSquareIcon />
          <span>اعمال</span>
        </div>
        <div className="searched-footer-content">
          <div className="quick-access-section">
            <span>{firstTitle}</span>
            <span>{secondTitle}</span>
            <span>{thirdTitle}</span>
          </div>
          <div className="search-section">
            {searchItem && searchItem === "104" ? (
              <Search />
            ) : (
              <>
                <Input
                  className="search-input"
                  addonBefore={
                    searchItem === "103" ? <CalendarIcon /> : <BuyIcon />
                  }
                  placeholder={`${
                    searchItem === "103" ? "تا تاریخ" : "تا مبلغ"
                  }`}
                />
                <Input
                  className="search-input"
                  addonBefore={
                    searchItem === "103" ? <CalendarIcon /> : <BuyIcon />
                  }
                  placeholder={`${
                    searchItem === "103" ? "از تاریخ" : "از مبلغ"
                  }`}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </Footer>
  );
};
