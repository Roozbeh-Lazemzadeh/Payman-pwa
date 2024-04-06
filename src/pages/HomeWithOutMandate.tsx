import Search from "antd/es/input/Search";
import { useState } from "react";
import SelectedMerchants from "../components/template/SelectedMerchants";
import OtherMerchants from "../components/template/OtherMerchants";
import { ReactComponent as MagnifierIcon } from "../icons/magnifier.svg";
import { Button, Switch } from "antd";
import { useNavigate } from "react-router-dom";
import Slider from "../components/slider/Slider";
import "./style.css";

import { MerchantBottomSheet } from "../components/shared/Drawer/MerchantBottomSheet";
import { useAppSelector } from "../components/hooks/reduxHooks";
import {
  selectMerchantImg,
  selectMerchantTitle,
} from "../store/merchant/merchantSlice";
interface Merchant {
  title: string;
  img: string;
}

const homeSliderArray = [
  { img: "/assets/banner-home/home1.png" },
  { img: "/assets/banner-home/home2.png" },
  { img: "/assets/banner-home/home3.png" },
  { img: "/assets/banner-home/home4.png" },
];
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

function HomeWithOutMandate() {
  const merchantTitle = useAppSelector(selectMerchantTitle);
  const merchantImg = useAppSelector(selectMerchantImg);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [selectedMerchants, setSelectedMerchants] = useState<Merchant[]>(
    selectedMerchantsArray
  );
  const [otherMerchants, setOtherMerchants] =
    useState<Merchant[]>(otherMerchantsArray);

  const filterMerchants = (merchants: Merchant[], searchValue: string) => {
    return merchants.filter((merchant) => merchant.title.includes(searchValue));
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // Filter the lists based on the search input value
    if (value.length === 0 || value.length >= 2) {
      const filteredSelectedMerchants = filterMerchants(
        selectedMerchantsArray,
        value
      );
      const filteredOtherMerchants = filterMerchants(
        otherMerchantsArray,
        value
      );
      setSelectedMerchants(filteredSelectedMerchants);
      setOtherMerchants(filteredOtherMerchants);
    }
  };

  const onChange = (checked: boolean) => {
    if (checked) {
      navigate("/home/with-mandate", { replace: true });
    }
  };

  const MerchantInfo: React.FC = () => {
    return (
      <>
        <div className="embedded-video">
          <iframe
            width="100%"
            height="110"
            src="https://www.youtube.com/embed/PGlGdID_Mm8?si=43SuHls706k1C6Rt"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <div className="merchant-title">
          <img src={merchantImg && merchantImg}></img>
          <span>
            پرداخت مستقیم در اپلیکیشن {merchantTitle && merchantTitle}
          </span>
        </div>
        <div className="merchant-description">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
          متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه
          درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با
          نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان
          خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد
        </div>
        <div className="merchants-btn">
          <Button className="merchant-enter-btn" type="primary">
            ورود به سایت {merchantTitle && merchantTitle}
          </Button>
          <Button className="merchant-more-details" type="default">
            مشاهده بیشتر
          </Button>
        </div>
      </>
    );
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
        onChange={(e) => handleOnChange(e)}
        placeholder="جستجوی نام کسب‌وکار"
        style={{ width: "90%" }}
        className="home-search_input payman others"
        enterButton={
          <Button className="search-btn" disabled icon={<MagnifierIcon />} />
        }
      />

      <div className="home-merchants-wrapper">
        <div className="home-merchants">
          <SelectedMerchants
            merchants={selectedMerchants}
            setIsOpen={setIsOpen}
          />
          <OtherMerchants merchants={otherMerchants} />
        </div>
      </div>
      <MerchantBottomSheet
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"جزئیات بیشتر"}
        // data={DetailedDrawerArray}
      >
        <MerchantInfo />
      </MerchantBottomSheet>
    </div>
  );
}

export default HomeWithOutMandate;
