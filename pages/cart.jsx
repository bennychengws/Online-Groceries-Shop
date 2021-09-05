import { useState, useEffect } from "react";
import Image from "next/image";
import moduleCss from "../styles/cart.module.css";
import {NotificationContainer, NotificationManager} from 'react-notifications';

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


const cart = () => {
  const [showModal, setShowModal] = useState(false);
  const [totalPriceCount, setTotalPriceCount] = useState(0);

  const [cartList, setCartList] = useState([
    {
      name: "Bell Pepper Red",
      productImage: (
        <Image src={bellPR} width="93px" height="63px"></Image>
      ),
      amount: "700g",
      price: 13,
      quantity: 1,
      productTotalPrice: 1
    },
    {
      name: "Egg Chicken Red",
      productImage: (
        <Image src={eggCR} width="93px" height="63px"></Image>
      ),
      amount: "4pcs",
      price: 4,
      quantity: 1,
      productTotalPrice: 1
    },
    {
      name: "Ginger",
      productImage: (
        <Image src={ginger} width="93px" height="63px"></Image>
      ),
      amount: "700g",
      price: 13,
      quantity: 1,
      productTotalPrice: 1
    },
    {
      name: "Organic Bananas",
      productImage: <Image src={banana} width="93" height="63px"></Image>,
      amount: "7pcs",
      price: 35,
      quantity: 1,
      productTotalPrice: 1
    },
  ])

  const handleQuantityIncrease = (index) => {
    const newCartList = [...cartList];

    newCartList[index].quantity++;

    setCartList(newCartList);
    calculateProductTotalPrice()
    calculateTotal();
  };

  const handleQuantityDecrease = (index) => {
    const newCartList = [...cartList];
    if (newCartList[index].quantity > 1){
      newCartList[index].quantity--;
    }
    setCartList(newCartList);
    calculateProductTotalPrice()
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
    console.log(cartList)
  })

  const calculateProductTotalPrice = () => {
    const newCartList = [...cartList];
    newCartList.map((item) => {
      item.productTotalPrice = item.price * item.quantity
    })
    setCartList(newCartList) 
    console.log("cPTP")
  }

  useEffect(() => {
    calculateProductTotalPrice();
    console.log(cartList)
  }, [])

  const deleteItem = (item) => {
    setCartList(cartList.filter((otherItems) => otherItems.name !== item.name))
    createNotification(item)
  }

  const createNotification = (item) => (
    NotificationManager.warning(`You have deleted the ${item.name} from the cart`, 'Deleted', 3000)
  )


  return (
    <div>
      <div className={moduleCss.container}>
        <div className={moduleCss.title}>My Cart</div>
        <div className={moduleCss.itemContentWrapper} style={{ borderBottom: cartList.length === 0 ? "hidden" : "" }}>
          {cartList.map((item, index) => {
            if (index === cartList.length - 1) {
              return <div key={item.name} className={moduleCss.itemContent} style={{ borderBottom: "hidden" }}><div className={moduleCss.imgAndDescription}><div className={moduleCss.itemImage}>{item.productImage}</div><div><div className={moduleCss.name}>{item.name}</div><div className={moduleCss.amount}>{item.amount}</div><div className={moduleCss.quantityContainer}><div className={moduleCss.qtyControlIcon} onClick={() => handleQuantityDecrease(index)}><Image src={reduce} width="35px" height="35px"></Image></div><div className={moduleCss.Qty}>{item.quantity}</div><div className={moduleCss.qtyControlIcon} onClick={() => handleQuantityIncrease(index)}><Image src={add} width="35px" height="35px"></Image></div></div></div></div><div className={moduleCss.crossAndPrice}><div style={{ cursor: "pointer" }} onClick={() => deleteItem(item)}><Image src={cross} width="14.16px" height="14px"></Image></div><div className={moduleCss.price}>${item.productTotalPrice}</div><div></div></div></div>
            } else {
              return <div key={item.name} className={moduleCss.itemContent}><div className={moduleCss.imgAndDescription}><div className={moduleCss.itemImage}>{item.productImage}</div><div><div className={moduleCss.name}>{item.name}</div><div className={moduleCss.amount}>{item.amount}</div><div className={moduleCss.quantityContainer}><div className={moduleCss.qtyControlIcon} onClick={() => handleQuantityDecrease(index)}><Image src={reduce} width="35px" height="35px"></Image></div><div className={moduleCss.Qty}>{item.quantity}</div><div className={moduleCss.qtyControlIcon} onClick={() => handleQuantityIncrease(index)}><Image src={add} width="35px" height="35px"></Image></div></div></div></div><div className={moduleCss.crossAndPrice}><div style={{ cursor: "pointer" }} onClick={() => deleteItem(item)}><Image src={cross} width="14.16px" height="14px"></Image></div><div className={moduleCss.price}>${item.productTotalPrice}</div><div></div></div></div>
            }
          })}
        </div>
        <Checkout onClose={() => setShowModal(false)} show={showModal}></Checkout>
        <button className={moduleCss.checkOut} onClick={() => setShowModal(true)} style={{ position: cartList.length === 0 ? "fixed" : "", bottom: cartList.length === 0 ? "13vh" : "0" }}><div></div>Go to Checkout<div className={moduleCss.totalPrice}>${totalPriceCount}</div></button>
      </div>
      <NotificationContainer/>
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
