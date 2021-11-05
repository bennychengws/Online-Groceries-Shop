import { useState, useEffect } from "react";
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
import fetchHandler from "../lib/fetchHandler";
import jwt_decode from "jwt-decode";

const order = ({ orders }) => {
  const [showModal, setShowModal] = useState(false);
  const [orderList, setOderList] = useState([])
  // const orderList = [
  // // new structure
  // {
  //   totalPrice: 42.3,
  //   status: "Pending to deliver",
  //   _id: "6184a8d057bab24a8ca56818",
  //   orderTime: "2021-11-05T03:45:19.836+00:00",
  //   items: [
  //     {
  //       name: "Bell Pepper Red",
  //       productImage: <Image src={bellPR} width="93px" height="63px"></Image>,
  //       amountPerQty: "700g",
  //       discountedPrice: 13,
  //       productTotalPrice: 13,
  //       quantity: 1,
  //       _id: "60e9c9c2babc267c60bfecb8"
  //     }
  //   ]
  // },
  // // old structure
  // {
  //   name: "Egg Chicken Red",
  //   productImage: (
  //     <Image src={eggCR} width="93px" height="63px"></Image>
  //   ),
  //   amount: "4pcs",
  //   price: 4,
  //   quantity: 1,
  //   deliveryStatus: 2
  // },
  // ]

  useEffect(() => {
    setOderList(orders)
  }, [])

  console.log(orderList)

  return (
    <div>
      <div className={moduleCss.container}>
        <div className={moduleCss.title}>My Orders</div>
        <div className={moduleCss.itemContentWrapper} style={{ borderBottom: orderList.length === 0 ? "hidden" : "" }}>
          {orderList.map((order, index) => {
            return <div key={order} className={moduleCss.itemContent} style={{ borderBottom: index === orderList.length - 1 ? "hidden" : "" }}>
              <div>
                <div>Order ID: {order._id}</div>
                <div>Order Date: {order.orderTime}</div>
                <div>Total: {order.totalPrice}</div>
                <div>Ship To: </div>
                {order.status === "Arrived" ? <div>Actual Arrival Date: </div> : <div>Expected Arrival Date: </div>}
              </div>
              <div className={moduleCss.imgAndDescription}>
                {order.items.map((item, index) => {
                  <div key={item._id}>
                    <Link href="../product">
                      <div className={moduleCss.itemImage}>{item.productImage}</div>
                    </Link>
                    <ul>
                      <li className={moduleCss.name}>{item.name}</li>
                      <li className={moduleCss.price}>${item.price}</li>
                      <li className={moduleCss.amountAndQty}>Total qty: {item.quantity}</li>
                    </ul>
                  </div>
                })}
              </div>
              <div className={moduleCss.statusAndCancel}>
                <div>{order.status}</div>
                <button className={moduleCss.cancelOrder} onClick={() => setShowModal(true)}>Cancel?</button>
              </div>
            </div>
          })}
          {/* {orderList.map((item, index) => {
            if (index === orderList.length - 1) {
              return <div key={item.name} className={moduleCss.itemContent} style={{ borderBottom: "hidden" }}>
                <div className={moduleCss.imgAndDescription}>
                  <Link href="../product">
                    <div className={moduleCss.itemImage}>{item.productImage}</div>
                  </Link>
                  <ul>
                    <li className={moduleCss.name}>{item.name}</li>
                    <li className={moduleCss.price}>${item.price}</li>
                    <li className={moduleCss.amountAndQty}>Total qty: {item.quantity}</li>
                  </ul>
                </div>
                <div className={moduleCss.statusAndCancel}>
                  <div>{item.deliveryStatus === 3 ? "Arrived Station" : item.deliveryStatus === 2 ? "Shipped" : "Pending to deliver"}</div>
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
                    <li className={moduleCss.amountAndQty}>Total qty: {item.quantity}</li>
                  </ul>
                </div>
                <div className={moduleCss.statusAndCancel}>
                  <div>{item.deliveryStatus === 3 ? "Arrived Station" : item.deliveryStatus === 2 ? "Shipped" : "Pending to deliver"}</div>
                  <button className={moduleCss.cancelOrder} onClick={() => setShowModal(true)}>Cancel?</button>
                </div>
              </div>
            }
          })} */}
        </div>
      </div>
      <Cancel onClose={() => setShowModal(false)} show={showModal}></Cancel>
      <NavBar />
    </div>
  );
};

export default order;

export async function getServerSideProps(context) {
  const authenticated = authenticationCheck(context)
  if (!authenticated) {
    return { redirect: { destination: '/', permanent: true, }, };
  }
  const token = context.req.cookies.auth
  const decoded = jwt_decode(token);
  console.log("decoded: " + decoded.sub)
  const orderAPIData = await fetchHandler(`http://localhost:3000/api/user/${decoded.sub}/actions/handleOrder`, "GET", context)
  console.log(`orderAPI status: ${orderAPIData.status}`)
  if (orderAPIData.status === 401) {
    return { redirect: { destination: '/', permanent: true, }, };
  }
  return {
    props: { orders: orderAPIData.data },
  };
}