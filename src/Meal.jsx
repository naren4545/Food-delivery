import React, { useContext } from "react";
import Button from "./UI/Button";
import CartContext from "./Store/CartContex";
export default function Meal({ meal }) {

const crtCxt=useContext(CartContext)

function handelAddToCart(){

  crtCxt.addItem(meal)
}

  return (
    <li className="meal-item" key={meal.id}>
      <article>
        <img src={`http://localhost:3000/${meal.image}`} />

        <div>
          <h3>{meal.name}</h3>

          <p className="meal-item-price">{meal.price}</p>
          <p className="meal-item-description">{meal.description}</p>

          <p className="meal-item-actions">
            <Button onClick={handelAddToCart}>Add To Cart</Button>
            </p>
        </div>
      </article>
    </li>
  );
}
