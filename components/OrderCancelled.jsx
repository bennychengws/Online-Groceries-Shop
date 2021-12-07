import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import ReactDOM from "react-dom";
import moduleCss from "../styles/OrderCancelled.module.scss";
import Image from "next/image";
import Link from "next/link";
import acceptedIcon from "../images/acceptedIcon.png";

const OrderCancelled = ({ show }) => {
  const router = useRouter()
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = show ? (
    <div className={moduleCss.layout}>
      <style jsx global>{`
        body {
          overflow: hidden;
        }
      `}
      </style>
      <div className={moduleCss.container}>
        <div className={moduleCss.acceptedImage}>
          <Image src={acceptedIcon} width="269px" height="240px"></Image>
        </div>
        <div className={moduleCss.orderCancelled}>
          Your Order has been cancelled
        </div>
        <div className={moduleCss.itemsPlaced}>
          {" "}
          We always welcome you to place orders again
        </div>
        <button className={moduleCss.track} onClick={() => router.reload()}>Track Order</button>
        <Link href="../home">
          <button className={moduleCss.back}>Back to home</button>
        </Link>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("accepted-root")
    );
  } else {
    return null;
  }
};

export default OrderCancelled;
