import React, { useEffect, useState } from "react";
import LineItems from "./LineItems";

const Minicart = ({ products, cart, children }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const toggleDialog = () => {
      setOpen(!open)
    };

    document.addEventListener('toggle-minicart', toggleDialog, false);

    return () => document.removeEventListener('toggle-minicart', toggleDialog);
  }, [open, setOpen]);

  const renderContent = () => {
    if (children) {
      return children.type({ products, cart, children: children.props.children });
    }
    else {
      return (
        <LineItems {...{ products, cart }}>
          {children}
        </LineItems>
      )
    }
  }

  return (
    <dialog {...{ open }}>
      <button onClick={() => setOpen(false)}>X</button>

      {renderContent()}

      <style jsx>{`
      button {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      dialog {
        height: calc(100% - 40px);
        z-index: 100;
        width: 400px;
        position: fixed;
        top: 0;
        right: 0;
        margin: 0 0 0 auto;
        border: none;
        border-left: 1px solid black;
        padding: 20px;
      }
    `}</style>
    </dialog>
  )
};

export default Minicart;
