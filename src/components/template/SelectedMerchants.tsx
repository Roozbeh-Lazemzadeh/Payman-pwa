import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { useAppDispatch } from "../hooks/reduxHooks";
import { merchantDetails } from "../../store/merchant/merchantSlice";
import { Merchant } from "../types/Merchant";
// import { Button } from "antd";

interface SelectedMerchantsProps {
  merchants: Merchant[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function SelectedMerchants({ merchants, setIsOpen }: SelectedMerchantsProps) {
  const dispatch = useAppDispatch();

  const handleMerchantDetails = (merchant: Merchant) => {
    setIsOpen(true);
    dispatch(merchantDetails(merchant));
  };
  return (
    <div className="selected-merchants-wrapper">
      <p className="selected-merchants-title">کسب‌وکارهای منتخب</p>

      <div className="selected-merchants">
        {merchants.map((merchant, index) => (
          <div
            key={index}
            className="selected-merchant"
            style={{ backgroundImage: "url(/assets/pics/mask-group.svg)" }}
            onClick={() => handleMerchantDetails(merchant)}
          >
            <div className="img-wrapper">
              <img className="selected-merchant-img" src={merchant.img} />
            </div>
            <p className="selected-merchant-title">{merchant.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
SelectedMerchants.propTypes = {
  merchants: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SelectedMerchants;
