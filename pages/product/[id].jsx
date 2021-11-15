import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import moduleCss from "../../styles/product.module.css";
import Image from "next/image";
import Link from "next/link";
import jwt_decode from "jwt-decode";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import authenticationCheck from "../../lib/authenticationCheck";
import fetchHandler from "../../lib/fetchHandler";
import { useUserContext } from "../../context/UserContext";

import Rating from "../../components/Rating"
import heartE from "../../images/heartEmpty.png";
import heartR from "../../images/heartRed.png";
import downArrow from "../../images/downArrow.png";
import expandArrow from "../../images/back arrow.png";
import backArrow from "../../images/back_arrow.png";
import add from "../../images/addQtyButton.png"
import reduce from "../../images/reduceQtyButton.png"
import getConfig from 'next/config';

const product = ({productItem}) => {
  const { publicRuntimeConfig } = getConfig();
  const router = useRouter()
  const [userState, dispatch] = useUserContext()
  const [cart, setCart] = useState([])
  // console.log(accountInfo.cart)
  // console.log(accountInfo.email)
  const {_id, name, category, productImage, brand, amountPerQty, nutritions, productDetail, rating, discount, discountedPrice} = productItem;
  const addToFavouriteItemInfo = _id

  const [product, setProduct] = useState({
    name: name,
    productImage: productImage,
    amount: amountPerQty,
    quantity: 1,
    price: discountedPrice,
    productTotalPrice: 1,
    productDetail: productDetail,
    nutritions: nutritions,
    rating: rating,
  })

  const addToCartItemInfo = [{_id: _id, quantity: product.quantity}]
  // console.log(addToCartItemInfo)

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleQuantityIncrease = (product) => {
    const newProduct = {...product};
    newProduct.quantity++;
    newProduct.productTotalPrice = newProduct.price * newProduct.quantity
    setProduct(newProduct);
  };

  const handleQuantityDecrease = (product) => {
    const newProduct = {...product};
    if (newProduct.quantity > 1){
      newProduct.quantity--
      newProduct.productTotalPrice = newProduct.price * newProduct.quantity
    }
    setProduct(newProduct);
  };

  useEffect(() => {
    const newProduct = {...product};
    newProduct.productTotalPrice = newProduct.price * newProduct.quantity
    setProduct(newProduct) 
  }, [])

  useEffect(() => {
    // for(var i = 0; i < accountInfo.favourite.length; i++) {
      for(var i = 0; i < userState?.favourite?.length; i++) {
      // if (accountInfo.favourite[i]._id === _id) {
        if (userState?.favourite[i] === _id) {
        setIsFavourite(true)
        break;
      }
    }
    setCart(userState.cart)
  }, [userState])


  const handleFavourite = async() => {
    setIsFavourite(!isFavourite)
    var newArray = userState.favourite.slice()
    var method = 'DELETE'
    if(!isFavourite) {
      var method = 'PUT'
    }
    // console.log("ready to fetch")
    // console.log(method)
    // const res = await fetch(`http://localhost:3000/api/user/${accountInfo.email}/actions/handleFavourite`, {
    //   method: method,
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     addToFavouriteItemInfo
    //   }),
    // });

    const res = await fetchHandler(`${publicRuntimeConfig.apiUrl}/user/${userState._id}/actions/handleFavourite`, method, undefined, addToFavouriteItemInfo)
    
    // The setIsFavourite(!isFavourite) will not change isFavourite after the end of the handleFavourite function
    if(res.ok && isFavourite===false) {
      
      newArray.push(addToFavouriteItemInfo)
      dispatch({type: "init_stored", value: { ...userState, favourite: newArray}})
      createNotification("success", `You have added the ${name} to Favourite`)
    } else if (res.ok && isFavourite===true) {
      let anArray = newArray.filter((otherIDs) => otherIDs !== _id)
      dispatch({type: "init_stored", value: { ...userState, favourite: anArray}})
      createNotification("warning", `You have deleted the ${name} from Favourite`)
    } else if(res.status === 401) {
      createNotification("error", "Sorry you are not authenticated")
      router.push("/")
    } else {
      createNotification("error", "Some errors occur, please try again")
    }
  }

  const handleCart = async() => {
    // if(!isAddedToCart) {
    //   for(var i = 0; i < accountInfo.cart.length; i++) {
    //     if (accountInfo.cart[i]._id === _id) {
    //       createNotification("info", `${name} is already in your cart`)
    //       return;
    //     }
    //   }
    // } else {
    //   createNotification("info", `${name} is already in your cart`)
    //   return;
    // }

    // setIsAddedToCart(true)
    // const res = await fetch(`http://localhost:3000/api/user/${accountInfo.email}/actions/handleCart`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     addToCartItemInfo
    //   }),
      // });
    let cartArray = cart
    console.log(cartArray)
    for (var m = 0; m < addToCartItemInfo.length; m++) {
      console.log("addToCartItemInfo id: " + addToCartItemInfo[m]._id)
      let duplicated = false;
      for (var n = 0; n < cartArray.length; n++) {
        console.log("cartArray id: " + cartArray[n]._id)
        if (addToCartItemInfo[m]._id === cartArray[n]._id) {
          console.log(`Quantity of ${addToCartItemInfo[m]._id} in old cartArray: `  + cartArray[n].quantity)
          console.log(`Quantity of ${addToCartItemInfo[m]._id} in addToCartItemInfo: `  + addToCartItemInfo[m].quantity)
          cartArray[n].quantity = addToCartItemInfo[m].quantity + cartArray[n].quantity
          console.log(`Quantity of ${addToCartItemInfo[m]._id} in new cartArray: `  + cartArray[n].quantity)
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

    const res = await fetchHandler(`${publicRuntimeConfig.apiUrl}/user/${userState._id}/actions/handleCart`, 'PUT', undefined, cartArray)

    if(res.ok) {
      // let newArray = userState.cart.slice()
      // let [value] = addToCartItemInfo
      // newArray.push(value)
      // dispatch({type: "init_stored", value: { ...userState, cart: newArray}})
      dispatch({type: "init_stored", value: { ...userState, cart: cartArray}})
      createNotification("success", `You have added the ${name} to Cart`)
    } else if(res.status === 401) {
      createNotification("error", "Sorry you are not authenticated")
      router.push("/")
    } else {
      createNotification("error", "Some errors occur, please try again")
    }
  }

  const createNotification = (type, message) => {
    switch (type) {
      case "success":
        return NotificationManager.success(message, "Added", 3000, () => {}, true );
      case "info":
        return NotificationManager.info(message, "Duplicated", 3000, () => {}, false );        
      case "warning":
        return NotificationManager.warning(message, 'Deleted', 3000, () => {}, false );
      case "error":
        return NotificationManager.error(message, 'Ooops', 3000, () => {}, false );        
    }
  }

  // const handleTest = async() => {
  //   console.log(accountInfo.favourite)
  //   var processingArray = []
  //   for(var i = 0; i < accountInfo.favourite.length; i++) {
  //     for (const [key, value] of Object.entries(accountInfo.favourite[i])) {
  //       if (key === "_id")
  //       processingArray.push(value);
  //     }
  //     console.log(processingArray)
  //   }
  //   let url = `http://localhost:3000/api/syncFavouriteDetails/${processingArray.join('/')}`
  //   console.log(url)
  //   const res = await fetch(url);
  // }
  
  return (
    <div className={moduleCss.container}>
      <div className={moduleCss.upperPart}>
        <div className={moduleCss.backArrowImg} onClick={() => router.back()}><Image src={backArrow} width="8.4px" height="14px"></Image></div>
        <div className={moduleCss.productImage}><Image src={`data:image/png;base64,${product.productImage}`} layout="fill" objectFit="contain" quality={100}></Image></div>
      </div>
      <div>
        <div className={moduleCss.nameAndHeart}><div>{product.name}</div><div className={moduleCss.heartImg} onClick={handleFavourite}><Image src={isFavourite ? heartR: heartE} layout="fill" objectFit="contain" quality={100}></Image></div></div>
        <div className={moduleCss.amount}>{product.amount}</div>  
        <div className={moduleCss.qtyAndPrice}><div className={moduleCss.qtyPanel}><div className={moduleCss.reduceQtyButton} onClick={() => handleQuantityDecrease(product)}><Image src={reduce} width="35px" height="35px"></Image></div><div>{product.quantity}</div><div className={moduleCss.addQtyButton} onClick={() => handleQuantityIncrease(product)}><Image src={add} width="35px" height="35px"></Image></div></div><div>${product.productTotalPrice}</div></div>
        <div className={moduleCss.productDetailPanel}><div className={moduleCss.productDetailAndExpand} onClick={() => setIsCollapsed(!isCollapsed)}><div className={moduleCss.infoTitle}>Product Detail</div><div className={moduleCss.expandButton}>{isCollapsed ? <Image src={downArrow} width="14px" height="8.4px"></Image> : <Image src={expandArrow} width="8.4px" height="14px"></Image>}</div></div><div className={moduleCss.productDetail} style={{display: isCollapsed ? "block" : "none"}}>{product.productDetail}</div></div>
        <div className={moduleCss.infoPanel}><div className={moduleCss.infoTitle}>Nutritions</div><div className={moduleCss.nutri}>{product.nutritions}</div></div>
        <div className={moduleCss.infoPanel}>
          <div className={moduleCss.infoTitle}>Review</div>
          <div><Rating>{product.rating}</Rating></div>
        </div>
      </div> 
      {/* <Link href="../cart"> */}
      <button className={moduleCss.addToBasket} onClick={handleCart}>Add To Basket</button>
      {/* <button onClick={handleTest}>Click</button> */}
      {/* </Link>  */}
      <NotificationContainer/>
    </div>
  );
};

export default product;

export async function getServerSideProps(context) {
  const { publicRuntimeConfig } = getConfig();
  const authenticated = authenticationCheck(context)
  if (!authenticated) {
    return {redirect: {destination: '/', permanent: true,}, };
  }
  // const token = context.req.cookies.auth
  // const decoded = jwt_decode(token);
  // const accAPIData = await fetch(`http://localhost:3000/api/user/${decoded.email}`, {
  //   headers: {cookie: context.req?.headers.cookie}} 
  // );
  // console.log(accAPIData.status)
  // if(accAPIData.status === 401) {
  //   return {redirect: {destination: '/', permanent: true,}, };
  // }
  // const accountData =  await accAPIData.json();
  const productAPIdata = await fetchHandler(`${publicRuntimeConfig.apiUrl}/product/${context.params.id}`, "GET", context);
  // const productAPIdata = await fetch(`http://localhost:3000/api/product/${context.params.id}`, {
  //   headers: {cookie: context.req?.headers.cookie}} 
  // );
  if(productAPIdata.status === 401) {
    return {redirect: {destination: '/', permanent: true,}, };
  }
  // const productData = await productAPIdata.json();
  return {
    props: { productItem: productAPIdata.data},
  };
}

