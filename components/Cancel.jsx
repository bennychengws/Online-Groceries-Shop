import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import moduleCss from "../styles/Cancel.module.css";
import OrderCanceled from "../components/OrderCancelled";
import fetchHandler from "../lib/fetchHandler";
import { useUserContext } from "../context/UserContext";
import getConfig from 'next/config';

import Link from "next/link";
import Image from "next/image";

const Cancel = ({show, orderId, onClose}) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userState, dispatch] = useUserContext()
  const { publicRuntimeConfig } = getConfig();

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const deleteOrder = async () => {
    var newArray = userState.orders.slice()
    // const itemToBeDeleted = {_id: item._id, quantity: item.quantity} 
    // const res = await fetchHandler(`http://localhost:3000/api/user/${userState._id}/actions/handleCart`, "DELETE", undefined, itemToBeDeleted);
    const res = await fetchHandler(`${publicRuntimeConfig.apiUrl}/user/${userState._id}/actions/handleOrder`, "DELETE", undefined, orderId);
    if (res.ok) {
      // setCartList(cartList.filter((otherItems) => otherItems._id !== item._id))
      // let anArray = newArray.filter((otherIDs) => otherIDs._id !== item._id)
      // dispatch({type: "init_stored", value: { ...userState, cart: anArray}})
      // setCartList(cartList.filter((otherItems) => otherItems._id !== item._id))
      let anArray = newArray.filter((otherOrders) => otherOrders._id !== orderId)
      console.log(anArray)
      dispatch({ type: "init_stored", value: { ...userState, orders: anArray } })
      setShowModal(true)
    } else if (res.status === 401) {
      createNotification("error", null, "Sorry you are not authenticated")
      router.push("/")
    } else {
      createNotification("error", null, "Some errors occur, please try again")
    }
    // createNotification(item)
  }

  const modalContent = show ? (
    <div className={moduleCss.styledModalOverlay}>
      <style jsx global>{`
        body {
          overflow: hidden;
        }
      `}
      </style>
      <div className={moduleCss.styledModal}>
        <div className={moduleCss.question}>Are you sure to cancel this order?</div>
        <div className={moduleCss.buttonContainer}>
          <button className={`${moduleCss.buttonStyle} ${moduleCss.yesStyle}`} onClick={deleteOrder}>Yes</button>
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
