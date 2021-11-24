import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Image from "next/image";
import Link from "next/link";
import moduleCss from "../styles/favourite.module.css";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import NavBar from "../components/NavBar";
import cross from "../images/crossClose.png";
import cartButton from "../images/cartButton.png";
import authenticationCheck from "../lib/authenticationCheck";
import jwt_decode from "jwt-decode";
import fetchHandler from "../lib/fetchHandler";
import { useUserContext } from "../context/UserContext";
import getConfig from 'next/config';

const favourite = ({ favourite }) => {
  const { publicRuntimeConfig } = getConfig();
  const router = useRouter()
  const [userState, dispatch] = useUserContext()

  const [favouriteList, setFavouriteList] = useState([])

  useEffect(() => {
    setFavouriteList(favourite)
  }, [])

  useEffect(() => {
    setCart(userState.cart)
  }, [userState])
  const [cart, setCart] = useState([])
  const deleteItem = async (item) => {
    var newArray = userState.favourite.slice()
    const res = await fetchHandler(`${publicRuntimeConfig.apiUrl}/user/${userState._id}/actions/handleFavourite`, "DELETE", undefined, item._id);
    if (res.ok) {
      setFavouriteList(favouriteList.filter((otherItems) => otherItems._id !== item._id))
      let anArray = newArray.filter((otherIDs) => otherIDs !== item._id)
      dispatch({ type: "init_stored", value: { ...userState, favourite: anArray } })
      createNotification("warning", item)
    } else if (res.status === 401) {
      createNotification("error", null, "Sorry you are not authenticated")
      router.push("/")
    } else {
      createNotification("error", null, "Some errors occur, please try again")
    }
  }

  const addToCart = async (items) => {
    var processingArray = [...items]
    var addToCartItemInfo = []
    for (var j = 0; j < processingArray.length; j++) {
      addToCartItemInfo.push({ _id: processingArray[j]._id, quantity: 1 })
    }

    let cartArray = cart
    for (var m = 0; m < addToCartItemInfo.length; m++) {
      let duplicated = false;
      for (var n = 0; n < cartArray.length; n++) {
        if (addToCartItemInfo[m]._id === cartArray[n]._id) {
          cartArray[n].quantity = addToCartItemInfo[m].quantity + cartArray[n].quantity
          duplicated = true
          setCart(cartArray)
          break;
        }
      }
      if (!duplicated) {
        cartArray.push(addToCartItemInfo[m])
        setCart(cartArray)
      }
    }

    const res = await fetchHandler(`${publicRuntimeConfig.apiUrl}/user/${userState._id}/actions/handleCart`, "PUT", undefined, cartArray);

    if (res.ok) {
      dispatch({ type: "init_stored", value: { ...userState, cart: cartArray } })
      for (var j = 0; j < processingArray.length; j++) {
        createNotification("success", processingArray[j])
      }
    } else if (res.status === 401) {
      createNotification("error", null, "Sorry you are not authenticated")
      router.push("/")
    } else {
      createNotification("error", null, "Some errors occur, please try again")
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
      case "warning":
        return NotificationManager.error(message, 'Ooops', 3000, () => { }, false);
    }
  }

  return (
    <div>
      <div className={moduleCss.container}>
        <div className={moduleCss.title}>Favourite</div>
        <div className={moduleCss.itemContentWrapper} style={{ borderBottom: favouriteList.length === 0 ? "hidden" : "" }}>
          {favouriteList.map((item, index) => {
            return <div key={item.name} className={moduleCss.itemContent} style={{ borderBottom: index === favouriteList.length - 1 ? "hidden" : "" }}>
              <div className={moduleCss.itemImage}><Image src={`data:image/png;base64,${item.productImage}`} layout="fill" objectFit="contain" quality={100} onClick={() => router.push(`/product/${item._id}`)}></Image></div>
              <div style={{ width: "100%" }}>
                <div className={moduleCss.rowAndButton}>
                  <div className={moduleCss.name}>{item.name}</div>
                  <div className={moduleCss.cross} onClick={() => deleteItem(item)}><Image src={cross} layout="fill" objectFit="cover" quality={100}></Image></div>
                </div>
                <div className={moduleCss.amount}>{item.amountPerQty}</div>
                <div className={moduleCss.rowAndButton}>
                  <div style={{ fontWeight: "bold" }}>${item.discountedPrice.$numberDecimal}</div>
                  <div className={moduleCss.carts} onClick={() => addToCart([item])}><Image src={cartButton} layout="fill" objectFit="contain" quality={100}></Image></div>
                </div>
              </div>
            </div>
          })}
        </div>
        <button className={moduleCss.addAllToCart} onClick={() => addToCart(favouriteList)} style={{ position: favouriteList.length === 0 ? "fixed" : "", bottom: favouriteList.length === 0 ? "13vh" : "0" }}>
          Add All To Cart
        </button>
      </div>
      <NotificationContainer />
      <NavBar />
    </div>
  );
};

export default favourite;

export async function getServerSideProps(context) {
  const { publicRuntimeConfig } = getConfig();
  //Check authentication and get user account information 
  //As well as the favourite product ID 
  const authenticated = authenticationCheck(context)
  if (!authenticated) {
    return { redirect: { destination: '/', permanent: true, }, };
  }
  const token = context.req.cookies.auth
  const decoded = jwt_decode(token);
  console.log("decoded: " + decoded.sub)
  const favouriteAPIData = await fetchHandler(`${publicRuntimeConfig.apiUrl}/user/${decoded.sub}/actions/handleFavourite`, "GET", context)
  console.log(`favouriteAPI status: ${favouriteAPIData.status}`)
  if (favouriteAPIData.status === 401) {
    return { redirect: { destination: '/', permanent: true, }, };
  }
  return {
    props: { favourite: favouriteAPIData.data },
  };
}