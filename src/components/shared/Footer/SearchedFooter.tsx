import React, { useEffect, useState } from "react";
import Search, { type SearchProps } from "antd/es/input/Search";
import { Footer } from "antd/es/layout/layout";
import { useAppSelector } from "../../hooks/reduxHooks";
import {
  selectCloseSearchFooter,
  selectSearchedFooter,
  selectSelectedSearchItem,
} from "../../../store/footer/footerSlice";
import { ReactComponent as TickSquareIcon } from "../../../icons/tickSquare.svg";
import { ReactComponent as BuyIcon } from "../../../icons/buy2.svg";
import { ReactComponent as MagnifierIcon } from "../../../icons/magnifier2.svg";
import { ReactComponent as CalendarIcon } from "../../../icons/calendar.svg";
import "./style.css";
import "../../Paymans/otherPaymans/style.css";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import { Button, Input } from "antd";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DatePicker, { DateObject } from "react-multi-date-picker";
import { weekDays } from "../../types/calendar";

export const SearchedFooter: React.FC = () => {
  const [firstTitle, setFirstTitle] = useState("");
  const [secondTitle, setSecondTitle] = useState("");
  const [thirdTitle, setThirdTitle] = useState("");
  const [values, setValues] = useState([
    // new DateObject({ calendar: persian }).subtract(4, "days"),
    // new DateObject({ calendar: persian }).add(4, "days"),
  ]);
  const isSearchedFooterShown = useAppSelector(selectSearchedFooter);
  const closeSearchFooter = useAppSelector(selectCloseSearchFooter);
  const searchItem = useAppSelector(selectSelectedSearchItem);
  // const changeDateHandler = (values: any): void => {
  //   //  const date = new Date(e);
  //   setValues(values);
  // };
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
  const searchFooterFn = () => {
    switch (searchItem) {
      case "104":
        return (
          <Search
            placeholder="جستجوی نام کسب‌وکار"
            onSearch={onSearch}
            style={{ width: "90%" }}
            className="home-search_input payman"
            enterButton={
              <Button
                className="search-btn"
                disabled
                icon={<MagnifierIcon />}
              />
            }
          />
        );
      case "103":
        return (
          <div className="search-datePicker">
            <DatePicker
              placeholder="از تاریخ                              تا تاریخ"
              style={{
                direction: "rtl",
              }}
              value={values}
              onChange={() => setValues(values)}
              dateSeparator="                  "
              locale={persian_fa}
              calendar={persian}
              className="rmdp-mobile"
              calendarPosition="bottom-right"
              range
              weekDays={weekDays}
              monthYearSeparator="  "
            />
            <div className="icon">
              <CalendarIcon />
            </div>
          </div>
        );
      case "102":
        return (
          <>
            <Input
              className="search-input"
              addonBefore={<BuyIcon />}
              placeholder="از مبلغ"
            />
            <Input
              className="search-input"
              addonBefore={<BuyIcon />}
              placeholder="تا مبلغ"
            />
          </>
        );
      default:
        return null;
    }
  };

  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);
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
          <div
            className={`search-section ${
              searchItem === "103" ? "search-bar" : ""
            } `}
          >
            {searchFooterFn()}
            <div className="divider"></div>
          </div>
        </div>
      </div>
    </Footer>
  );
};
