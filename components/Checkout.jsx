import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import moduleCss from "../styles/Checkout.module.css"
import Link from "next/link";
import Image from "next/image";
import Failed from "../components/Failed";
import Accepted from "../components/Accepted";
import expandArrow from "../images/back arrow.png";
import downArrow from "../images/downArrow.png";
import card from "../images/card.png"

const Checkout = ({ show, onClose, totalPrice, cartList, children, title }) => {
  //   const elementRef = useRef();
  const [isBrowser, setIsBrowser] = useState(false);
  const [isDeliveryCollapsed, setIsDeliveryCollapsed] = useState(false);
  const [isPaymentCollapsed, setIsPaymentCollapsed] = useState(false);
  const [isPromoCodeCollapsed, setIsPromoCodeCollapsed] = useState(false);
  const [showAcceptedModal, setShowAcceptedModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);

  console.log(cartList)

  useEffect(() => {
    // const divElement = elementRef.current;
    // console.log(divElement)
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    setIsDeliveryCollapsed(false);
    setIsPaymentCollapsed(false);
    setIsPromoCodeCollapsed(false);
    onClose();
  };

  // const handlePlaceOrder = (e) => {
  //   setShowAcceptedModal(true);
  //   handleCloseClick(e);
  // }

  // const itemList = [
  //   {
  //     rowTitle: "Delivery",
  //     rowOnClick: () => setIsDeliveryCollapsed(!isDeliveryCollapsed),
  //     rowBody: "Select Method",
  //     rowArrow: isDeliveryCollapsed ? <Image src={downArrow} width="14px" height="8.4px"></Image> : <Image src={expandArrow} width="8.4px" height="14px"></Image>,
  //     rowCursorStyle: {cursor: "pointer"},
  //     rowControl: {display: isDeliveryCollapsed ? "block" : "none"},
  //     options: ["DHL","SF Express", "Pick up at our store"]
  //   },
  //   {
  //     rowTitle: "Payment",
  //     rowOnClick: () => setIsPaymentCollapsed(!isPaymentCollapsed),
  //     rowBody: <div className={moduleCss.ImagePattern}><Image src={card} width="21.61px" height="16px"></Image></div>,
  //     rowArrow: isPaymentCollapsed ? <Image src={downArrow} width="14px" height="8.4px"></Image> : <Image src={expandArrow} width="8.4px" height="14px"></Image>,
  //     rowCursorStyle: {cursor: "pointer"},
  //     rowControl: {display: isPaymentCollapsed ? "block" : "none"},
  //     options: ["Paybal", "FPS", "MasterCard"]
  //   },
  //   {
  //     rowTitle: "Promo Code",
  //     rowOnClick: () => setIsPromoCodeCollapsed(!isPromoCodeCollapsed),
  //     rowBody: "Pick discount",
  //     rowArrow: isPromoCodeCollapsed ? <Image src={downArrow} width="14px" height="8.4px"></Image> : <Image src={expandArrow} width="8.4px" height="14px"></Image>,
  //     rowCursorStyle: {cursor: "pointer"},
  //     rowControl: {display: isPromoCodeCollapsed ? "block" : "none"},
  //     options: [ "None"]
  //   },
  //   {
  //     rowTitle: "Total Cost",
  //     rowOnClick: () => void 0,
  //     rowBody: "$13.97",
  //     rowArrow: "",
  //     rowCursorStyle: {cursor: "auto"},
  //     rowControl: {display: "none"},
  //     options: []
  //   },
  // ]

  const deliveryList = [{list: ["DHL","SF Express", "Pick up at our store"], rowControl: {display: isDeliveryCollapsed ? "block" : "none"}}]
  const paymentList = [{list: ["Paybal", "FPS", "MasterCard"], rowControl: {display: isPaymentCollapsed ? "block" : "none"}}]
  const promoCodeList = [{list: ["None"], rowControl: {display: isPromoCodeCollapsed ? "block" : "none"}}]

  const modalContent = show ? (
    <div className={moduleCss.styledModalOverlay}>
      <div className={moduleCss.styledModal}>
        <div className={moduleCss.styledModalHeader}>
          <div className={moduleCss.styledModalCheckOut}>Checkout</div>
          <Link href="#"><a href="#" onClick={handleCloseClick} className={moduleCss.styledModalCross}>x</a></Link>
        </div>
        <div className={moduleCss.styledModalContent}>
          <div className={moduleCss.styledModalRow}>
            <div className={moduleCss.styledModalFirstRow}>
              <div className={moduleCss.styledModalRowTitle}>Delivery</div>
              <div className={moduleCss.rightOptions} onClick={() => setIsDeliveryCollapsed(!isDeliveryCollapsed)}>
                <div className={moduleCss.StyledModalRowBody}>Select Method</div>
                <div className={moduleCss.ImagePattern}>{isDeliveryCollapsed ? <Image src={downArrow} width="14px" height="8.4px"></Image> : <Image src={expandArrow} width="8.4px" height="14px"></Image>}</div>
              </div>
            </div>
            {deliveryList.map((option, upperIndex) => (
              <div key={upperIndex} className={moduleCss.styledModalSecondRow} style={option.rowControl}><div className="block"><div className="mt-2"><div className="flex flex-col items-end">
                {option.list.map((item, index) => {
                  if (index === 0) {
                    return <label key={index} className="inline-flex items-center"><span className="mr-2">{item}</span><input type="radio" className="form-radio text-indigo-600" name="radio-colors1" value={index + 1} defaultChecked></input></label>
                  } else {
                    return <label key={index} className="inline-flex items-center"><span className="mr-2">{item}</span><input type="radio" className="form-radio text-indigo-600" name="radio-colors1" value={index + 1}></input></label>
                  }
                })}
              </div></div></div></div>
            ))}
          </div>
          <div className={moduleCss.styledModalRow}>
            <div className={moduleCss.styledModalFirstRow}>
              <div className={moduleCss.styledModalRowTitle}>Payment</div>
              <div className={moduleCss.rightOptions} onClick={() => setIsPaymentCollapsed(!isPaymentCollapsed)}>
                <div className={moduleCss.StyledModalRowBody}><div className={moduleCss.ImagePattern}><Image src={card} width="21.61px" height="16px"></Image></div></div>
                <div className={moduleCss.ImagePattern}>{isPaymentCollapsed ? <Image src={downArrow} width="14px" height="8.4px"></Image> : <Image src={expandArrow} width="8.4px" height="14px"></Image>}</div>
              </div>
            </div>
            {paymentList.map((option, upperIndex) => (
              <div key={upperIndex} className={moduleCss.styledModalSecondRow} style={option.rowControl}><div className="block"><div className="mt-2"><div className="flex flex-col items-end">
                {option.list.map((item, index) => {
                  if (index === 0) {
                    return <label key={index} className="inline-flex items-center"><span className="mr-2">{item}</span><input type="radio" className="form-radio text-indigo-600" name="radio-colors2" value={index + 1} defaultChecked></input></label>
                  } else {
                    return <label key={index} className="inline-flex items-center"><span className="mr-2">{item}</span><input type="radio" className="form-radio text-indigo-600" name="radio-colors2" value={index + 1}></input></label>
                  }
                })}
              </div></div></div></div>
            ))}
          </div>
          <div className={moduleCss.styledModalRow}>
            <div className={moduleCss.styledModalFirstRow}>
              <div className={moduleCss.styledModalRowTitle}>Promo Code</div>
              <div className={moduleCss.rightOptions} onClick={() => setIsPromoCodeCollapsed(!isPromoCodeCollapsed)}>
                <div className={moduleCss.StyledModalRowBody}>Pick discount</div>
                <div className={moduleCss.ImagePattern}>{isPromoCodeCollapsed ? <Image src={downArrow} width="14px" height="8.4px"></Image> : <Image src={expandArrow} width="8.4px" height="14px"></Image>}</div>
              </div>
            </div>
            {promoCodeList.map((option, upperIndex) => (
              <div key={upperIndex} className={moduleCss.styledModalSecondRow} style={option.rowControl}><div className="block"><div className="mt-2"><div className="flex flex-col items-end">
                {option.list.map((item, index) => {
                  if (index === 0) {
                    return <label key={index} className="inline-flex items-center"><span className="mr-2">{item}</span><input type="radio" className="form-radio text-indigo-600" name="radio-colors3" value={index + 1} defaultChecked></input></label>
                  } else {
                    return <label key={index} className="inline-flex items-center"><span className="mr-2">{item}</span><input type="radio" className="form-radio text-indigo-600" name="radio-colors3" value={index + 1}></input></label>
                  }
                })}
              </div></div></div></div>
            ))}
          </div>
          <div className={moduleCss.styledModalRow}>
            <div className={moduleCss.styledModalFirstRow}>
              <div className={moduleCss.styledModalRowTitle}>Total Cost</div>
              <div className={moduleCss.StyledModalRowBody}>{totalPrice}</div>
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
        {/* <Link href="../home"> */}
          <button className={moduleCss.styledModalButton} onClick={() => setShowAcceptedModal(true)}>Place Order</button>
        {/* </Link> */}
      </div>
      <Accepted show={showAcceptedModal}></Accepted> 
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
