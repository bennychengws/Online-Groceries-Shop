import { useState } from "react";
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


const favourite = () => {
  const [favouriteList, setFavouriteList] = useState([
    {
      name: "Diet Coke",
      productImage: (
        <Image src={dietCoke} width="44.49px" height="89.36px"></Image>
      ),
      amount: "355ml",
      price: 7,
    },
    {
      name: "Sprite Can",
      productImage: (
        <Image src={sprite} width="51.68px" height="91.77px"></Image>
      ),
      amount: "325ml",
      price: 6.5,
    },
    {
      name: "Apple & Grape Juice",
      productImage: (
        <Image src={appleJuice} width="81.68px" height="93.21px"></Image>
      ),
      amount: "2L",
      price: 15,
    },
    {
      name: "Coca Cola Can",
      productImage: <Image src={coca} width="48.82px" height="90.44px"></Image>,
      amount: "325ml",
      price: 6.8,
    },
    {
      name: "Pepsi Can",
      productImage: (
        <Image src={pepsi} width="49.52px" height="94.59px"></Image>
      ),
      amount: "330ml",
      price: 6.8,
    },
  ])
  
  const [addToCartList , setAddToCartList] = useState([]) 

  const [showModal, setShowModal] = useState(false);
  const deleteItem = (item) => {
    setFavouriteList(favouriteList.filter((otherItems) => otherItems.name !== item.name))
    createNotification("warning", item)
  }

  const addToCart = (item) => {
    setAddToCartList(addToCartList => [...addToCartList, item])
    setFavouriteList(favouriteList.filter((listItem) => listItem.name !== item.name))
    createNotification("success", item)
    console.log(addToCartList)
  }

  const createNotification = (type, item) => {
      switch (type) {
        case "success":
          return NotificationManager.success(`You have added the ${item.name} to the cart`, "Added to Cart");
        case "warning":
          return NotificationManager.warning(`You have deleted the ${item.name} from the list`, 'Deleted', 3000);
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
                        <Link href="../product">
                          <div className={moduleCss.itemImage}>{item.productImage}</div>
                        </Link>  
                        <div style={{width: "100%"}}>
                          <div className={moduleCss.rowAndButton}>
                            <div className={moduleCss.name}>{item.name}</div>
                            <div className={moduleCss.cross} onClick={() => deleteItem(item)}><Image src={cross}  layout="fill" objectFit="cover" quality={100}></Image></div>
                          </div>
                          <div className={moduleCss.amount}>{item.amount}</div>
                          <div className={moduleCss.rowAndButton}>
                            <div style={{fontWeight: "bold"}}>${item.price}</div>
                            <div className={moduleCss.carts} onClick={() => addToCart(item)}><Image src={cartButton}  layout="fill" objectFit="contain" quality={100}></Image></div>
                          </div>
                        </div>
                      </div>
            } else {
              return <div key={item.name} className={moduleCss.itemContent}>
                        <Link href="../product">
                          <div className={moduleCss.itemImage}>{item.productImage}</div>
                        </Link>  
                        <div style={{width: "100%"}}>
                          <div className={moduleCss.rowAndButton}>
                            <div className={moduleCss.name}>{item.name}</div>
                            <div className={moduleCss.cross} onClick={() => deleteItem(item)}><Image src={cross}  layout="fill" objectFit="cover" quality={100}></Image></div>
                          </div>
                          <div className={moduleCss.amount}>{item.amount}</div>
                          <div className={moduleCss.rowAndButton}>
                            <div style={{fontWeight: "bold"}}>${item.price}</div>
                            <div className={moduleCss.carts} onClick={() => addToCart(item)}><Image src={cartButton}  layout="fill" objectFit="contain" quality={100}></Image></div>
                          </div>
                        </div>
                      </div>
            }
          })}
        </div>
        <Link href="../cart">
          <button className={moduleCss.addAllToCart} onClick={() => setShowModal(true)} style={{position: favouriteList.length === 0? "fixed" : "", bottom: favouriteList.length === 0? "13vh" : "0" }}>
            Add All To Cart
          </button>
        </Link>
      </div>
      <NotificationContainer/>
      <NavBar />
    </div>
  );
};

export default favourite;
