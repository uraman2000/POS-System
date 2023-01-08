import { Table } from "antd";
import React from "react";
import BarcodeReader from "react-barcode-reader";
import { useDispatch, useSelector } from "react-redux";
import { addCart, cartValue } from "../slice/cartSlice";
import { inventoryValue } from "../slice/inventorySlice";
import { showNotification } from "../slice/notificationSlice";

export default function DataDisplayTable({ data }) {
  const cart = useSelector(cartValue);
  const inventory = useSelector(inventoryValue);
  const dispatch = useDispatch();


  if (!data) return <div>no data</div>;

  const columns =
    data.length > 0
      ? Object.keys(data[0]).map((key) => ({
          title: key,
          dataIndex: key,
          key,
        }))
      : [];
  const handleRowClick = (record) => {
    const data = inventory.data.find((item) => item.id == record.id);
    addCartHandler(data);
  };
  const onScan = async (value) => {
    const record = inventory.data.find((item) => item.id == value);
    addCartHandler(record);
  };

  const addCartHandler = (record) => {
    console.log(record);
    if (!record) {
      return dispatch(
        showNotification({ type: "error", title: "Error", message: `No Item Found. Ref: ${value}` })
      );
    }
    if (record.quantity <= 0)
      dispatch(
        showNotification({ type: "error", title: "Error", message: `Insufficient Stock For ${record.name}` })
      );

    if (record && record.quantity > 0) dispatch(addCart(record));
  };
  return (
    <>
      <BarcodeReader onError={(e) => console.log("BarcodeReader Error:" + e)} onScan={(val) => onScan(val)} />
      <Table
        pagination={false}
        dataSource={data}
        columns={columns}
        rowKey={(record) => record.id}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
    </>
  );
}
