import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
export default function Model({ children, open, onClose ,className="" }) {
  const dialog = useRef();
  useEffect(
    function () {
      if (open) {
        dialog.current.showModal();
      }else{
        dialog.current.close();
      }
    },
    [open]
  );

  return createPortal(
    <dialog className={`modal ${className}`} ref={dialog} onClose={onClose}>{children}</dialog>,
    document.getElementById("modal")
  );
}
