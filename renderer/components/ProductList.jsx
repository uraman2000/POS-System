import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import productServices from "../../services/product.services";
import { addInventory, inventoryValue } from "../slice/inventorySlice";
import DataDisplayTable from "./DataDisplayTable";
export default function ProductList() {
  const inventory = useSelector(inventoryValue);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const product = await new productServices().select();
      dispatch(addInventory(product));
    };

    fetchData();
  }, []);

  if (!inventory) return <></>;
  return (
    <>
      <DataDisplayTable data={inventory.search_data} />
    </>
  );
}
