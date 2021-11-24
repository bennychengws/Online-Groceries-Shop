// Incompleted, to be optimised
import React, { useState } from "react";
import { useRouter } from 'next/router'
import Image from "next/image";
import NavBar from "../components/NavBar";
//import EditPayment from "../components/EditPayment";
import jwt_decode from "jwt-decode";
import {NotificationContainer, NotificationManager} from "react-notifications";
import moduleCss from "../styles/payment.module.css";
import payment from "../images/paymentMethod.png";
import logOut from "../images/logOut.png";
import getConfig from 'next/config';

const paymentMethod = ({}) => {
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();
  const [isChangingPaymentMethod, setIsChangingPaymentMethod] = useState(false)

  const handleLogout = async() => {
    console.log("clicked")
    const res = await fetch(`${publicRuntimeConfig.apiUrl}/logout`, {method: 'GET',})
    if(res.ok) {
      router.push("/")
    }
  }

  return (
    <div className={moduleCss.container}>
      <div className={moduleCss.pageTitleContent}>
        <div className={moduleCss.pageTitleWithIcon}>
          <Image src={payment} width="16.81px" height="20.17px"></Image>
          <div className={moduleCss.pageTitle}>Registered Payment Method</div>
        </div>
      </div>  
      <button className={moduleCss.logOutButton} onClick={handleLogout}>
        <div className={moduleCss.logOutIcon}><Image src={logOut} width="18px" height="18px"></Image></div>
        <div>Log Out</div>
        <div></div>
      </button>
      <NavBar />
      <NotificationContainer/>
    </div>
  );
};

export default paymentMethod;

export async function getServerSideProps(context) {
  // const authenticated = authenticationCheck(context)
  // if (!authenticated) {
  //   return {redirect: {destination: '/', permanent: true,}, };
  // }
  const { publicRuntimeConfig } = getConfig();
  const token = context.req.cookies.auth
  const decoded = jwt_decode(token);
  const data = await fetch(`${publicRuntimeConfig.apiUrl}/user/${decoded.email}/info/address`, 
    {
      headers: {cookie: context.req?.headers.cookie}} 
  );
  console.log(data.status)
  if(data.status === 401) {
    return {redirect: {destination: '/', permanent: true,}, };
  }
  const paymentAcctData = await data.json();
  return {
    props: {paymentAcctInfo: paymentAcctData}
  };
}