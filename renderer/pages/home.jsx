import { Card, Input, Layout } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Cart from "../components/Cart";
import DateTimeNow from "../components/DateTimeNow";
import ProductList from "../components/Productlist";
import { barcodeValue, disableInput, enableInput } from "../slice/barcodeSlice";
import { inventoryValue, search } from "../slice/inventorySlice";
import { setInfo } from "../slice/userSlice";

const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;

const SearchContainer = styled.div``;
const Row = styled.div`   
 padding-top: 10px;
    background-color: white;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: stretch;
    gap: 20px;
}`;
const Col = styled.div`
  width: ${(props) => props.width};
`;
const CustomSearch = styled(Search)`
  width: 100%;
  margin-bottom: 10px;
`;

const CustomLayout = styled.div`
  padding: 0px;
  height: 100%;
`;
const path = require("path");
export default function home() {
  const inventory = useSelector(inventoryValue);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const barcode = useSelector(barcodeValue);
  const onSearch = (value) => {
    dispatch(search(value));
  };
  const onChange = async (value) => {
    dispatch(search(value.target.value));
    setInput(value.target.value);
  };

  const keydownHandler = (e) => {
    if (performance.now() - e.timeStamp > 1) {
      dispatch(disableInput());
      dispatch(search(""));
      setInput("");
    }
    setTimeout(() => {
      dispatch(enableInput());
    }, 200);
  };
  useEffect(() => {
    // console.log();
    dispatch(setInfo());
  }, [dispatch]);

  return (
    <CustomLayout>
      <>
        <Row>
          <Col width={"80%"} style={{ height: "100%", display: "flex", height: "100%", flexDirection: "column" }}>
            <div style={{ textAlign: "right" }}>
              <DateTimeNow />
            </div>
            <CustomSearch
              value={input}
              disabled={barcode.isdisableInput}
              onKeyDown={(e) => keydownHandler(e)}
              size="large"
              placeholder="input search text"
              onSearch={onSearch}
              onChange={(e) => onChange(e)}
            />
            <Card bodyStyle={{ padding: "0", height: "100%" }} style={{ height: "100%", overflowY: "scroll" }}>
              <ProductList />
            </Card>
          </Col>
          <Col width={"30%"}>
            <Card
              style={{ height: "100%" }}
              bodyStyle={{ height: "100%", display: "flex", height: "100%", flexDirection: "column" }}
            >
              <Cart></Cart>
            </Card>
          </Col>
        </Row>
      </>
    </CustomLayout>
  );
}
