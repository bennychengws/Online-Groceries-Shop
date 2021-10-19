import React, { useState } from "react";
import { useRouter } from 'next/router'
import Image from "next/image";
import NavBar from "../components/NavBar";
import EditPayment from "../components/EditPayment";
import authenticationCheck from "../lib/authenticationCheck";
import jwt_decode from "jwt-decode";
import {NotificationContainer, NotificationManager} from "react-notifications";
import moduleCss from "../styles/payment.module.css";
import payment from "../images/paymentMethod.png";
import logOut from "../images/logOut.png";


const paymentMethod = ({}) => {
  const router = useRouter();
  const [isChangingPaymentMethod, setIsChangingPaymentMethod] = useState(false)

  const handleLogout = async() => {
    console.log("clicked")
    const res = await fetch("api/logout", {method: 'GET',})
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
        <div className={moduleCss.paymentContent}>
          <div>Method: Mastercard ending in: </div>
          <div>Name on card: </div>
          <div>Expiration Date: </div>
        </div>
        {/* <span className="mr-2">Mastercard</span><input type="radio" className="form-radio text-indigo-600" name="radio-colors2" value={1} defaultChecked></input> */}
        {/* <div className={moduleCss.addressContent}>
          <div>Country: {paymentAcctInfo.address.country}</div>
          <div>Region: {paymentAcctInfo.address.region}</div>
          <div>City: {paymentAcctInfo.address.city}</div>
          <div className={moduleCss.streetAddressWrapper}>
            <div className={moduleCss.streetAddressTitle}>Street Address</div>
            <div>Line 1: {paymentAcctInfo.address.streetAddressLine1}</div>
            <div>Line 2: {paymentAcctInfo.address.streetAddressLine2}</div>
          </div>
        </div> */}
        {/* <button className={moduleCss.press} onClick={() => setIsChangingPaymentMethod(!isChangingPaymentMethod)} style={{display: isChangingPaymentMethod ? "none" : "block"}}>Press here to update payment method</button> */}
        <EditPayment/>
        {/* <div style={{display: isChangingPaymentMethod ? "block" : "none", marginTop: "3vh"}}>
          <div className={moduleCss.pageTitleWithIcon} >
            <Image src={payment} width="16.81px" height="20.17px"></Image>
            <div className={moduleCss.pageTitle}>Edit Payment Method</div>
          </div>
          <form className={moduleCss.addressContent} onSubmit={handleSubmit}>
            <div className={moduleCss.inputWrapper} >
              <div>Country:</div>
              <input className={moduleCss.inputField} onChange={(e) =>setFormData({ ...formData, country: e.target.value })} value={formData.country}></input>
            </div>
            <div className={moduleCss.inputWrapper} >
              <div>Region:</div>
              <input className={moduleCss.inputField} onChange={(e) =>setFormData({ ...formData, region: e.target.value })} value={formData.region}></input>
            </div>
            <div className={moduleCss.inputWrapper} >
              <div>City:</div>
              <input className={moduleCss.inputField} onChange={(e) =>setFormData({ ...formData, city: e.target.value })} value={formData.city}></input>
            </div>            
            <div className={moduleCss.streetAddressWrapper}>
              <div className={moduleCss.streetAddressTitle}>Street Address</div>
              <div className={moduleCss.inputWrapper} >
              <div>Line 1:</div>
              <input className={moduleCss.inputField} onChange={(e) =>setFormData({ ...formData, streetAddressLine1: e.target.value })} value={formData.streetAddressLine1}></input>
            </div>   
            <div className={moduleCss.inputWrapper} >
              <div>Line 2:</div>
              <input className={moduleCss.inputField} onChange={(e) =>setFormData({ ...formData, streetAddressLine2: e.target.value })} value={formData.streetAddressLine2}></input>
            </div>   
            </div>
            <div className={moduleCss.submitCancelRow}>
              <button className={moduleCss.submit}>Submit</button>
              <div className={moduleCss.cancel} onClick={() => {setIsChangingPaymentMethod(!isChangingPaymentMethod), setFormData({...formData, country: "", region: "", city: "", streetAddressLine1: "", streetAddressLine2: ""})}}>Cancel</div>
            </div>
          </form>
        </div> */}
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
  const token = context.req.cookies.auth
  const decoded = jwt_decode(token);
  const data = await fetch(`http://localhost:3000/api/user/${decoded.email}/info/address`, 
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