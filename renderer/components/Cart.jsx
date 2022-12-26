import { CloseCircleTwoTone, DeleteFilled, MinusSquareOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Input } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { cartValue, clearCart, removeItem, removeQty } from "../slice/cartSlice";
import { formatNumber } from "../utils/formatNumber";

const MContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-content: flex-start;
  flex-wrap: nowrap;
  align-items: center;
  height: 66%;
  overflow-y: scroll;
`;

const MCard = styled(Card)`
  border-radius: 10px;
  margin-top: 10px;
  width: 90%;
  .ant-card-body {
    flex-direction: column;
    padding: 8px 12px;
    align-items: center;
    div {
      width: 100%;
    }
  }

  .ant-card-head {
    border-radius: 10px;
  }
  .ant-card-head-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const Header = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: space-around;
  align-items: center;
`;
const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  flex-direction: column;
  padding: 0;
`;

const MTitle = styled(Title)`
  margin: 0 !important;
`;
export default function Cart() {
  const cart = useSelector(cartValue);
  const dispatch = useDispatch();
  const [change, setChange] = useState(0);

  const onHandleChange = (e) => {
    const value = e.target.value;
    setChange(value - cart.total);
  };

  return (
    <>
      <Header>
        <Title level={2}>Cart</Title>
        <CloseCircleTwoTone
          style={{ fontSize: "16px", color: "#08c", fontSize: "30px" }}
          twoToneColor="#eb2f96"
          onClick={() => dispatch(clearCart())}
        />
        {/* <button>clear</button> */}
      </Header>
      <Divider />
      <MContent>
        {cart.data.map((item, key) => (
          <MCard
            title={
              <>
                {item.name}
                <DeleteFilled style={{ color: " rgb(244, 67, 54)" }} onClick={() => dispatch(removeItem(item))} />
              </>
            }
            size="default"
            type="inner"
            key={key}
          >
            <div>
              <div>{`ID: ${item.product_id}`}</div>
              <div>₱{item.total_price}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <MinusSquareOutlined
                onClick={() => dispatch(removeQty(item))}
                style={{ marginRight: "5px", color: " rgb(244, 67, 54)" }}
              />
              x {item.qty}
            </div>
          </MCard>
        ))}
      </MContent>
      <Divider />
      <Footer>
        <MTitle level={4}>TOTAL : {formatNumber(cart.total)}</MTitle>
        {/* <MTitle level={4}>CASH : ₱</MTitle> */}
        <Input va size="large" placeholder="CASH ₱" onChange={(e) => onHandleChange(e)}></Input>
        <MTitle level={4}>CHANGE : {formatNumber(change)}</MTitle>
        <Button type="primary" size={"large"} disabled={change <= 0 || cart.total == 0 ? true : false}>
          Checkout
        </Button>
      </Footer>
    </>
  );
}
