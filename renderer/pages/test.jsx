import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementByAmount, selectValue } from "../slice/counterSlice";
export default function test() {
  const count = useSelector(selectValue);
  const dispatch = useDispatch();
  return (
    <>
      <button onClick={() => dispatch(increment())}>+</button>
      <div>{count}</div>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(incrementByAmount(count))}>-</button>
    </>
  );
}
