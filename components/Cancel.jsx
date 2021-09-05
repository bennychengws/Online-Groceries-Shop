import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import moduleCss from "../styles/Cancel.module.css";
import OrderCanceled from "../components/OrderCancelled";
import Link from "next/link";
import Image from "next/image";

const Cancel = ({show, onClose}) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div className={moduleCss.styledModalOverlay}>
      <div className={moduleCss.styledModal}>
        <div className={moduleCss.question}>Are you sure to cancel this order?</div>
        <div className={moduleCss.buttonContainer}>
          <button className={`${moduleCss.buttonStyle} ${moduleCss.yesStyle}`} onClick={() => setShowModal(true)}>Yes</button>
          <button className={`${moduleCss.buttonStyle} ${moduleCss.noStyle}`} onClick={handleCloseClick}>No</button>
        </div>      
      </div>
      <OrderCanceled show={showModal}></OrderCanceled> 
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      //   <div ref={elementRef}>Hello from modal</div>,
      modalContent,
      document.getElementById("cancel-root")
    );
  } else {
    return null;
  }
};

export default Cancel;
