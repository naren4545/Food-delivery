import { Children, createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart:()=>{}
});

function CartReducer(state, action) {
  if ((action.type === "ADD-ITEM")) {
    const existingItem = state.items.findIndex((item) => {
     return item.id === action.item.id;
    });
    console.log(existingItem)
    const updatedItems = [...state.items];
    if (existingItem > -1) {
      const updatedItem = {
        ...state.items[existingItem],
        quntity: state.items[existingItem].quntity + 1,
      };

      updatedItems[existingItem] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quntity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if ((action.type === "REM-ITEM")) {
    const existingItem = state.items.findIndex((item) => {
     return item.id === action.id;
    });

    const updatedItems = [...state.items];

    if ((state.items[existingItem].quntity === 1)) {
      updatedItems.splice(existingItem, 1);
    } else {
      const updatedItem = {
        ...state.items[existingItem],
        quntity: state.items[existingItem].quntity - 1,
      };
      updatedItems[existingItem] = updatedItem;
    }




    return { ...state, items: updatedItems };
  }



  if ((action.type === "CLEAR-ITEM")){

const updatedItems=[]

return {...state, items:updatedItems}
  }
}
export function CartContextPrivider({children}) {
  const [cart, dispatchCartAction] = useReducer(CartReducer, {
    items: [],
  });

  function addItem(item) {
    dispatchCartAction({ type: "ADD-ITEM", item });
  }
  function removeItem(id) {
    dispatchCartAction({ type: "REM-ITEM", id });
  }
  function clearCart(){
    dispatchCartAction({ type: "CLEAR-ITEM" });

  }

  const CartContextvalue = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart
  };
  console.log(CartContextvalue);

  return (
    <CartContext.Provider value={CartContextvalue}>{children}</CartContext.Provider>
  );
}

export default CartContext;
