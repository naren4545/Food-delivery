import React, { createContext, useState } from "react";

const UserProgressContex = createContext({
  progres: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckOut: () => {},
  hideCheckOut: () => {},
});

export function UserProgressCTXProvider({ children }) {
  const [userProgress, setUserprogress] = useState("");

  function showCart() {
    setUserprogress("cart");
  }
  function hideCart() {
    setUserprogress("");
  }
  function showCheckOut() {
    setUserprogress("checkout");
  }

  function hideCheckOut() {
    setUserprogress("");
  }

  const userProgressValue = {
    progres: userProgress,
    hideCheckOut,
    hideCart,
    showCart,
    showCheckOut,
  };

  return (
    <UserProgressContex.Provider value={userProgressValue}>
      {children}
    </UserProgressContex.Provider>
  );
}

export default UserProgressContex;
