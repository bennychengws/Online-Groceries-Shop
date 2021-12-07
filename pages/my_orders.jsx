import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Image from "next/image";
import moduleCss from "../styles/order.module.scss";
import NavBar from "../components/NavBar";
import Cancel from "../components/Cancel";
import authenticationCheck from "../lib/authenticationCheck";
import fetchHandler from "../lib/fetchHandler";
import jwt_decode from "jwt-decode";
import getConfig from 'next/config';

const myOrders = ({ orders }) => {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false);
  const [orderList, setOderList] = useState([])
  const [orderToBeDeleted, setOrderToBeDeleted] = useState({})

  useEffect(() => {
    setOderList(orders)
  }, [])

  const handleCancel = (order) => {
    console.log(order)
    setOrderToBeDeleted(order)
    setShowModal(true)
  }

  return (
    <div>
      <div className={moduleCss.container}>
        <div className={moduleCss.title}>My Orders</div>
        <div className={moduleCss.orderWrapper} style={{ borderBottom: orderList.length === 0 ? "hidden" : "" }}>
          {orderList.map((order, index) => {
            return <div key={order._id} className={moduleCss.order} style={{ borderBottom: index === orderList.length - 1 ? "hidden" : "" }}>
              <div className={moduleCss.orderHeader}>
                <div className={moduleCss.orderHeaderGeneral}>
                  <div className={moduleCss.orderHeaderItems}><div className={moduleCss.orderHeaderTitle}>ID:</div>{" "}<div className={moduleCss.orderHeaderContent}>{order._id}</div></div>
                  <div className={moduleCss.orderHeaderItems}><div className={moduleCss.orderHeaderTitle}>Placed On:</div><div className={moduleCss.orderHeaderContent}>{Intl.DateTimeFormat('en-GB', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(order.orderTime))}</div></div>
                  <div className={moduleCss.orderHeaderItems}><div className={moduleCss.orderHeaderTitle}>Total:</div><div className={moduleCss.orderHeaderContent}>${order.totalPrice.$numberDecimal}</div></div>
                </div>
                <div className={moduleCss.orderHeaderAddress}>
                  <div className={moduleCss.orderHeaderItems}>
                    <div className={moduleCss.orderHeaderTitle}>To: </div><div className={moduleCss.orderHeaderContent}>{order.shipTo.streetAddressLine1}, {order.shipTo.streetAddressLine2}, {order.shipTo.city}</div>
                  </div>
                </div>
              </div>
              <div className={moduleCss.orderInfo}>
                <div className={moduleCss.productInfoWrapper}>
                  {order.items.map((item, index) => {
                    return <div key={item._id} className={moduleCss.productInfo}>
                      <div className={moduleCss.itemImage}>
                        <Image src={`data:image/png;base64,${item.productImage}`} layout="fill" objectFit="contain" quality={100} onClick={() => router.push(`/product/${item._id}`)}></Image>
                      </div>
                      <ul>
                        <li className={moduleCss.name}>{item.name}</li>
                        <li className={moduleCss.price}>${item.productTotalPrice.$numberDecimal}</li>
                        <li className={moduleCss.amountAndQty}>Total qty: {item.quantity}</li>
                      </ul>
                    </div>
                  })}
                </div>
                <div className={moduleCss.status}>
                  {order.status === "Arrived" ? 
                    <div className={moduleCss.statusItem}>Actual Arrival Date: <div style={{fontWeight:"normal"}}>{Intl.DateTimeFormat('en-GB', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(order.actualArrivalDate))}</div></div> : 
                    <div className={moduleCss.statusItem}>Expected Arrival Date: <div style={{fontWeight:"normal"}}>{Intl.DateTimeFormat('en-GB', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(order.expectedArrivalDate))}</div></div>
                  }
                  <div className={moduleCss.statusItem}>{order.status}</div>
                  <button className={moduleCss.cancelOrder} onClick={() => handleCancel(order)}>Cancel?</button>
                  <div></div>
                </div>
              </div>
            </div>
          })}
        </div>
      </div>
      <Cancel onClose={() => setShowModal(false)} show={showModal} order={orderToBeDeleted}></Cancel>
      <NavBar />
    </div>
  );
};

export default myOrders;

export async function getServerSideProps(context) {
  const authenticated = authenticationCheck(context)
  if (!authenticated) {
    return { redirect: { destination: '/', permanent: true, }, };
  }
  const { publicRuntimeConfig } = getConfig();
  const token = context.req.cookies.auth
  const decoded = jwt_decode(token);
  console.log("decoded: " + decoded.sub)
  const orderAPIData = await fetchHandler(`${publicRuntimeConfig.apiUrl}/user/${decoded.sub}/actions/handleOrder`, "GET", context)
  console.log(`orderAPI status: ${orderAPIData.status}`)
  if (orderAPIData.status === 401) {
    return { redirect: { destination: '/', permanent: true, }, };
  }
  return {
    props: { orders: orderAPIData.data },
  };
}