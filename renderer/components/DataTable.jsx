import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Select, Space, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import BarcodeReader from "react-barcode-reader";

export default function DataTable(props) {
  const { onDelete, onUpsert, excemptColumn, colCustom, increment, isScanable } = props;
  const [data, setData] = useState(props.data);
  const [isAddDisabled, setIsAddDisabled] = useState(false);
  const [isEditPressed, setIsEditPressed] = useState(false);
  if (!data) return <div>nodat</div>;
  const [editMode, setEditMode] = useState(false);
  const [editedRow, setEditedRow] = useState(-1);
  const [editedData, setEditedData] = useState([]);
  const [buttonControls, setButtonControls] = useState({
    add: false,
  });

  const handleEdit = (index) => {
    setIsEditPressed(true);
    setIsAddDisabled(true);
    setEditedRow(index);
    setEditMode(true);

    setEditedData(
      Object.keys(data[index]).map((key) => ({
        index,
        key,
        value: data[index][key],
      }))
    );
  };
  const handleDelete = (record) => {
    setData((prevState) => prevState.filter((item) => item.id !== record.id));
    onDelete(record);
  };

  const handleCancelEdit = () => {
    setEditedData([]);
    if (!isEditPressed) {
      setEditedRow(-1);
      const newData = data.slice(0, -1);
      setData(newData);
    }
    setIsAddDisabled(false);
    setEditMode(false);
    setIsEditPressed(false);
  };

  const handleSave = () => {
    let newData = [...data];
    editedData.map((cell) => {
      newData[cell.index] = { ...newData[cell.index], [`${cell.key}`]: cell.value };
    });

    const newObject = editedData.reduce((accumulator, currentValue) => {
      accumulator[currentValue.key] = currentValue.value;
      return accumulator;
    }, {});
    onUpsert(newObject);

    setData(newData);

    setEditMode(false);
    setButtonControls({ add: false });
    setEditedRow(-1);
    setEditedData([]);
    setIsAddDisabled(false);
  };
  const handleAdd = async (columns, scanValue) => {
    const addItem = {};
    columns.map((item) => {
      if (item.title !== "Actions") addItem[item.title] = "";
    });
    if (increment) data.length == 0 ? (addItem.id = 1) : (addItem.id = data[data.length - 1].id + 1);
    if (isScanable) data.length == 0 ? (addItem.id = 1) : (addItem.id = scanValue);

    setIsAddDisabled(true);
    await setData([...data, addItem]);
    setIsEditPressed(false);
  };
  useEffect(() => {
    if (isAddDisabled && !isEditPressed) {
      // isScanable
      if (increment || isScanable) {
        const index = data.length - 1;
        setEditedRow(index);
        setEditMode(true);
        setEditedData(
          Object.keys(data[index]).map((key) => ({
            index,
            key,
            value: data[index][key],
          }))
        );
      }
    }
  }, [isAddDisabled]);

  useEffect(() => {
    if (data.length == 0) return;
    const lastData = data[data.length - 1];
    if (lastData.id === "") {
      handleEdit(data.length - 1);
    }
  }, [data]);

  const handleChange = (event, index, key) => {
    let value = event;
    if (typeof event != "string") value = event.target.value;

    setEditedData((prevState) =>
      prevState.map((cell) => {
        if (cell.index === index && cell.key === key) {
          return {
            index,
            key,
            value,
          };
        } else {
          return cell;
        }
      })
    );
  };

  const columns =
    data.length > 0
      ? Object.keys(data[0]).map((key) => ({
          title: key,
          dataIndex: key,
          key,
          render: (text, record, index) => {
            let type = "string";
            if (
              key == "commission" ||
              key == "totalIncome" ||
              key == "id" ||
              key == "cost" ||
              key == "price" ||
              key == "quantity"
            )
              type = "number";
            if (key == "password") type = "password";
            if (editMode && editedRow === index) {
              const isEmpty = editedData.find((cell) => cell.index === index && cell.key === key)?.value
                ? true
                : false;

              const isDisabled = key == "id" && increment ? true : false;
              return (
                <Tooltip title="This field is Required" color={"red"} arrowPointAtCenter={true} open={!isEmpty}>
                  {key == "type" ? (
                    <Select
                      defaultValue=""
                      value={editedData.find((cell) => cell.index === index && cell.key === key)?.value}
                      style={{ width: 120 }}
                      onChange={(event) => handleChange(event, index, key)}
                      options={[
                        {
                          value: "Admin",
                          label: "Admin",
                        },
                        {
                          value: "Employee",
                          label: "Employee",
                        },
                      ]}
                    />
                  ) : (
                    <Input
                      disabled={isDisabled}
                      type={type}
                      status={!isEmpty ? "error" : ""}
                      value={editedData.find((cell) => cell.index === index && cell.key === key)?.value}
                      onChange={(event) => handleChange(event, index, key)}
                    />
                  )}
                </Tooltip>
              );
            } else {
              if (key == "password") return "*********";
              return text;
            }
          },
        }))
      : colCustom.map((item) => ({
          title: item,
          dataIndex: item,
          key: item,
        }));
  columns.push({
    title: "Actions",
    key: "actions",
    dataIndex: "actions",
    render: (text, record, index) => {
      if (editMode && editedRow === index) {
        const isNoEmptyField = editedData.filter((item) => item.value == "").length <= 0 ? true : false;
        return (
          <Space size={"small"}>
            <Button disabled={!isNoEmptyField} type="primary" onClick={handleSave}>
              Save
            </Button>
            <Button onClick={handleCancelEdit}>Cancel</Button>
          </Space>
        );
      } else {
        return (
          <Space size={"small"}>
            <Button type="primary" onClick={() => handleEdit(index)}>
              Edit
            </Button>
            <Button onClick={() => handleDelete(record)}>Delete</Button>
          </Space>
        );
      }
    },
  });
  const onScan = async (value) => {
    if (!isAddDisabled && isScanable) handleAdd(columns, value);
  };

  return (
    <>
      <BarcodeReader onError={(e) => console.log("BarcodeReader Error:" + e)} onScan={(val) => onScan(val)} />
      <Space direction="vertical" style={{ width: "100%" }}>
        <Button
          disabled={isAddDisabled}
          onClick={() => handleAdd(columns)}
          type="primary"
          shape="round"
          icon={<PlusOutlined />}
          size={"large"}
          style={{ float: "right" }}
        >
          add
        </Button>
        <Table pagination={false} dataSource={data} columns={columns} rowKey={(record) => record.id} />
        {/* <FloatButton
        disabled={buttonControls.add}
        onClick={() => handleAdd(columns)}
        tooltip="add Item"
        icon={<PlusCircleOutlined />}
        type="primary"
        shape={"circle"}
      /> */}
      </Space>
    </>
  );
}
