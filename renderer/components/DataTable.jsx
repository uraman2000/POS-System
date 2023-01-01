import React, { useEffect, useState } from "react";
import { Table, Input, Button, FloatButton, Space } from "antd";
import { PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import productServices from "../../services/product.services";

export default function DataTable(props) {
  const { onDelete, onUpsert } = props;
  const [data, setData] = useState(props.data);
  if (!data) return <div>nodat</div>;
  const [editMode, setEditMode] = useState(false);
  const [editedRow, setEditedRow] = useState(-1);
  const [editedData, setEditedData] = useState([]);
  const [buttonControls, setButtonControls] = useState({
    add: false,
  });
  const handleEdit = (index) => {
    setEditedRow(index);
    setEditMode(true);
    setButtonControls({ add: true });

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
    setEditMode(false);
    setEditedRow(-1);
    setEditedData([]);
    const newData = data.slice(0, -1);
    if (buttonControls.add) {
      setData(newData);
      setButtonControls({ add: false });
    }
  };

  const handleSave = () => {
    let newData = [...data];
    console.log("save");
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
  };
  const handleAdd = async (columns) => {
    const addItem = {};
    columns.map((item) => {
      if (item.title !== "Actions") addItem[item.title] = "";
    });

    await setData([...data, addItem]);
  };

  useEffect(() => {
    if (data.length == 0) return;
    const lastData = data[data.length - 1];
    if (lastData.id === "") {
      handleEdit(data.length - 1);
    }
  }, [data]);

  const handleChange = (event, index, key) => {
    const { value } = event.target;

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
            if (editMode && editedRow === index) {
              return (
                <Input
                  value={editedData.find((cell) => cell.index === index && cell.key === key)?.value}
                  onChange={(event) => handleChange(event, index, key)}
                />
              );
            } else {
              return text;
            }
          },
        }))
      : [];
  columns.push({
    title: "Actions",
    key: "actions",
    dataIndex: "actions",
    render: (text, record, index) => {
      if (editMode && editedRow === index) {
        return (
          <Space size={"small"}>
            <Button type="primary" onClick={handleSave}>
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

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Button
        disabled={buttonControls.add}
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
  );
}
