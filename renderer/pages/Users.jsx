import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import userServices from "../../services/user.services";
import DataTable from "../components/DataTable";
import { setInfo } from "../slice/userSlice";

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
  };

  const onDelete = async (data) => {
    await user.delete(data);
  };
  useEffect(() => {
    dispatch(setInfo());
  }, [dispatch]);
  if (!data) return <></>;
  return (
    <div>
      <DataTable
        // excemptColumn={["id"]}
        disableOwner
        increment
        colCustom={["id", "name", "username", "password", "type", "commission", "totalIncome"]}
        data={data}
        onUpsert={(data) => onUpsert(data)}
        onDelete={(data) => onDelete(data)}
      />
    </div>
  );
}
