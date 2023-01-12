import { Table } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductServices from "../../services/product.services";
import TransactionServices from "../../services/transaction.services";
import TransactionItemServices from "../../services/transactionItem.services";
import UserServices from "../../services/user.services";

const CustomTable = styled(Table)`
  height: 100%;
  .ant-spin-nested-loading {
    height: 100%;
  }
  .ant-spin-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;
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
          // {
          //   title: "ID",
          //   dataIndex: "id",
          //   key: "id",
          // },

          {
            title: "Product",
            key: "product",
            render: (item) => <span>{item.product.name}</span>,
          },
          {
            title: "Order Quantity",
            dataIndex: "quantity",
            key: "quantity",
          },
          {
            title: "Cost",
            key: "product",
            render: (item) => <span>{item.product.cost}</span>,
          },
          {
            title: "Price",
            key: "price",
            render: (item) => <span>{item.product.price}</span>,
          },
          {
            title: "Total Net",
            dataIndex: "totalNet",
            key: "totalNet",
          },
          // {
          //   title: "Stock Quantity",
          //   key: "stockquantity",
          //   render: (item) => <span>{item.product.quantity}</span>,
          // },
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
      title: "Cashier",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Total Net",
      dataIndex: "totalNet",
      key: "totalNet",
    },
  ];
  return (
    <>
      <CustomTable
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
