import React from "react";
import { Button } from "antd";
import Search from "antd/es/input/Search";
import { ReactComponent as MagnifierIcon } from "../../../icons/magnifier.svg";
import { otherMerchantsArray, selectedMerchantsArray } from "../Constant";
import { Merchant } from "../../types/Merchant";

interface MerchantSearchProps {
  setSelectedMerchants: (merchants: Merchant[]) => void;
  setOtherMerchants: (merchants: Merchant[]) => void;
}
const MerchantSearch: React.FC<MerchantSearchProps> = ({
  setSelectedMerchants,
  setOtherMerchants,
}) => {
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
  return (
    <Search
      onChange={(e) => handleOnChange(e)}
      placeholder="جستجوی نام کسب‌وکار"
      style={{ width: "90%" }}
      className="home-search_input payman others"
      enterButton={
        <Button className="search-btn" disabled icon={<MagnifierIcon />} />
      }
    />
  );
};

export default MerchantSearch;
