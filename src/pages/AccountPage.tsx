import { Input } from 'antd';
import React from 'react'

function AccountPage() {
  return (
    <div>
      <Input prefix="شماره تماس" suffix="09385455552" disabled />{" "}
      <Input prefix="کد ملی" suffix="18102253366" disabled />
      <Input placeholder="نام و نام خانوادگی" />
      <Input placeholder="ایمیل" />
    </div>
  );
}

export default AccountPage