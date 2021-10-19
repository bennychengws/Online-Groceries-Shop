import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import moduleCss from "../styles/order.module.css";
import NavBar from "../components/NavBar";
import Cancel from "../components/Cancel";
import bellPR from "../images/bellPepperR.png";
import eggCR from "../images/eggChickenRed.png";
import ginger from "../images/ginger.png";
import banana from "../images/banana.png";
import authenticationCheck from "../lib/authenticationCheck";

const order = () => {
  const [showModal, setShowModal] = useState(false);
  const orderList = [
    {
      name: "Bell Pepper Red",
      productImage: (
        <Image src={bellPR} width="93px" height="63px"></Image>
      ),
      amount: "700g",
      price: 13,
      quantity: 1,
      deliveryStatus: 3
    },
    {
      name: "Egg Chicken Red",
      productImage: (
        <Image src={eggCR} width="93px" height="63px"></Image>
      ),
      amount: "4pcs",
      price: 4,
      quantity: 1,
      deliveryStatus: 2
    },
    {
      name: "Ginger",
      productImage: (
        <Image src={ginger} width="93px" height="63px"></Image>
      ),
      amount: "700g",
      price: 13,
      quantity: 1,
      deliveryStatus: 1
    },
    {
      name: "Organic Bananas",
      productImage: <Image src={banana} width="93" height="63px"></Image>,
      amount: "7pcs",
      price: 35,
      quantity: 1
    },
  ]

  return (
    <div>
      <div className={moduleCss.container}>
        <div className={moduleCss.title}>My Orders</div>
        <div className={moduleCss.itemContentWrapper} style={{borderBottom: orderList.length === 0? "hidden" : ""}}>
        {orderList.map((item, index) => {
            if (index === orderList.length-1) {
              return <div key={item.name} className={moduleCss.itemContent} style={{borderBottom: "hidden"}}>
                        <div className={moduleCss.imgAndDescription}>
                          <Link href="../product">
                            <div className={moduleCss.itemImage}>{item.productImage}</div>
                          </Link>
                          <ul>
                            <li className={moduleCss.name}>{item.name}</li>
                            <li className={moduleCss.price}>${item.price}</li>
                            <li className={moduleCss.amountAndQty}>{item.amount}</li>
                            <li className={moduleCss.amountAndQty}>Total qty: {item.quantity}</li>
                          </ul>
                        </div>
                        <div className={moduleCss.statusAndCancel}>
                          <div>{item.deliveryStatus===3 ? "Arrived Station" : item.deliveryStatus=== 2 ? "Shipped" : "Pending to deliver"}</div>
                          <button className={moduleCss.cancelOrder} onClick={() => setShowModal(true)}>Cancel?</button>
                        </div>
                      </div>
            } else {
              return <div key={item.name} className={moduleCss.itemContent}>
                        <div className={moduleCss.imgAndDescription}>
                        <Link href="../product">
                          <div className={moduleCss.itemImage}>{item.productImage}</div>
                        </Link>  
                          <ul>
                            <li className={moduleCss.name}>{item.name}</li>
                            <li className={moduleCss.price}>${item.price}</li>
                            <li className={moduleCss.amountAndQty}>{item.amount}</li>
                            <li className={moduleCss.amountAndQty}>Total qty: {item.quantity}</li>
                          </ul>
                        </div>
                        <div className={moduleCss.statusAndCancel}>
                          <div>{item.deliveryStatus===3 ? "Arrived Station" : item.deliveryStatus=== 2 ? "Shipped" : "Pending to deliver"}</div>
                          <button className={moduleCss.cancelOrder} onClick={() => setShowModal(true)}>Cancel?</button>
                        </div>
                      </div>
            }
          })}
        </div>
      </div>
      <Cancel onClose={() => setShowModal(false)} show={showModal}></Cancel>
      <NavBar />
    </div>
  );
};

export default order;

export async function getServerSideProps(context) {
  // const authenticated = authenticationCheck(context)

  // if (!authenticated) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: true,
  //     },      
  //   };
  // }
  
  return {
    props: {},
  };
}