import { CloseCircleTwoTone, DeleteFilled, MinusSquareOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Input } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import productServices from "../../services/product.services";
import { addCart, cartValue, clearCart, removeItem, removeQty } from "../slice/cartSlice";
import { formatNumber } from "../utils/formatNumber";
import { addInventory, inventoryValue } from "../slice/inventorySlice";
import { barcodeValue, disableInput, enableInput } from "../slice/barcodeSlice";
import TransactionItemServices from "../../services/transactionItem.services";
import TransactionServices from "../../services/transaction.services";
import { setInfo, usertValue } from "../slice/userSlice";
import UserServices from "../../services/user.services";

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

const product = new productServices();
const transactionItemServices = new TransactionItemServices();
const transactionServices = new TransactionServices();
const userServices = new UserServices();
export default function Cart() {
  const cart = useSelector(cartValue);
  const barcode = useSelector(barcodeValue);
  const user = useSelector(usertValue);
  const [ms, setMs] = useState(0);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    total: 0,
    change: 0,
  });
  const [input, setInput] = useState("");
  const onHandleChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^\d]/g, "");
    const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace(/^/, "₱");
    setInput(formattedValue);
    setState({
      total: value,
      change: value - cart.total,
    });
  };

  useEffect(() => {
    setState({
      ...state,
      change: state.total - cart.total,
    });
  }, [cart.data]);

  const onClear = () => {
    dispatch(clearCart());
    setInput("");
    setState({
      total: 0,
      change: 0,
    });
  };
  const onCheckout = async () => {
    const decrementQTY = cart.data.map((item) => ({
      id: item.id,
      quantity: item.quantity - item.qty,
    }));
    decrementQTY.forEach(async (element) => {
      await product.Upsert(element);
    });
    const newUser = await userServices.setCommision(user, cart.data);
    console.log(newUser);
    localStorage.setItem("User", JSON.stringify(newUser));
    dispatch(setInfo());

    const currentDate = new Date().toLocaleString("en-us", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const transactionData = {
      dateTime: currentDate,
      total: cart.total,
      userid: user.id,
    };
    await transactionServices.insertTrasaction(transactionData, cart.data);

    onClear();
    dispatch(addInventory(await product.select()));
  };
  const keydownHandler = (e) => {
    setMs(e.timeStamp);

    if (performance.now() - e.timeStamp > 1) {
      dispatch(disableInput());
      setInput("");
    }
    setTimeout(() => {
      dispatch(enableInput());
    }, 200);
  };
  return (
    <>
      <Header>
        <Title level={2}>Cart</Title>
        <CloseCircleTwoTone
          style={{ fontSize: "16px", color: "#08c", fontSize: "30px" }}
          twoToneColor="#eb2f96"
          onClick={() => onClear()}
        />
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
              <div>{`ID: ${item.id}`}</div>
              <div>₱{item.total_price}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <MinusSquareOutlined
                onClick={() => dispatch(removeQty(item))}
                style={{ marginRight: "5px", color: " rgb(244, 67, 54)" }}
              />
              x {item.qty}
              <PlusSquareOutlined
                onClick={() => dispatch(addCart(item))}
                style={{ marginLeft: "5px", color: "green" }}
              />
            </div>
          </MCard>
        ))}
      </MContent>
      <Divider />
      <Footer>
        <MTitle level={4}>TOTAL : {formatNumber(cart.total)}</MTitle>
        <Input
          status={state.change < 0 || cart.total == 0 ? "error" : ""}
          onKeyDown={(e) => keydownHandler(e)}
          disabled={barcode.isdisableInput}
          size="large"
          placeholder="CASH ₱"
          value={input}
          onChange={(e) => onHandleChange(e)}
        ></Input>
        <MTitle level={4}>CHANGE : {formatNumber(state.change)}</MTitle>
        <Button
          onClick={onCheckout}
          type="primary"
          size={"large"}
          disabled={state.change < 0 || cart.total == 0 ? true : false}
        >
          Checkout
        </Button>
      </Footer>
    </>
  );
}
