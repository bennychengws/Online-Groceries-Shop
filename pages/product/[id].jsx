import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import moduleCss from "../../styles/product.module.css";
import Image from "next/image";
import Link from "next/link";
import jwt_decode from "jwt-decode";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import authenticationCheck from "../../lib/authenticationCheck";

import Rating from "../../components/Rating"
import heartE from "../../images/heartEmpty.png";
import heartR from "../../images/heartRed.png";
import downArrow from "../../images/downArrow.png";
import expandArrow from "../../images/back arrow.png";
import backArrow from "../../images/back_arrow.png";
import add from "../../images/addQtyButton.png"
import reduce from "../../images/reduceQtyButton.png"

const product = ({productItem, accountInfo}) => {
  const router = useRouter()
  // console.log(accountInfo.cart)
  // console.log(accountInfo.email)
  const {_id, name, category, productImage, brand, amountPerQty, nutritions, productDetail, rating, discount, discountedPrice} = productItem;
  const addToFavouriteItemInfo = {name: name, _id: _id}

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

  const addToCartItemInfo = {name: name, _id: _id, quantity: product.quantity}
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
    for(var i = 0; i < accountInfo.favourite.length; i++) {
      if (accountInfo.favourite[i]._id === _id) {
        setIsFavourite(true)
        break;
      }
    }
  }, [])

  const handleFavourite = async() => {
    setIsFavourite(!isFavourite)
    var method = 'DELETE'
    if(!isFavourite) {
      var method = 'PUT'
    }
    // console.log("ready to fetch")
    // console.log(method)
    const res = await fetch(`http://localhost:3000/api/user/${accountInfo.email}/actions/handleFavourite`, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        addToFavouriteItemInfo
      }),
    });
    // The setIsFavourite(!isFavourite) will not change isFavourite after the end of the handleFavourite function
    if(res.ok && isFavourite===false) {
      createNotification("success", `You have added the ${name} to favourite`)
    } else if (res.ok && isFavourite===true) {
      createNotification("warning", `You have deleted the ${name} from favourite`)
    } else if(res.status === 401) {
      createNotification("error", "Sorry you are not authenticated")
      router.push("/")
    } else {
      createNotification("error", "Some errors occur, please try again")
    }
  }

  const handleCart = async() => {
    if(!isAddedToCart) {
      for(var i = 0; i < accountInfo.cart.length; i++) {
        if (accountInfo.cart[i]._id === _id) {
          createNotification("info", `${name} is already in your cart`)
          return;
        }
      }
    } else {
      createNotification("info", `${name} is already in your cart`)
      return;
    }

    setIsAddedToCart(true)
    const res = await fetch(`http://localhost:3000/api/user/${accountInfo.email}/actions/handleCart`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        addToCartItemInfo
      }),
    });
    if(res.ok) {
      createNotification("success", `You have added the ${name} to cart`)
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

  const handleTest = async() => {
    console.log(accountInfo.favourite)
    var processingArray = []
    for(var i = 0; i < accountInfo.favourite.length; i++) {
      for (const [key, value] of Object.entries(accountInfo.favourite[i])) {
        if (key === "_id")
        processingArray.push(value);
      }
      console.log(processingArray)
    }
    let url = `http://localhost:3000/api/syncFavouriteDetails/${processingArray.join('/')}`
    console.log(url)
    const res = await fetch(url);
    // const res = await fetch(`api/syncFavouriteDetails`, {
    //   method: 'GET',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     processingArray
    //   }),
    // });
  }
  
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
      <button onClick={handleTest}>Click</button>
      {/* </Link>  */}
      <NotificationContainer/>
    </div>
  );
};

export default product;

export async function getServerSideProps(context) {
  const authenticated = authenticationCheck(context)
  if (!authenticated) {
    return {redirect: {destination: '/', permanent: true,}, };
  }
  const token = context.req.cookies.auth
  const decoded = jwt_decode(token);
  const accAPIData = await fetch(`http://localhost:3000/api/user/${decoded.email}`, {
    headers: {cookie: context.req?.headers.cookie}} 
  );
  console.log(accAPIData.status)
  if(accAPIData.status === 401) {
    return {redirect: {destination: '/', permanent: true,}, };
  }
  const accountData =  await accAPIData.json();

  const productAPIdata = await fetch(`http://localhost:3000/api/product/${context.params.id}`, {
    headers: {cookie: context.req?.headers.cookie}} 
  );
  if(productAPIdata.status === 401) {
    return {redirect: {destination: '/', permanent: true,}, };
  }
  const productData = await productAPIdata.json();
  
  return {
    props: { productItem: productData, accountInfo: accountData },
  };
}

