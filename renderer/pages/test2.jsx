import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart, cartValue } from "../slice/cartSlice";
export default function test2() {
  const cart = useSelector(cartValue);
  const data = {
    name: "tester",
    price: 0,
    product_id: 0,
    qty: 0,
  };
  const dispatch = useDispatch();
  return (
    <div>
      <button
        onClick={() => {
          console.log(cart);

          dispatch(addCart(data));
        }}
      >
        add to cart
      </button>
    </div>
  );
}
