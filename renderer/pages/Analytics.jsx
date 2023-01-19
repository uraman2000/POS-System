import React from "react";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;

export default function Analytics() {
  const onChange = (date, dateString) => {
    const [fistDate, secondDate] = dateString;
    console.log(date, dateString);
    console.log(fistDate);
    console.log(secondDate);
  };
  return (
    <div>
      <RangePicker
        onChange={onChange}
        // dateRender={(current) => {
        //   const style = {};
        //   if (current.date() === 1) {
        //     style.border = "1px solid #1890ff";
        //     style.borderRadius = "50%";
        //   }
        //   return (
        //     <div className="ant-picker-cell-inner" style={style}>
        //       {current.date()}
        //     </div>
        //   );
        // }}
      />
    </div>
  );
}
