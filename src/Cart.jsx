import React, { useContext } from "react";
import Model from "./UI/Model";
import CartContext from "./Store/CartContex";
import Button from "./UI/Button";
import UserProgressContex from "./Store/UserProgressContex";

export default function Cart() {
  const userProgressCTX = useContext(UserProgressContex);
  const cartctx = useContext(CartContext);

  function handelRem(el) {
    cartctx.removeItem(el);
  }
  const cartTotal = cartctx.items.reduce((totalAmount, item) => {
    return totalAmount + item.price * item.quntity;
  }, 0);
  let open = userProgressCTX.progres === "cart" ? true : false;
  console.log(cartTotal, open);
  return (
    <Model
      open={open}
      className="cart"
      onClose={
        userProgressCTX.progres === "cart"
          ? () => {
              userProgressCTX.hideCart();
            }
          : null
      }
    >
      <h2>Your Cart</h2>

      <ul>
        {cartctx.items.map((item) => (
          <li className="cart-item" key={item.id}>
            {item.name} - {item.quntity} x ${item.price}
            <p className="cart-item-actions ">
              <Button
                onClick={() => {
                  handelRem(item.id);
                }}
                textOnly={true}
              >
                -
              </Button>
              <Button
                onClick={() => {
                  cartctx.addItem(item);
                }}
                textOnly={true}
              >
                +
              </Button>
            </p>
          </li>
        ))}
      </ul>
      <p className="cart-total">${cartTotal}</p>
      <p className="modal-actions">
        <Button
          onClick={() => {
            userProgressCTX.hideCart();
          }}
          textOnly={true}
        >
          {" "}
          close
        </Button>
        {cartctx.items.length > 0 && (
          <Button onClick={userProgressCTX.showCheckOut}> Checkout</Button>
        )}
      </p>
    </Model>
  );
}
