import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Image from "next/image";
import Link from "next/link";
import moduleCss from "../styles/favourite.module.css";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import NavBar from "../components/NavBar";
import backArrow from "../images/back arrow.png";
import cross from "../images/crossClose.png";
import cartButton from "../images/cartButton.png";
import coca from "../images/coca_cola.png";
import pepsi from "../images/pepsi.png";
import dietCoke from "../images/diet_coke.png";
import appleJuice from "../images/apple_juice.png";
import sprite from "../images/sprite_can.png";
// import authenticationCheck from "../lib/authenticationCheck";
import jwt_decode from "jwt-decode";


const favourite = ({ accountInfo, favouriteProductInfo }) => {
  // const [favouriteList, setFavouriteList] = useState([
  //   {
  //     name: "Diet Coke",
  //     productImage: (
  //       <Image src={dietCoke} width="44.49px" height="89.36px"></Image>
  //     ),
  //     amount: "355ml",
  //     price: 7,
  //   },
  //   {
  //     name: "Sprite Can",
  //     productImage: (
  //       <Image src={sprite} width="51.68px" height="91.77px"></Image>
  //     ),
  //     amount: "325ml",
  //     price: 6.5,
  //   },
  //   {
  //     name: "Apple & Grape Juice",
  //     productImage: (
  //       <Image src={appleJuice} width="81.68px" height="93.21px"></Image>
  //     ),
  //     amount: "2L",
  //     price: 15,
  //   },
  //   {
  //     name: "Coca Cola Can",
  //     productImage: <Image src={coca} width="48.82px" height="90.44px"></Image>,
  //     amount: "325ml",
  //     price: 6.8,
  //   },
  //   {
  //     name: "Pepsi Can",
  //     productImage: (
  //       <Image src={pepsi} width="49.52px" height="94.59px"></Image>
  //     ),
  //     amount: "330ml",
  //     price: 6.8,
  //   },
  // ])
  const router = useRouter()

  const [favouriteList, setFavouriteList] = useState([]) 

  useEffect(() => {
    setFavouriteList(favouriteProductInfo)
  }, [])
  
  const [addToCartList , setAddToCartList] = useState([]) 

  const [showModal, setShowModal] = useState(false);

  const deleteItem = async(item) => {
    const addToFavouriteItemInfo = {name: item.name, _id: item._id}
    const res = await fetch(`http://localhost:3000/api/user/${accountInfo.email}/actions/handleFavourite`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        addToFavouriteItemInfo
      }),
    });
    if(res.ok) {
      createNotification("warning", item)
    } else if(res.status === 401) {
      createNotification("error", null, "Sorry you are not authenticated")
      router.push("/")
    } else {
      createNotification("error", null, "Some errors occur, please try again")
    }
    setFavouriteList(favouriteList.filter((otherItems) => otherItems.name !== item.name))
  }

  const addToCart = async(items) => {
    var processingArray = [...items]
    // for (var i = 0; i < accountInfo.cart.length; i++) {
    //   for (var j = 0; j < processingArray.length; j++) {
    //     if (accountInfo.cart[i]._id === processingArray[j]._id) {
    //       createNotification("info", processingArray[j])
    //       if (processingArray.length === 1) {
    //         return;
    //       } else if (processingArray.length > 1) {
    //         processingArray.filter((otherItems) => otherItems.name !== processingArray[j].name)
    //         // processingArray.splice(j, 1)
    //       } else {
    //         createNotification("error", null, "Some errors occur, please try again")
    //       }
    //     }
    //   }
    // }

    // for (var k = 0; k < addToCartList.length; k++) {
    //   for (var m = 0; m < processingArray.length; m++) {
    //     if (addToCartList.includes(processingArray[m]._id)) {
    //       createNotification("info", processingArray[m])
    //       if (processingArray.length === 1) {
    //         return;
    //       } else if (processingArray.length > 1) {
    //         processingArray.filter((otherItems) => otherItems.name !== processingArray[m].name)
    //       } else {
    //         createNotification("error", null, "Some errors occur, please try again")
    //       }
    //     }
    //   }
    // }

    var addToCartItemInfo = []
    for (var j = 0; j < processingArray.length; j++) {
      addToCartItemInfo.push({name: processingArray[j].name, _id: processingArray[j]._id, quantity: 1})
    } 

    const res = await fetch(`http://localhost:3000/api/user/${accountInfo.email}/actions/handleCart`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        addToCartItemInfo
      }),
    });
    if(res.ok) {
      for (var j = 0; j < processingArray.length; j++) {
        createNotification("success", processingArray[j])
      }
    } else if(res.status === 401) {
      createNotification("error", null, "Sorry you are not authenticated")
      router.push("/")
    } else {
      createNotification("error", null, "Some errors occur, please try again")
    }

    var idList = []
    for (var j = 0; j < processingArray.length; j++) { 
      idList.push(processingArray[j]._id)
    }
    // setAddToCartList(addToCartList => [...addToCartList, ...idList])
  }


  // console.log(addToCartList)



  const createNotification = (type, item, message) => {
      switch (type) {
        case "info":
          return NotificationManager.info(`${item.name} is already in your cart`, "Duplicated");
        case "success":
          return NotificationManager.success(`You have added the ${item.name} to Cart`, "Added to Cart");
        case "warning":
          return NotificationManager.warning(`You have deleted the ${item.name} from Favourite`, 'Deleted', 3000);
        case "warning":
          return NotificationManager.error(message, 'Ooops', 3000, () => {}, false );   
      }
  }

  return (
    <div>
      <div className={moduleCss.container}>
        <div className={moduleCss.title}>Favourite</div>
        <div className={moduleCss.itemContentWrapper} style={{borderBottom: favouriteList.length === 0? "hidden" : ""}}>
          {favouriteList.map((item, index) => {
            if (index === favouriteList.length-1) {
              return <div key={item.name} className={moduleCss.itemContent} style={{borderBottom: "hidden"}}>
                        <div className={moduleCss.itemImage}><Image src={`data:image/png;base64,${item.productImage}`} layout="fill" objectFit="contain" quality={100} onClick={() => router.push(`/product/${item._id}`)}></Image></div>
                        <div style={{width: "100%"}}>
                          <div className={moduleCss.rowAndButton}>
                            <div className={moduleCss.name}>{item.name}</div>
                            <div className={moduleCss.cross} onClick={() => deleteItem(item)}><Image src={cross}  layout="fill" objectFit="cover" quality={100}></Image></div>
                          </div>
                          <div className={moduleCss.amount}>{item.AmountPerQty}</div>
                          <div className={moduleCss.rowAndButton}>
                            <div style={{fontWeight: "bold"}}>${item.markedPrice}</div>
                            <div className={moduleCss.carts} onClick={() => addToCart([item])}><Image src={cartButton}  layout="fill" objectFit="contain" quality={100}></Image></div>
                          </div>
                        </div>
                      </div>
            } else {
              return <div key={item.name} className={moduleCss.itemContent}>
                        <div className={moduleCss.itemImage}><Image src={`data:image/png;base64,${item.productImage}`} layout="fill" objectFit="contain" quality={100} onClick={() => router.push(`/product/${item._id}`)}></Image></div>
                        <div style={{width: "100%"}}>
                          <div className={moduleCss.rowAndButton}>
                            <div className={moduleCss.name}>{item.name}</div>
                            <div className={moduleCss.cross} onClick={() => deleteItem(item)}><Image src={cross}  layout="fill" objectFit="cover" quality={100}></Image></div>
                          </div>
                          <div className={moduleCss.amount}>{item.AmountPerQty}</div>
                          <div className={moduleCss.rowAndButton}>
                            <div style={{fontWeight: "bold"}}>${item.markedPrice}</div>
                            <div className={moduleCss.carts} onClick={() => addToCart([item])}><Image src={cartButton}  layout="fill" objectFit="contain" quality={100}></Image></div>
                          </div>
                        </div>
                      </div>
            }
          })}
        </div>
        {/* <Link href="../cart"> */}
          <button className={moduleCss.addAllToCart} onClick={() => addToCart(favouriteList)} style={{position: favouriteList.length === 0? "fixed" : "", bottom: favouriteList.length === 0? "13vh" : "0" }}>
            Add All To Cart
          </button>
        {/* </Link> */}
      </div>
      <NotificationContainer/>
      <NavBar />
    </div>
  );
};

export default favourite;

export async function getServerSideProps(context) {
  //Check authentication and get user account information 
  //As well as the favourite product ID 
  // const authenticated = authenticationCheck(context)
  // if (!authenticated) {
  //   return {redirect: {destination: '/', permanent: true,}, };
  // }
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

  //Get the favourite product information by its ID
  var processingArray = []
  for(var i = 0; i < accountData.favourite.length; i++) {
    for (const [key, value] of Object.entries(accountData.favourite[i])) {
      if (key === "_id")
      processingArray.push(value);
    }
    // console.log(processingArray)
  }
  var urlForFavourite = `http://localhost:3000/api/syncFavouriteDetails/${processingArray.join('/')}`
  // console.log(url)
  const productAPIdata = await fetch(urlForFavourite, {
    headers: {cookie: context.req?.headers.cookie}} 
  );
  console.log(productAPIdata.status)
  if(productAPIdata.status === 401) {
    return {redirect: {destination: '/', permanent: true,}, };
  }
  const favouriteProductData = await productAPIdata.json();

  return {
    props: { accountInfo: accountData, favouriteProductInfo: favouriteProductData },
  };
}