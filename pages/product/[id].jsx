import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import moduleCss from "../../styles/product.module.css";
import Image from "next/image";
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
import Big from "big.js";

const product = ({productItem}) => {
  const { publicRuntimeConfig } = getConfig();
  const router = useRouter()
  const [userState, dispatch] = useUserContext()
  const [cart, setCart] = useState([])
  const {_id, name, category, productImage, brand, amountPerQty, nutritions, productDetail, rating, discount, discountedPrice} = productItem;
  const addToFavouriteItemInfo = _id

  const [product, setProduct] = useState({
    name: name,
    productImage: productImage,
    amount: amountPerQty,
    quantity: 1,
    price: new Big(discountedPrice.$numberDecimal),
    productTotalPrice: 1,
    productDetail: productDetail,
    nutritions: nutritions,
    rating: rating,
  })

  const addToCartItemInfo = [{_id: _id, quantity: product.quantity}]
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleQuantityIncrease = (product) => {
    const newProduct = {...product};
    newProduct.quantity++;
    newProduct.productTotalPrice = newProduct.price.times(newProduct.quantity).toFixed(2);
    setProduct(newProduct);
  };

  const handleQuantityDecrease = (product) => {
    const newProduct = {...product};
    if (newProduct.quantity > 1){
      newProduct.quantity--
      newProduct.productTotalPrice = newProduct.price.times(newProduct.quantity).toFixed(2);
    }
    setProduct(newProduct);
  };

  useEffect(() => {
    const newProduct = {...product};
    newProduct.productTotalPrice = newProduct.price.times(newProduct.quantity).toFixed(2);
    setProduct(newProduct) 
  }, [])

  useEffect(() => {
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

    const res = await fetchHandler(`${publicRuntimeConfig.apiUrl}/user/${userState._id}/actions/handleCart`, 'PUT', undefined, cartArray)

    if(res.ok) {
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
  const productAPIdata = await fetchHandler(`${publicRuntimeConfig.apiUrl}/product/${context.params.id}`, "GET", context);
  if(productAPIdata.status === 401) {
    return {redirect: {destination: '/', permanent: true,}, };
  }
  return {
    props: { productItem: productAPIdata.data},
  };
}

