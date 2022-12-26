import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "./DataTable";
import { addInventory, inventoryValue } from "../slice/inventorySlice";
export default function ProductList() {
  const inventory = useSelector(inventoryValue);
  const dispatch = useDispatch();

  const newData = [...Array(10)].map((_, i) => ({
    product_id: `${1 + i}2214125sdwq`,
    name: `Red Horse ${i}`,
    price: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
  }));

  useEffect(() => {
    const pushdata = () => {
      newData.push({
        product_id: `112214125sdwq`,
        name: `pre 9`,
        price: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
      });
    };
    pushdata();
    dispatch(addInventory(newData));
  }, []);

  return (
    <>
      <DataTable data={inventory.search_data} />
    </>
  );
}
