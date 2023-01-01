import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import productServices from "../../services/product.services";
import DataTable from "../components/DataTable";

import { addInventory, inventoryValue } from "../slice/inventorySlice";

export default function Products() {
  const inventory = useSelector(inventoryValue);
  const dispatch = useDispatch();
  const product = new productServices();
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(addInventory(await product.select()));
    };

    fetchData();
  }, []);

  const onUpsert = async (data) => {
    await product.Upsert(data);
  };

  const onDelete = async (data) => {
    await product.delete(data);
  };
  if (!inventory.data) return <></>;
  return (
    <div>
      <DataTable data={inventory.data} onUpsert={(data) => onUpsert(data)} onDelete={(data) => onDelete(data)} />
    </div>
  );
}
