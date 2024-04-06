import React from "react";
import PropTypes from "prop-types";
import "./style.css";
interface Merchant {
  title: string;
  img: string;
}

function OtherMerchants({ merchants }: { merchants: Merchant[] }) {
  return (
    <div className="selected-merchants-wrapper">
      <p className="selected-merchants-title">سایر کسب‌وکارها</p>

      <div className="selected-merchants">
        {merchants.map((merchant, index) => (
          <div
            key={index}
            className="selected-merchant"
            style={{ backgroundImage: "url(/assets/pics/mask-group.svg)" }}
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

OtherMerchants.propTypes = {
  merchants: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default OtherMerchants;
