import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Image from "next/image";
import moduleCss from "../styles/cart.module.css";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import authenticationCheck from "../lib/authenticationCheck";
import { clientAuthenticationCheck } from "../lib/clientAuthenticationCheck";
import NavBar from "../components/NavBar";
import Checkout from "../components/Checkout";
import Failed from "../components/Failed";
import Accepted from "../components/Accepted";
import cross from "../images/crossClose.png";
import add from "../images/addQtyButton.png";
import reduce from "../images/reduceQtyButton.png";
import bellPR from "../images/bellPepperR.png";
import eggCR from "../images/eggChickenRed.png";
import ginger from "../images/ginger.png";
import banana from "../images/banana.png";
// import router from "next/router";
import jwt_decode from "jwt-decode";
import fetchHandler from "../lib/fetchHandler";
import { useUserContext } from "../context/UserContext";
import getConfig from 'next/config';

const cart = ({ cart }) => {
  const router = useRouter()
  const { publicRuntimeConfig } = getConfig();
  const [showModal, setShowModal] = useState(false);
  const [totalPriceCount, setTotalPriceCount] = useState(0);

  // const [cartList, setCartList] = useState([
  //   {
  //     name: "Bell Pepper Red",
  //     productImage: (
  //       <Image src={bellPR} width="93px" height="63px"></Image>
  //     ),
  //     amount: "700g",
  //     price: 13,
  //     quantity: 1,
  //     productTotalPrice: 1
  //   },
  //   {
  //     name: "Egg Chicken Red",
  //     productImage: (
  //       <Image src={eggCR} width="93px" height="63px"></Image>
  //     ),
  //     amount: "4pcs",
  //     price: 4,
  //     quantity: 1,
  //     productTotalPrice: 1
  //   },
  //   {
  //     name: "Ginger",
  //     productImage: (
  //       <Image src={ginger} width="93px" height="63px"></Image>
  //     ),
  //     amount: "700g",
  //     price: 13,
  //     quantity: 1,
  //     productTotalPrice: 1
  //   },
  //   {
  //     name: "Organic Bananas",
  //     productImage: <Image src={banana} width="93" height="63px"></Image>,
  //     amount: "7pcs",
  //     price: 35,
  //     quantity: 1,
  //     productTotalPrice: 1
  //   },
  // ])
  const [userState, dispatch] = useUserContext()
  const [cartList, setCartList] = useState([])

  useEffect(() => {
    let dummyArray = [...cart]
    dummyArray.map((item) => {
      item.productTotalPrice = item.discountedPrice * item.quantity
    })
    setCartList(dummyArray)
  }, [])

  // console.log(cartList)

  const handleQuantityIncrease = (index) => {
    const newCartList = [...cartList];

    newCartList[index].quantity++;

    setCartList(newCartList);
    newCartList[index].productTotalPrice = newCartList[index].discountedPrice * newCartList[index].quantity
    calculateTotal();
  };

  const handleQuantityDecrease = (index) => {
    const newCartList = [...cartList];
    if (newCartList[index].quantity > 1) {
      newCartList[index].quantity--;
    }
    setCartList(newCartList);
    newCartList[index].productTotalPrice = newCartList[index].discountedPrice * newCartList[index].quantity
    calculateTotal();
  };

  const calculateTotal = () => {
    const totalPrice = cartList.reduce((total, item) => {
      return total + item.productTotalPrice;
    }, 0);

    setTotalPriceCount(totalPrice);
    console.log("cT")
  };

  useEffect(() => {
    calculateTotal();
    // console.log(cartList)
  })

  useEffect(async () => {
    const isAuthenticated = await clientAuthenticationCheck()
    if (!isAuthenticated) router.push("/")
  }, [calculateTotal])

  const deleteItem = async (item) => {
    var newArray = userState.cart.slice()
    // const itemToBeDeleted = {_id: item._id, quantity: item.quantity} 
    // const res = await fetchHandler(`http://localhost:3000/api/user/${userState._id}/actions/handleCart`, "DELETE", undefined, itemToBeDeleted);
    const res = await fetchHandler(`${publicRuntimeConfig.apiUrl}/user/${userState._id}/actions/handleCart`, "DELETE", undefined, item._id);
    if (res.ok) {
      // setCartList(cartList.filter((otherItems) => otherItems._id !== item._id))
      // let anArray = newArray.filter((otherIDs) => otherIDs._id !== item._id)
      // dispatch({type: "init_stored", value: { ...userState, cart: anArray}})
      setCartList(cartList.filter((otherItems) => otherItems._id !== item._id))
      let anArray = newArray.filter((otherIDs) => otherIDs._id !== item._id)
      dispatch({ type: "init_stored", value: { ...userState, cart: anArray } })
      createNotification("warning", item)
    } else if (res.status === 401) {
      createNotification("error", null, "Sorry you are not authenticated")
      router.push("/")
    } else {
      createNotification("error", null, "Some errors occur, please try again")
    }
    // createNotification(item)
  }

  const handleCheckout = () => {
    if (totalPriceCount > 0) {
      setShowModal(true)
      console.log("checkout opened")
    } else {
      console.log("empty cart")
      createNotification("omitted")
    }
  }

  const createNotification = (type, item, message) => {
    switch (type) {
      case "info":
        return NotificationManager.info(`${item.name} is already in your cart`, "Duplicated");
      case "success":
        return NotificationManager.success(`You have added the ${item.name} to Cart`, "Added to Cart");
      case "warning":
        return NotificationManager.warning(`You have deleted the ${item.name} from Favourite`, 'Deleted', 3000);
      case "error":
        return NotificationManager.error(message, 'Ooops', 3000, () => { }, false);
      case "omitted":
        return NotificationManager.warning(`Please make sure that your cart is not empty`, 'Empty Cart');
    }
  }
  // style={{ borderBottom: index === favouriteList.length - 1 ? "hidden" : "" }}
  return (
    <div>
      <div className={moduleCss.container}>
        <div className={moduleCss.title}>My Cart</div>
        <div className={moduleCss.itemContentWrapper} style={{ borderBottom: cartList.length === 0 ? "hidden" : "" }}>
          {cartList.map((item, index) => {
            return <div key={item._id} className={moduleCss.itemContent} style={{ borderBottom: index === cartList.length - 1 ? "hidden" : "" }}><div className={moduleCss.imgAndDescription}><div className={moduleCss.itemImage}><Image src={`data:image/png;base64,${item.productImage}`} layout="fill" objectFit="contain" quality={100} onClick={() => router.push(`/product/${item._id}`)}></Image></div><div><div className={moduleCss.name}>{item.name}</div><div className={moduleCss.amount}>{item.amountPerQty}</div><div className={moduleCss.quantityContainer}><div className={moduleCss.qtyControlIcon} onClick={() => handleQuantityDecrease(index)}><Image src={reduce} width="35px" height="35px"></Image></div><div className={moduleCss.Qty}>{item.quantity}</div><div className={moduleCss.qtyControlIcon} onClick={() => handleQuantityIncrease(index)}><Image src={add} width="35px" height="35px"></Image></div></div></div></div><div className={moduleCss.crossAndPrice}><div style={{ cursor: "pointer" }} onClick={() => deleteItem(item)}><Image src={cross} width="14.16px" height="14px"></Image></div><div className={moduleCss.price}>${item.productTotalPrice}</div><div></div></div></div>
          })}
          {/* {cartList.map((item, index) => {
            if (index === cartList.length - 1) {
              return <div key={item._id} className={moduleCss.itemContent} style={{ borderBottom: "hidden" }}><div className={moduleCss.imgAndDescription}><div className={moduleCss.itemImage}><Image src={`data:image/png;base64,${item.productImage}`} layout="fill" objectFit="contain" quality={100} onClick={() => router.push(`/product/${item._id}`)}></Image></div><div><div className={moduleCss.name}>{item.name}</div><div className={moduleCss.amount}>{item.amountPerQty}</div><div className={moduleCss.quantityContainer}><div className={moduleCss.qtyControlIcon} onClick={() => handleQuantityDecrease(index)}><Image src={reduce} width="35px" height="35px"></Image></div><div className={moduleCss.Qty}>{item.quantity}</div><div className={moduleCss.qtyControlIcon} onClick={() => handleQuantityIncrease(index)}><Image src={add} width="35px" height="35px"></Image></div></div></div></div><div className={moduleCss.crossAndPrice}><div style={{ cursor: "pointer" }} onClick={() => deleteItem(item)}><Image src={cross} width="14.16px" height="14px"></Image></div><div className={moduleCss.price}>${item.productTotalPrice}</div><div></div></div></div>
            } else {
              return <div key={item._id} className={moduleCss.itemContent}><div className={moduleCss.imgAndDescription}><div className={moduleCss.itemImage}><Image src={`data:image/png;base64,${item.productImage}`} layout="fill" objectFit="contain" quality={100} onClick={() => router.push(`/product/${item._id}`)}></Image></div><div><div className={moduleCss.name}>{item.name}</div><div className={moduleCss.amount}>{item.amountPerQty}</div><div className={moduleCss.quantityContainer}><div className={moduleCss.qtyControlIcon} onClick={() => handleQuantityDecrease(index)}><Image src={reduce} width="35px" height="35px"></Image></div><div className={moduleCss.Qty}>{item.quantity}</div><div className={moduleCss.qtyControlIcon} onClick={() => handleQuantityIncrease(index)}><Image src={add} width="35px" height="35px"></Image></div></div></div></div><div className={moduleCss.crossAndPrice}><div style={{ cursor: "pointer" }} onClick={() => deleteItem(item)}><Image src={cross} width="14.16px" height="14px"></Image></div><div className={moduleCss.price}>${item.productTotalPrice}</div><div></div></div></div>
            }
          })} */}
        </div>
        <Checkout onClose={() => setShowModal(false)} show={showModal} totalPrice={totalPriceCount} cartList={cartList}></Checkout>
        <button className={moduleCss.checkOut} onClick={handleCheckout} style={{ position: cartList.length === 0 ? "fixed" : "", bottom: cartList.length === 0 ? "13vh" : "0" }}><div></div>Go to Checkout<div className={moduleCss.totalPrice}>${totalPriceCount}</div></button>
      </div>
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

//   return (
//     <div>
//       <div className={moduleCss.container}>
//         <div className={moduleCss.title}>My Cart</div>
//         <div className={moduleCss.itemContentWrapper} style={{ borderBottom: cartList.length === 0 ? "hidden" : "" }}>
//           {cartList.map((item, index) => {
//             if (index === cartList.length - 1) {
//               return <div key={item.name} className={moduleCss.itemContent} style={{ borderBottom: "hidden" }}><div className={moduleCss.imgAndDescription}><div className={moduleCss.itemImage}>{item.productImage}</div><div><div className={moduleCss.name}>{item.name}</div><div className={moduleCss.amount}>{item.amount}</div><div className={moduleCss.quantityContainer}><div className={moduleCss.qtyControlIcon} onClick={() => handleQuantityDecrease(index)}><Image src={reduce} width="35px" height="35px"></Image></div><div className={moduleCss.Qty}>{item.quantity}</div><div className={moduleCss.qtyControlIcon} onClick={() => handleQuantityIncrease(index)}><Image src={add} width="35px" height="35px"></Image></div></div></div></div><div className={moduleCss.crossAndPrice}><div style={{ cursor: "pointer" }} onClick={() => deleteItem(item)}><Image src={cross} width="14.16px" height="14px"></Image></div><div className={moduleCss.price}>${item.productTotalPrice}</div><div></div></div></div>
//             } else {
//               return <div key={item.name} className={moduleCss.itemContent}><div className={moduleCss.imgAndDescription}><div className={moduleCss.itemImage}>{item.productImage}</div><div><div className={moduleCss.name}>{item.name}</div><div className={moduleCss.amount}>{item.amount}</div><div className={moduleCss.quantityContainer}><div className={moduleCss.qtyControlIcon} onClick={() => handleQuantityDecrease(index)}><Image src={reduce} width="35px" height="35px"></Image></div><div className={moduleCss.Qty}>{item.quantity}</div><div className={moduleCss.qtyControlIcon} onClick={() => handleQuantityIncrease(index)}><Image src={add} width="35px" height="35px"></Image></div></div></div></div><div className={moduleCss.crossAndPrice}><div style={{ cursor: "pointer" }} onClick={() => deleteItem(item)}><Image src={cross} width="14.16px" height="14px"></Image></div><div className={moduleCss.price}>${item.productTotalPrice}</div><div></div></div></div>
//             }
//           })}
//         </div>
//         <Checkout onClose={() => setShowModal(false)} show={showModal}></Checkout>
//         <button className={moduleCss.checkOut} onClick={() => setShowModal(true)} style={{ position: cartList.length === 0 ? "fixed" : "", bottom: cartList.length === 0 ? "13vh" : "0" }}><div></div>Go to Checkout<div className={moduleCss.totalPrice}>${totalPriceCount}</div></button>
//       </div>
//       <NotificationContainer/>
//       <NavBar />
//       {/* <Failed
//         onClose={() => setShowModal(false)}
//         show={showModal}
//       >
//       </Failed> */}
//       {/* <Accepted
//         show={showModal}
//       >
//       </Accepted> */}
//     </div>
//   );
// };

export default cart;

export async function getServerSideProps(context) {
  const { publicRuntimeConfig } = getConfig();
  const authenticated = authenticationCheck(context)
  if (!authenticated) {
    return { redirect: { destination: '/', permanent: true, }, };
  }
  const token = context.req.cookies.auth
  const decoded = jwt_decode(token);
  console.log("decoded: " + decoded.sub)
  const cartAPIData = await fetchHandler(`${publicRuntimeConfig.apiUrl}/user/${decoded.sub}/actions/handleCart`, "GET", context)
  console.log(`cartAPI status: ${cartAPIData.status}`)
  if (cartAPIData.status === 401) {
    return { redirect: { destination: '/', permanent: true, }, };
  }
  return {
    props: { cart: cartAPIData.data },
  };
}