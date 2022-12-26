import { Table } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart, cartValue } from "../slice/cartSlice";

export default function DataTable({ data }) {
  const cart = useSelector(cartValue);
  const dispatch = useDispatch();
  if (!data) return <div>nodat</div>;

  const columns =
    data.length > 0
      ? Object.keys(data[0]).map((key) => ({
          title: key,
          dataIndex: key,
          key,
        }))
      : [];
  const handleRowClick = (record) => {
    dispatch(addCart(record));
  };

  return (
    <>
      <Table
        pagination={false}
        dataSource={data}
        columns={columns}
        rowKey={(record) => record.product_id}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
    </>
  );
}
