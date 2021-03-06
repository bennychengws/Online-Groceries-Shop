import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import moduleCss from "../styles/accepted.module.scss";
import Image from "next/image";
import Link from "next/link";
import acceptedIcon from "../images/acceptedIcon.png";

const Accepted = ({ show }) => {
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
        <div className={moduleCss.orderAccepted}>
          Your Order has been accepted
        </div>
        <div className={moduleCss.itemsPlaced}>
          {" "}
          Your items has been placed and is on it's way to being processed
        </div>
        <Link href="../my_orders">
          <button className={moduleCss.track}>Track Order</button>
        </Link>
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

export default Accepted;
