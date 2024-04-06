import React, { useState } from "react";
import Search, { type SearchProps } from "antd/es/input/Search";
import { BusinessSection } from "./BusinessSection";
import "./style.css";
import "../../template/style.css";
import SelectedMerchants from "../../template/SelectedMerchants";
import OtherMerchants from "../../template/OtherMerchants";
import { ReactComponent as MagnifierIcon } from "../../../icons/magnifier.svg";
import { Button } from "antd";
const selectedMerchantsArray = [
  { title: "آسان پرداخت", img: "/assets/pics/680.svg" },
  { title: "ایرانسل", img: "/assets/pics/MTN-Logo.png" },
  { title: "کافه بازار", img: "/assets/pics/cafe-bazar.png" },
  { title: "مایکت", img: "/assets/pics/myket.png" },
  { title: "فیلیمو", img: "/assets/pics/filimo.png" },
  { title: "شاتل موبایل", img: "/assets/pics/shatel.png" },
];
const otherMerchantsArray = [
  { title: "آسان پرداخت", img: "/assets/pics/680.svg" },
  { title: "ایرانسل", img: "/assets/pics/MTN-Logo.png" },
  { title: "کافه بازار", img: "/assets/pics/cafe-bazar.png" },
  { title: "مایکت", img: "/assets/pics/myket.png" },
  { title: "فیلیمو", img: "/assets/pics/filimo.png" },
  { title: "شاتل موبایل", img: "/assets/pics/shatel.png" },
];

export const OtherPaymans: React.FC = () => {
  const [, setIsOpen] = useState<boolean>(false);
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);
  return (
    <div>
      <p className="info-login payman">
        راهکار پرداخت مستقیم در کسب‌وکارهای متنوعی فعال است. شما می‌توانید با
        مراجعه به هر یک از آن‌ها، پیمان دلخواه خود را فعال کنید.
      </p>
      <Search
        placeholder="جستجوی نام کسب‌وکار"
        onSearch={onSearch}
        style={{ width: "90%" }}
        className="home-search_input payman others"
        enterButton={
          <Button className="search-btn" disabled icon={<MagnifierIcon />} />
        }
      />
      <BusinessSection />
      <div className="home-merchants-wrapper">
        <div className="home-merchants payman">
          <SelectedMerchants
            merchants={selectedMerchantsArray}
            setIsOpen={setIsOpen}
          />
          <OtherMerchants merchants={otherMerchantsArray} />
        </div>
      </div>
    </div>
  );
};
