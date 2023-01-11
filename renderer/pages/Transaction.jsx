import { Table } from "antd";
import React, { useEffect, useState } from "react";
import ProductServices from "../../services/product.services";
import TransactionServices from "../../services/transaction.services";
import TransactionItemServices from "../../services/transactionItem.services";
import UserServices from "../../services/user.services";

export default function Transaction() {
  const transactionService = new TransactionServices();
  const transactionItemService = new TransactionItemServices();
  const userServices = new UserServices();
  const productServices = new ProductServices();
  const [state, setState] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const transactions = await transactionService.select();
      const transactionItems = await transactionItemService.select();
      const users = await userServices.select();
      const products = await productServices.select();
      const combinedArray = transactions.map((t, index) => {
        const items = transactionItems.filter((i) => i.transactionId === t.id);
        const updatedItems = items.map((i, index) => {
          const product = products.find((p) => p.id === i.productId);
          return {
            key: index,
            ...i,
            product,
          };
        });
        const user = users.find((i) => i.id === t.userId);
        return {
          key: index,
          ...t,
          user: user.name,
          transactionItem: updatedItems,
          totalIncome: user.totalIncome,
        };
      });
      setState(combinedArray);
    };
    fetch();
  }, []);

  function ExpandedRow(record) {
    return (
      <Table
        dataSource={record.transactionItem}
        columns={[
          {
            title: "ID",
            dataIndex: "id",
            key: "id",
          },
          {
            title: "Order Quantity",
            dataIndex: "quantity",
            key: "quantity",
          },
          {
            title: "Product",
            key: "product",
            render: (item) => <span>{item.product.name}</span>,
          },
          {
            title: "Stock Quantity",
            key: "stockquantity",
            render: (item) => <span>{item.product.quantity}</span>,
          },
        ]}
        pagination={false}
        size="small"
      />
    );
  }
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Date/Time",
      dataIndex: "dateTime",
      key: "dateTime",
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Total Income",
      dataIndex: "totalIncome",
      key: "totalIncome",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
  ];
  return (
    <>
      {console.log(state)}
      <Table
        dataSource={state}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => <ExpandedRow {...record} />,
          defaultExpandedRowKeys: ["0"],
        }}
      />
    </>
  );
}
