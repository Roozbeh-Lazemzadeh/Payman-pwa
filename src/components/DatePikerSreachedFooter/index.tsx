/* eslint-disable react/prop-types */
import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import InputIcon from "react-multi-date-picker/components/input_icon";
// import {ReactComponent as TestIcon} from "../../icons/Logout.svg"

interface DatePickerProps {
  placeholder?: string;
}

const DatePickerInput: React.FC<DatePickerProps> = ({ placeholder }) => {
  const [value, setValue] = useState(new Date());

  const changeDateHandler = (e: any): void => {
    const date = new Date(e);
    setValue(date);
  };
  return (
    <DatePicker
      // animations={[transition({ duration: 800, from: 35 })]}
      onChange={changeDateHandler}
      value={value}
      locale={persian_fa}
      calendar={persian}
      placeholder={placeholder}
      render={<InputIcon />}
      // className="rmdp-mobile"
    />
  );
};

export default DatePickerInput;
