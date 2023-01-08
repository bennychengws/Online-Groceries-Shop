import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import moduleCss from "../styles/cart.module.scss";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import authenticationCheck from "../lib/authenticationCheck";
import { clientAuthenticationCheck } from "../lib/clientAuthenticationCheck";
import NavBar from "../components/NavBar";
import Checkout from "../components/Checkout";
import cross from "../images/crossClose.png";
import add from "../images/addQtyButton.png";
import reduce from "../images/reduceQtyButton.png";
import jwt_decode from "jwt-decode";
import fetchHandler from "../lib/fetchHandler";
import { useUserContext } from "../context/UserContext";
import getConfig from "next/config";
import Big from "big.js";

const cart = ({ cart }) => {
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();
  const [showModal, setShowModal] = useState(false);
  const [totalPriceCount, setTotalPriceCount] = useState(0);
  const [userState, dispatch] = useUserContext();
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    let dummyArray = [...cart];
    dummyArray.map((item) => {
      let price = new Big(item.discountedPrice.$numberDecimal);
      item.productTotalPrice = price.times(item.quantity).toFixed(2);
    });
    setCartList(dummyArray);
  }, []);

  const handleQuantityIncrease = (index) => {
    const newCartList = [...cartList];

    newCartList[index].quantity++;

    setCartList(newCartList);
    let price = new Big(newCartList[index].discountedPrice.$numberDecimal);
    newCartList[index].productTotalPrice = price
      .times(newCartList[index].quantity)
      .toFixed(2);
    calculateTotal();
  };

  const handleQuantityDecrease = (index) => {
    const newCartList = [...cartList];
    if (newCartList[index].quantity > 1) {
      newCartList[index].quantity--;
    }
    setCartList(newCartList);
    let price = new Big(newCartList[index].discountedPrice.$numberDecimal);
    newCartList[index].productTotalPrice = price
      .times(newCartList[index].quantity)
      .toFixed(2);
    calculateTotal();
  };

  const calculateTotal = () => {
    const totalPrice = cartList.reduce((total, item) => {
      let originalTotal = new Big(total);
      return originalTotal.plus(item.productTotalPrice).toFixed(2);
    }, 0);

    setTotalPriceCount(totalPrice);
    console.log("cT");
  };

  useEffect(() => {
    calculateTotal();
  });

  useEffect(() => {async () => {
    const isAuthenticated = await clientAuthenticationCheck();
    if (!isAuthenticated) router.push("/");
  }}, [calculateTotal]);

  const deleteItem = async (item) => {
    var newArray = userState.cart.slice();
    const res = await fetchHandler(
      `${publicRuntimeConfig.apiUrl}/user/${userState._id}/actions/handleCart`,
      "DELETE",
      undefined,
      item._id
    );
    if (res.ok) {
      setCartList(cartList.filter((otherItems) => otherItems._id !== item._id));
      let anArray = newArray.filter((otherIDs) => otherIDs._id !== item._id);
      dispatch({ type: "init_stored", value: { ...userState, cart: anArray } });
      createNotification("warning", item);
    } else if (res.status === 401) {
      createNotification("error", null, "Sorry you are not authenticated");
      router.push("/");
    } else {
      createNotification("error", null, "Some errors occur, please try again");
    }
  };

  const handleCheckout = () => {
    if (cartList.length == 0) {
      console.log("empty cart");
      createNotification("omitted");      
    } else if (userState.address.streetAddressLine1 == "" ) {
      console.log("empty address");
      createNotification("empty address");
    } else if (totalPriceCount <= 0) {
      console.log("non-positive price");
      createNotification("non-positive price");
    } else {
      setShowModal(true);
      console.log("checkout opened");      
    } 
    
  };

  const createNotification = (type, item, message) => {
    switch (type) {
      case "info":
        return NotificationManager.info(
          `${item.name} is already in your cart`,
          "Duplicated"
        );
      case "success":
        return NotificationManager.success(
          `You have added the ${item.name} to Cart`,
          "Added to Cart"
        );
      case "warning":
        return NotificationManager.warning(
          `You have deleted the ${item.name} from Cart`,
          "Deleted",
          3000
        );
      case "error":
        return NotificationManager.error(
          message,
          "Ooops",
          3000,
          () => {},
          false
        );
      case "omitted":
        return NotificationManager.warning(
          `Please make sure that your cart is not empty`,
          "Empty Cart"
        );
      case "empty address":
        return NotificationManager.warning(
          `Please make sure that your delivery address is not empty`,
          "Empty Address"
        );
      case "non-positive price":
        return NotificationManager.warning(
          `Please contact administrator for non-positive total price calculated`,
          `non-positive price`
        );        
    }
  };

  return (
    <div>
      <div className={moduleCss.container}>
        <h1>My Cart</h1>
        <div
          className={moduleCss.itemContentWrapper}
          style={{ borderBottom: cartList.length === 0 ? "hidden" : "" }}
        >
          {cartList.map((item, index) => {
            return (
              <div
                key={item._id}
                className={moduleCss.itemContent}
                style={{
                  borderBottom: index === cartList.length - 1 ? "hidden" : "",
                }}
              >
                <div className={moduleCss.imgAndDescription}>
                  <div className={moduleCss.itemImage}>
                    <Image
                      src={`data:image/png;base64,${item.productImage}`}
                      layout="fill"
                      objectFit="contain"
                      quality={100}
                      onClick={() => router.push(`/product/${item._id}`)}
                    ></Image>
                  </div>
                  <div>
                    <div className={moduleCss.name}>{item.name}</div>
                    <div className={moduleCss.amount}>{item.amountPerQty}</div>
                    <div className={moduleCss.quantityContainer}>
                      <div
                        className={moduleCss.qtyControlIcon}
                        onClick={() => handleQuantityDecrease(index)}
                      >
                        <Image src={reduce} width="35px" height="35px"></Image>
                      </div>
                      <div className={moduleCss.Qty}>{item.quantity}</div>
                      <div
                        className={moduleCss.qtyControlIcon}
                        onClick={() => handleQuantityIncrease(index)}
                      >
                        <Image src={add} width="35px" height="35px"></Image>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={moduleCss.crossAndPrice}>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteItem(item)}
                  >
                    <Image src={cross} width="14.16px" height="14px"></Image>
                  </div>
                  <div>
                    ${item.productTotalPrice}
                  </div>
                  <div></div>
                </div>
              </div>
            );
          })}
          {/* {cartList.map((item, index) => {
            if (index === cartList.length - 1) {
              return <div key={item._id} className={moduleCss.itemContent} style={{ borderBottom: "hidden" }}><div className={moduleCss.imgAndDescription}><div className={moduleCss.itemImage}><Image src={`data:image/png;base64,${item.productImage}`} layout="fill" objectFit="contain" quality={100} onClick={() => router.push(`/product/${item._id}`)}></Image></div><div><div className={moduleCss.name}>{item.name}</div><div className={moduleCss.amount}>{item.amountPerQty}</div><div className={moduleCss.quantityContainer}><div className={moduleCss.qtyControlIcon} onClick={() => handleQuantityDecrease(index)}><Image src={reduce} width="35px" height="35px"></Image></div><div className={moduleCss.Qty}>{item.quantity}</div><div className={moduleCss.qtyControlIcon} onClick={() => handleQuantityIncrease(index)}><Image src={add} width="35px" height="35px"></Image></div></div></div></div><div className={moduleCss.crossAndPrice}><div style={{ cursor: "pointer" }} onClick={() => deleteItem(item)}><Image src={cross} width="14.16px" height="14px"></Image></div><div className={moduleCss.price}>${item.productTotalPrice}</div><div></div></div></div>
            } else {
              return <div key={item._id} className={moduleCss.itemContent}><div className={moduleCss.imgAndDescription}><div className={moduleCss.itemImage}><Image src={`data:image/png;base64,${item.productImage}`} layout="fill" objectFit="contain" quality={100} onClick={() => router.push(`/product/${item._id}`)}></Image></div><div><div className={moduleCss.name}>{item.name}</div><div className={moduleCss.amount}>{item.amountPerQty}</div><div className={moduleCss.quantityContainer}><div className={moduleCss.qtyControlIcon} onClick={() => handleQuantityDecrease(index)}><Image src={reduce} width="35px" height="35px"></Image></div><div className={moduleCss.Qty}>{item.quantity}</div><div className={moduleCss.qtyControlIcon} onClick={() => handleQuantityIncrease(index)}><Image src={add} width="35px" height="35px"></Image></div></div></div></div><div className={moduleCss.crossAndPrice}><div style={{ cursor: "pointer" }} onClick={() => deleteItem(item)}><Image src={cross} width="14.16px" height="14px"></Image></div><div className={moduleCss.price}>${item.productTotalPrice}</div><div></div></div></div>
            }
          })} */}
        </div>
        <button
          className={moduleCss.checkOut}
          onClick={handleCheckout}
          style={{
            position: cartList.length === 0 ? "fixed" : "",
            bottom: cartList.length === 0 ? "13vh" : "0",
          }}
        >
          <div></div>Go to Checkout
          <div className={moduleCss.totalPrice}>${totalPriceCount}</div>
        </button>
      </div>
      <Checkout
        onClose={() => setShowModal(false)}
        show={showModal}
        totalPrice={totalPriceCount}
        cartList={cartList}
      ></Checkout>      
      <NotificationContainer />
      <NavBar />
      {/* <Failed
        onClose={() => setShowModal(false)}
        show={showModal}
      >
      </Failed> */}
      {/* <Accepted
        show={showModal}
      >
      </Accepted> */}
    </div>
  );
};

export default cart;

export async function getServerSideProps(context) {
  const { publicRuntimeConfig } = getConfig();
  const authenticated = authenticationCheck(context);
  if (!authenticated) {
    return { redirect: { destination: "/", permanent: true } };
  }
  const token = context.req.cookies.auth;
  const decoded = jwt_decode(token);
  console.log("decoded: " + decoded.sub);
  const cartAPIData = await fetchHandler(
    `${publicRuntimeConfig.apiUrl}/user/${decoded.sub}/actions/handleCart`,
    "GET",
    context
  );
  console.log(`cartAPI status: ${cartAPIData.status}`);
  if (cartAPIData.status === 401) {
    return { redirect: { destination: "/", permanent: true } };
  }
  return {
    props: { cart: cartAPIData.data },
  };
}
