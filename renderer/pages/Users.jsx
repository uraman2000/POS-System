import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userServices from "../../services/user.services";
import DataTable from "../components/DataTable";
import { showNotification } from "../slice/notificationSlice";

export default function Users() {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const user = new userServices();
  useEffect(() => {
    const fetchData = async () => {
      setData(await user.select());
    };

    fetchData();
  }, []);

  const onUpsert = async (data) => {
    const teast = await user.Upsert(data);
    console.log(teast);
  };

  const onDelete = async (data) => {
    await user.delete(data);
  };
  if (!data) return <></>;
  return (
    <div>
      <button
        onClick={() => {
          dispatch(showNotification({ type: "error", title: "Error", message: "messs" }));
        }}
      >
        buton
      </button>
      <DataTable
        // excemptColumn={["id"]}
        increment
        colCustom={["id", "name", "username", "password", "type", "commission", "totalIncome"]}
        data={data}
        onUpsert={(data) => onUpsert(data)}
        onDelete={(data) => onDelete(data)}
      />
    </div>
  );
}
