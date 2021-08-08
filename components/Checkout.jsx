import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import moduleCss from "../styles/Checkout.module.css"
import Link from "next/link";
import Image from "next/image";
import backArrow from "../images/back arrow.png"
import card from "../images/card.png"

const Checkout = ({ show, onClose, children, title }) => {
  //   const elementRef = useRef();
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    // const divElement = elementRef.current;
    // console.log(divElement)
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div className={moduleCss.styledModalOverlay}>
      <div className={moduleCss.styledModal}>
        <div className={moduleCss.styledModalHeader}>
          <div className={moduleCss.styledModalCheckOut}>Checkout</div>
          <Link href="#">
            <a href="#" onClick={handleCloseClick} className={moduleCss.styledModalCross}>
              x
            </a>
          </Link>
        </div>
        <div className={moduleCss.styledModalContent}>
          <div className={moduleCss.styledModalRow}>
            <div className={moduleCss.styledModalRowTitle}>Delivery</div>
            <div className={moduleCss.rightOptions}>
              <div className={moduleCss.StyledModalRowBody}>Select Method</div>
              <div className={moduleCss.ImagePattern}><Image src={backArrow} width="8.4px" height="14px"></Image></div>
            </div>
          </div>
          <div className={moduleCss.styledModalRow}>
            <div className={moduleCss.styledModalRowTitle}>Paymennt</div>
            <div className={moduleCss.rightOptions}>
              <div className={moduleCss.StyledModalRowBody}><div className={moduleCss.ImagePattern}><Image src={card} width="21.61px" height="16px"></Image></div></div>
              <div className={moduleCss.ImagePattern}><Image src={backArrow} width="8.4px" height="14px"></Image></div>
            </div>
          </div>
          <div className={moduleCss.styledModalRow}>
            <div className={moduleCss.styledModalRowTitle}>Promo Code</div>
            <div className={moduleCss.rightOptions}>
              <div className={moduleCss.StyledModalRowBody}>Pick discount</div>
              <div className={moduleCss.ImagePattern}><Image src={backArrow} width="8.4px" height="14px"></Image></div>
            </div>
          </div>
          <div className={moduleCss.styledModalRow}>
            <div className={moduleCss.styledModalRowTitle}>Total cost</div>
            <div className={moduleCss.rightOptions}>
              <div className={moduleCss.StyledModalRowBody}>$13.97</div>
              <div className={moduleCss.ImagePattern}><Image src={backArrow} width="8.4px" height="14px"></Image></div>
            </div>
          </div>
        </div>
        <div className={moduleCss.styledModalDeclaration}>By placing an order you agree to our <div>
          <Link href="#">
            <a className={moduleCss.styledModalDeclarationDetails}>Terms</a>
          </Link> And
          <Link href="#">
            <a className={moduleCss.styledModalDeclarationDetails}> Conditions</a>
          </Link></div></div>
        <Link href="../home">
          <button className={moduleCss.styledModalButton}>Place Order</button>
        </Link>
      </div>
    </div >
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      //   <div ref={elementRef}>Hello from modal</div>,
      modalContent,
      document.getElementById("checkout-root")
    );
  } else {
    return null;
  }
};

export default Checkout;
