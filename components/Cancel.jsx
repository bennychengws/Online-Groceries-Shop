import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import moduleCss from "../styles/Cancel.module.scss";
import OrderCanceled from "../components/OrderCancelled";
import fetchHandler from "../lib/fetchHandler";
import { useUserContext } from "../context/UserContext";
import getConfig from 'next/config';
import { NotificationContainer, NotificationManager } from 'react-notifications';

const Cancel = ({show, order, onClose}) => {
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
    const res = await fetchHandler(`${publicRuntimeConfig.apiUrl}/user/${userState._id}/actions/handleOrder`, "DELETE", undefined, order);
    if (res.ok) {
      let anArray = newArray.filter((otherOrders) => otherOrders._id !== order._id)
      dispatch({ type: "init_stored", value: { ...userState, orders: anArray } })
      setShowModal(true)
    } else if (res.status === 401) {
      createNotification("error", "Sorry you are not authenticated")
      router.push("/")
    } else {
      createNotification("error", "Some errors occur, please try again")
    }
  }

  const createNotification = (type, message) => {
    switch (type) {
      case "error":
        return NotificationManager.error(message, 'Ooops', 3000, () => { }, false);
    }
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
      <NotificationContainer />
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("cancel-root")
    );
  } else {
    return null;
  }
};

export default Cancel;
