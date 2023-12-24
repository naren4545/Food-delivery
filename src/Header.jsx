import React, { useContext, useRef, useState } from "react";
import logoImage from "./assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "./Store/CartContex";
import Cart from "./Cart";
import UserProgressContex from "./Store/UserProgressContex";

export default function Header() {
  const [open, setOpen] = useState(false);
  const cart = useContext(CartContext);
const userProgressCTX=useContext(UserProgressContex)
  const totalCarttem = cart.items.reduce((totalCartItem, item) => {
    return totalCartItem + item.quntity;
  }, 0);

  function handelCart() {
   userProgressCTX.showCart();
  }

  console.log(totalCarttem, open);
  return (
    <>
      
      <header id="main-header">
        <div id="title">
          <img src={logoImage} />

          <h1>Food deleviry</h1>
        </div>

        <nav>
          <Button onClick={handelCart} textOnly={true}>
            cart({totalCarttem})
          </Button>
        </nav>
      </header>
    </>
  );
}
