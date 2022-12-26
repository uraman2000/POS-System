import { Card, Input, Layout } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Cart from "../components/Cart";
import DateTimeNow from "../components/DateTimeNow";
import ProductList from "../components/Productlist";
import { inventoryValue, search } from "../slice/inventorySlice";
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

export default function home() {
  const inventory = useSelector(inventoryValue);
  const dispatch = useDispatch();
  const onSearch = (value) => {
    dispatch(search(value));
  };
  const onChange = (value) => {
    dispatch(search(value.target.value));
  };
  return (
    <CustomLayout>
      <>
        <Row>
          <Col width={"80%"} style={{ height: "100%", display: "flex", height: "100%", flexDirection: "column" }}>
            <div style={{ textAlign: "right" }}>
              <DateTimeNow />
            </div>
            <CustomSearch
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
