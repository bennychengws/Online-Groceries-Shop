import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import moduleCss from "../styles/Checkout.module.scss"
import Link from "next/link";
import Image from "next/image";
import Failed from "../components/Failed";
import Accepted from "../components/Accepted";
import Notice from "../components/Notice";
import expandArrow from "../images/back arrow.png";
import downArrow from "../images/downArrow.png";
import { PayPalButtons } from "@paypal/react-paypal-js";
import fetchHandler from "../lib/fetchHandler";
import { useUserContext } from "../context/UserContext";
import getConfig from 'next/config';
import mongoose from 'mongoose';

const Checkout = ({ show, onClose, totalPrice, cartList, children, title }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [isDeliveryCollapsed, setIsDeliveryCollapsed] = useState(false);
  const [isPaymentCollapsed, setIsPaymentCollapsed] = useState(false);
  const [isPromoCodeCollapsed, setIsPromoCodeCollapsed] = useState(false);
  const [showAcceptedModal, setShowAcceptedModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [userState, dispatch] = useUserContext()

  const [succeeded, setSucceeded] = useState(false);
  const [paypalErrorMessage, setPaypalErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);
  const [billingDetails, setBillingDetails] = useState("");
  const { publicRuntimeConfig } = getConfig();


  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    setIsDeliveryCollapsed(false);
    setIsPaymentCollapsed(false);
    setIsPromoCodeCollapsed(false);
    onClose();
  };

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: totalPrice,
            },
          },
        ],
        // remove the applicaiton_context object if you need your users to add a shipping address
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      await fetchHandler(`${publicRuntimeConfig.apiUrl}/user/${userState._id}/actions/handleCart`, "PUT", undefined, []);
      dispatch({ type: "init_stored", value: { ...userState, cart: [] } })

      let orderTime = new Date()
      let newOrder = {
        _id: mongoose.Types.ObjectId(),
        orderedBy: userState._id,
        totalPrice: totalPrice,
        status: "Pending to deliver",
        items: cartList,
        orderTime: orderTime,
        shipTo: userState.address,
        expectedArrivalDate: new Date().setDate(orderTime.getDate() + 3),
        actualArrivalDate: new Date().setDate(orderTime.getDate() + 3),
      }
      let orderArray = userState.orders.slice()
      orderArray.push(newOrder)
      await fetchHandler(`${publicRuntimeConfig.apiUrl}/user/${userState._id}/actions/handleOrder`, "PUT", undefined, newOrder);
      dispatch({ type: "init_stored", value: { ...userState, orders: orderArray } })
      const { payer } = details;
      setBillingDetails(payer);
      setSucceeded(true);
      // setShowFailedModal(true);
      setShowAcceptedModal(true);
    }).catch(function (error) {
      setPaypalErrorMessage("Something went wrong.");
      console.log(error);
      setShowFailedModal(true);
    });
  };

  // To be optimised
  // const deliveryList = [{ list: ["DHL", "SF Express", "Pick up at our store"], rowControl: { display: isDeliveryCollapsed ? "block" : "none" } }]
  const deliveryList = [{list: ["Ship to registered address"], rowControl: {display: isDeliveryCollapsed ? "block" : "none"}}]
  const paymentList = [{ list: ["Paybal", "FPS", "MasterCard"], rowControl: { display: isPaymentCollapsed ? "block" : "none" } }]
  const promoCodeList = [{ list: ["None"], rowControl: { display: isPromoCodeCollapsed ? "block" : "none" } }]

  const modalContent = show ? (
    <div className={moduleCss.styledModalOverlay}>
      <style jsx global>{`
        body {
          overflow: hidden;
        }
      `}
      </style>
      <div className={moduleCss.styledModal}>
        <div className={moduleCss.styledModalHeader}>
          <h1>Checkout</h1>
          <Link href="#"><a href="#" onClick={handleCloseClick}>x</a></Link>
        </div>
        <div className={moduleCss.styledModalContent}>
          <div className={moduleCss.rowContainer}>
            <div className={moduleCss.firstRow}>
              <div className={moduleCss.rowTitle}>Delivery</div>
              <div className={moduleCss.rightOptions} onClick={() => setIsDeliveryCollapsed(!isDeliveryCollapsed)}>
                <div className={moduleCss.rowBody}>Select Method</div>
                <div className={moduleCss.imagePattern}>{isDeliveryCollapsed ? <Image src={downArrow} width="14px" height="8.4px"></Image> : <Image src={expandArrow} width="8.4px" height="14px"></Image>}</div>
              </div>
            </div>
            {deliveryList.map((option, upperIndex) => (
              <div key={upperIndex} className={moduleCss.secondRow} style={option.rowControl}><div className="block"><div className="mt-2"><div className="flex flex-col items-end">
                {option.list.map((item, index) => {
                  return <label key={index} className="inline-flex items-center">
                      <span className="mr-2">{item}</span>
                      <input type="radio" className="form-radio text-indigo-600" name="radio-colors1" value={index + 1} defaultChecked={index === 0 ? true : false}></input>
                    </label>
                })}
              </div></div></div></div>
            ))}
          </div>
          {/* <div className={moduleCss.rowContainer}>
            <div className={moduleCss.firstRow}>
              <div className={moduleCss.rowTitle}>Payment</div>
              <div className={moduleCss.rightOptions} onClick={() => setIsPaymentCollapsed(!isPaymentCollapsed)}>
                <div className={moduleCss.rowBody}><div className={moduleCss.imagePattern}><Image src={card} width="21.61px" height="16px"></Image></div></div>
                <div className={moduleCss.imagePattern}>{isPaymentCollapsed ? <Image src={downArrow} width="14px" height="8.4px"></Image> : <Image src={expandArrow} width="8.4px" height="14px"></Image>}</div>
              </div>
            </div>
            {paymentList.map((option, upperIndex) => (
              <div key={upperIndex} className={moduleCss.secondRow} style={option.rowControl}><div className="block"><div className="mt-2"><div className="flex flex-col items-end">
                {option.list.map((item, index) => {
                  if (index === 0) {
                    return <label key={index} className="inline-flex items-center"><span className="mr-2">{item}</span><input type="radio" className="form-radio text-indigo-600" name="radio-colors2" value={index + 1} defaultChecked></input></label>
                  } else {
                    return <label key={index} className="inline-flex items-center"><span className="mr-2">{item}</span><input type="radio" className="form-radio text-indigo-600" name="radio-colors2" value={index + 1}></input></label>
                  }
                })}
              </div></div></div></div>
            ))}
          </div> */}
          <div className={moduleCss.rowContainer}>
            <div className={moduleCss.firstRow}>
              <div className={moduleCss.rowTitle}>Promo Code</div>
              <div className={moduleCss.rightOptions} onClick={() => setIsPromoCodeCollapsed(!isPromoCodeCollapsed)}>
                <div className={moduleCss.rowBody}>Pick discount</div>
                <div className={moduleCss.imagePattern}>{isPromoCodeCollapsed ? <Image src={downArrow} width="14px" height="8.4px"></Image> : <Image src={expandArrow} width="8.4px" height="14px"></Image>}</div>
              </div>
            </div>
            {promoCodeList.map((option, upperIndex) => (
              <div key={upperIndex} className={moduleCss.secondRow} style={option.rowControl}><div className="block"><div className="mt-2"><div className="flex flex-col items-end">
                {option.list.map((item, index) => {
                  return <label key={index} className="inline-flex items-center"><span className="mr-2">{item}</span><input type="radio" className="form-radio text-indigo-600" name="radio-colors3" value={index + 1} defaultChecked={index === 0 ? true : false}></input></label>
                })}
              </div></div></div></div>
            ))}
          </div>
          <div className={moduleCss.rowContainer}>
            <div className={moduleCss.firstRow}>
              <div className={moduleCss.rowTitle}>Total Cost</div>
              <div className={moduleCss.rowBody}>${totalPrice}</div>
            </div>
          </div>
        </div>

        <div className={moduleCss.styledModalDeclaration}>By placing an order you agree to our <div>
          <Link href="#">
            <a>Terms</a>
          </Link> And
          <Link href="#">
            <a> Conditions</a>
          </Link></div>
          <div className={moduleCss.noticeContainer}><button onClick={() => setShowNoticeModal(true)}>Notice to Visitors</button></div>
          </div>
        <div className={moduleCss.styledModalButton} >
          <PayPalButtons
            style={{
              color: "blue",
              shape: "pill",
              //                  label: "pay",
              tagline: false,
              layout: "horizontal",
            }}
            createOrder={createOrder}
            onApprove={onApprove}
          />
        </div>
      </div>
      <Accepted show={showAcceptedModal}></Accepted>
      <Failed show={showFailedModal} onClose={() => setShowFailedModal(false)}></Failed>
      <Notice onClose={() => setShowNoticeModal(false)} show={showNoticeModal}></Notice>
    </div >
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("checkout-root")
    );
  } else {
    return null;
  }
};

export default Checkout;
