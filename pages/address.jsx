import React, { useState, useEffect, useContext } from "react";
import { useRouter } from 'next/router'
import Image from "next/image";
import NavBar from "../components/NavBar";
import authenticationCheck from "../lib/authenticationCheck";
import jwt_decode from "jwt-decode";
import {NotificationContainer, NotificationManager} from "react-notifications";
import moduleCss from "../styles/address.module.css";
import delivery from "../images/deliceryAddress.png";
import logOut from "../images/logOut.png";
// import { UserContext } from "../context/UserContext";
import { useUserContext } from "../context/UserContext";
import fetchHandler from "../lib/fetchHandler";

const address = () => {
  const router = useRouter();
  // const {userState, setUserContent} = useContext(UserContext);
  const [userState, dispatch] = useUserContext()

  // useEffect(() => {
  //   dispatch({type: "init_stored", value: account})
  // }, [])
  // console.log(typeof window !== "undefined" )
  // console.log(localStorage.getItem('myAccount') )

  // useEffect(() => {
  //   if(typeof window !== "undefined" && localStorage.getItem('myAccount')) {
  //     setUserContent(JSON.parse(localStorage.getItem('myAccount')))
  //   }
  // }, [])
  // const {address} = userState
  // const {city} = address
  // console.log(address)
  // console.log(address.country)
  // console.log(city)

  // if (typeof window !== "undefined") {
  //   var a = JSON.parse(localStorage.getItem('myAccount'))

  // }
  // console.log(a)
  const email =  userState?.email
  const [formData, setFormData] = useState({
    country: "",
    region: "",
    city: "",
    streetAddressLine1: "",
    streetAddressLine2: ""
  });
  console.log(formData);

  const [isChangingAddress, setIsChangingAddress] = useState(false)

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsChangingAddress(!isChangingAddress)
    console.log(formData)
    if(isChangingAddress) {
      // const res = await fetchWrapper.put(`api/user/${accountInfo.email}`, formData) 
      // const res = await fetch(`api/user/${userState.email}/info/address`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     email,
      //     formData
      //   }),
      // });
      const res = await fetchHandler(`api/user/${userState.email}/info/address`, "PUT", undefined, {email, formData})
      if(res.ok) {
        createNotification("success")
        await new Promise(resolve => setTimeout(resolve, 3000));
        dispatch({type: "init_stored", value: { ...userState, address: formData}})
        console.log("updated address")
        router.reload()
      } else if(res.status === 401) {
        createNotification("error", "Sorry you are not authenticated")
        router.push("/")
      } else {
        createNotification("error", "Some errors occur, please try again")
      }
    }
  }

  const handleLogout = async() => {
    console.log("clicked")
    const res = await fetch("api/logout", {method: 'GET',})
    if(res.ok) {
      router.push("/")
    }
  }
  
  const createNotification = (type, message) => {
    switch (type) {
      case "success":
        return NotificationManager.success(`You have succefully updated your registered address`, "Successful Change", 10000);
      case "error":
        return NotificationManager.error(message, 'Ooops', 3000);
    }
  }

  return (
    <div className={moduleCss.container}>
      <div className={moduleCss.pageTitleContent}>
        <div className={moduleCss.pageTitleWithIcon}>
          <Image src={delivery} width="16.81px" height="20.17px"></Image>
          <div className={moduleCss.pageTitle}>Registered Address</div>
        </div>
        <div className={moduleCss.addressContent}>
          <div>Country: {userState?.address?.country}</div>
          <div>Region: {userState?.address?.region}</div>
          <div>City: {userState?.address?.city}</div>
          <div className={moduleCss.streetAddressWrapper}>
            <div className={moduleCss.streetAddressTitle}>Street Address</div>
            <div>Line 1: {userState?.address?.streetAddressLine1}</div>
            <div>Line 2: {userState?.address?.streetAddressLine2}</div>
          </div>
        </div>
        <button className={moduleCss.press} onClick={() => setIsChangingAddress(!isChangingAddress)} style={{display: isChangingAddress ? "none" : "block"}}>Press here to change address</button>
        <div style={{display: isChangingAddress ? "block" : "none", marginTop: "3vh"}}>
          <div className={moduleCss.pageTitleWithIcon} >
            <Image src={delivery} width="16.81px" height="20.17px"></Image>
            <div className={moduleCss.pageTitle}>New Address</div>
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
              <div className={moduleCss.cancel} onClick={() => {setIsChangingAddress(!isChangingAddress), setFormData({...formData, country: "", region: "", city: "", streetAddressLine1: "", streetAddressLine2: ""})}}>Cancel</div>
            </div>
          </form>
        </div>
      </div>
      <button 
        className={moduleCss.logOutButton} 
        onClick={handleLogout} style={{ position: isChangingAddress? "static" : "fixed", bottom: isChangingAddress ? "0" : "13vh" }}
      >
        <div className={moduleCss.logOutIcon}>
          <Image src={logOut} width="18px" height="18px"></Image>
        </div>
        <div>Log Out</div>
        <div></div>
      </button>
      <NavBar />
      <NotificationContainer/>
    </div>
  );
};

export default address;


export async function getServerSideProps(context) {
  const authenticated = authenticationCheck(context)
  if (!authenticated) {
    return {redirect: {destination: '/', permanent: true,}, };
  }
  return {
    props: {}
  };
}
// export async function getServerSideProps(context) {
//   const authenticated = authenticationCheck(context)
//   if (!authenticated) {
//     return {redirect: {destination: '/', permanent: true,}, };
//   }
//   const token = context.req.cookies.auth
//   const decoded = jwt_decode(token);
//   const data = await fetch(`http://localhost:3000/api/user/${decoded.email}/info/address`, {
//     headers: {cookie: context.req?.headers.cookie}} 
//   );
//   console.log(data.status)
//   if(data.status === 401) {
//     return {redirect: {destination: '/', permanent: true,}, };
//   }
//   const addressData = await data.json();
//   return {
//     props: {addressInfo: addressData}
//   };
// }