import React, { useState } from "react";
import { Input } from "antd";
import { Select } from "antd";
import { CaretLeftOutlined, SearchOutlined } from "@ant-design/icons";

const onChange = (value: string) => {
  console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
  console.log("search:", value);
};

// Filter `option.label` match the user type `input`
const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const AccountPage: React.FC = () => {
  const [Icon, setIcon] = useState(true);

  console.log(Icon);
  //   const handleIconOnFocus = () => {
  //     setIcon(!Icon)
  //   }

  return (
    <div>
      <Input prefix="شماره تماس" suffix="09385455552" disabled />
      <Input prefix="کد ملی" suffix="18102253366" disabled />
      <Input placeholder="نام و نام خانوادگی" />
      <Input placeholder="ایمیل" />
      <Select
        showSearch
        placeholder="محل سکونت"
        optionFilterProp="children"
        suffixIcon={Icon ? <CaretLeftOutlined /> : <SearchOutlined />}
        onFocus={() => setIcon(!Icon)}
        onChange={onChange}
        onSearch={onSearch}
        filterOption={filterOption}
        options={[
          {
            value: "jack",
            label: "Jack",
          },
          {
            value: "lucy",
            label: "Lucy",
          },
          {
            value: "tom",
            label: "Tom",
          },
        ]}
      />
    </div>
  );
};

export default AccountPage;
