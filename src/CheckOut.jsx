import React, { useContext } from "react";
import CartContext from "./Store/CartContex";
import Model from "./UI/Model";
import UserProgressContex from "./Store/UserProgressContex";
import Input from "./UI/Input";
import Button from "./UI/Button";
import useHttp from "./Hooks/useHttp";
import Error from "./Error";
const reqConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function CheckOut() {
  const cartctx = useContext(CartContext);
  const userProgressCTX = useContext(UserProgressContex);
  console.log(userProgressCTX.progres, cartctx.items);

  const cartTotal =
    cartctx.items.length > 0 &&
    cartctx.items.reduce((totalAmount, item) => {
      return totalAmount + item.price * item.quntity;
    });
  let open = userProgressCTX.progres === "checkout" ? true : false;
  const { data, isLoading, error, sendRequest, cleardata } = useHttp(
    "http://localhost:3000/orders",
    reqConfig,
    
  );

  function handelClose() {
    userProgressCTX.hideCheckOut();
  }

  let action = (
    <>
      <Button type="button" onClick={handelClose} textOnly={true}>
        close
      </Button>
      <Button type="submit"> submit order</Button>
    </>
  );

  if (isLoading === true) {
    action = <span>sending req....</span>;
  }
  function handelSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const customerData = Object.fromEntries(fd.entries());
    sendRequest(
      JSON.stringify({
        order: {
          items: cartctx.items,
          customer: customerData,
        },
      })
    );
  }
  let mer;
  console.log(error);
  if (error) {
    mer = <Error title="req not send" message={error} />;
  }

  function handelData() {
    cartctx.clearCart();
    cleardata();
    handelClose();
  }

  console.log(data)
  if (data && !error) {
    return (
      <Model
        open={open}
        onclose={userProgressCTX.progres === "checkout" ? handelData : null}
      >
        <h2>success</h2>
        <p>your order was submitted sucessfully</p>
        <p>we will get back to you in few min</p>
        <Button onClick={handelData}>okay</Button>
      </Model>
    );
  }

  return (
    <Model
      open={open}
      onclose={userProgressCTX.progres === "checkout" ? handelClose : null}
    >
      <form onSubmit={handelSubmit}>
        <h2>checkout</h2>
        <p>Total amount :</p>
        <Input lable="Full Name" type="text" id="name" />
        <Input lable="Email" type="email" id="email" />
        <Input lable="Street" type="text" id="street" />
        <div className="control-row">
          <Input lable="Postal Code" type="text" id="postal-code" />
          <Input lable="City" type="text" id="city" />
        </div>
        {mer}
        <p className="modal-actions">{action}</p>
      </form>
    </Model>
  );
}
