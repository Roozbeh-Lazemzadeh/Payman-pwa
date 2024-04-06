import Search, { type SearchProps } from "antd/es/input/Search";
import SelectedMerchants from "../components/template/SelectedMerchants";
import OtherMerchants from "../components/template/OtherMerchants";
import { ReactComponent as MagnifierIcon } from "../icons/magnifier.svg";

import { Button, Switch } from "antd";

import { useNavigate } from "react-router-dom";
import Slider from "../components/slider/Slider";

const homeSliderArray = [
  { img: "/assets/banner-home/home1.png" },
  { img: "/assets/banner-home/home2.png" },
  { img: "/assets/banner-home/home3.png" },
  { img: "/assets/banner-home/home4.png" },
];

function HomeWithOutMandate() {
  const navigate = useNavigate();

  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
    if (checked) {
      navigate("/home/with-mandate", { replace: true });
    }
  };

  return (
    <div className="home-wrapper">
      <Slider ImgArray={homeSliderArray} />
      <div className="home-des">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p className="home-des_title">پیمان چیست؟</p>
          <Switch onChange={onChange} />
        </div>
        <p className="home-des_parghraf">
          «پیمان»، راهکار پرداخت مستقیم از حساب بانکی است که در آن، شما به
          اپلیکیشن یا کسب‌وکار آنلاین مورد نظر خود اجازه می‌دهید طبق شرایطی که
          در قرارداد بین طرفین ذکر می‌شود، در مدت زمان معینی از حساب بانکی‌تان
          هزینه خدمات را پرداخت کند.
        </p>
      </div>
      <Search
        placeholder="جستجوی نام کسب‌وکار"
        onSearch={onSearch}
        style={{ width: "90%" }}
        className="home-search_input payman others"
        enterButton={
          <Button className="search-btn" disabled icon={<MagnifierIcon />} />
        }
      />

      <div className="home-merchants-wrapper">
        <div className="home-merchants">
          <SelectedMerchants />
          <OtherMerchants />
        </div>
      </div>
    </div>
  );
}

export default HomeWithOutMandate;
