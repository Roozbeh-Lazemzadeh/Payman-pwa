// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useRef, useState } from "react";
import SelectedMerchants from "../components/template/SelectedMerchants";
import OtherMerchants from "../components/template/OtherMerchants";
import { Switch } from "antd";
import { useNavigate } from "react-router-dom";
import Slider from "../components/slider/Slider";
import { MerchantBottomSheet } from "../components/shared/Drawer/MerchantBottomSheet";
import {
  homeSliderArray,
  otherMerchantsArray,
  selectedMerchantsArray,
} from "../components/shared/Constant";
import MerchantSearch from "../components/shared/Merchant/MerchantSearch";
import "./style.css";
import MerchantInfo from "../components/shared/Merchant/MerchantInfo";
import { Merchant } from "../components/types/Merchant";
// import persian from "react-date-object/calendars/persian";
// import persian_fa from "react-date-object/locales/persian_fa";
// import DatePicker, { DatePickerRef } from "react-multi-date-picker";

const HomeWithOutMandate: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [selectedMerchants, setSelectedMerchants] = useState<Merchant[]>(
    selectedMerchantsArray
  );
  const [otherMerchants, setOtherMerchants] =
    useState<Merchant[]>(otherMerchantsArray);

  const onChange = (checked: boolean) => {
    if (checked) {
      navigate("/home/with-mandate", { replace: true });
    }
  };

  // interface CustomDatePickerRef extends DatePickerRef {
  //   openCalendar: () => void;
  //   closeCalendar: () => void;
  // }

  //  const datePickerRef = useRef(null) as unknown as MutableRefObject<HTMLDivElement>;
  // const datePickerRef = useRef<CustomDatePickerRef>(null);

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
        {/* <div>
          <DatePicker
            ref={datePickerRef}
            calendar={persian}
            locale={persian_fa}
            dateSeparator="     |     "
            calendarPosition="bottom-right"
            range
            // className="rmdp-mobile"
          />
        </div> */}
        <p className="home-des_parghraf">
          «پیمان»، راهکار پرداخت مستقیم از حساب بانکی است که در آن، شما به
          اپلیکیشن یا کسب‌وکار آنلاین مورد نظر خود اجازه می‌دهید طبق شرایطی که
          در قرارداد بین طرفین ذکر می‌شود، در مدت زمان معینی از حساب بانکی‌تان
          هزینه خدمات را پرداخت کند.
        </p>
      </div>
      <MerchantSearch
        setSelectedMerchants={setSelectedMerchants}
        setOtherMerchants={setOtherMerchants}
      />
      <div className="home-merchants-wrapper">
        <div className="home-merchants">
          <SelectedMerchants
            merchants={selectedMerchants}
            setIsOpen={setIsOpen}
          />
          <OtherMerchants merchants={otherMerchants} setIsOpen={setIsOpen} />
        </div>
      </div>
      <MerchantBottomSheet
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"جزئیات بیشتر"}
      >
        <MerchantInfo />
      </MerchantBottomSheet>
    </div>
  );
};

export default HomeWithOutMandate;
