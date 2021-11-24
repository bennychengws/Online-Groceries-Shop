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
import { useUserContext } from "../context/UserContext";
import fetchHandler from "../lib/fetchHandler";
import getConfig from 'next/config';

const address = () => {
  const router = useRouter();
  const [userState, dispatch] = useUserContext()
  const { publicRuntimeConfig } = getConfig();

  const [formData, setFormData] = useState({
    country: "",
    region: "",
    city: "",
    streetAddressLine1: "",
    streetAddressLine2: ""
  });

  const [isChangingAddress, setIsChangingAddress] = useState(false)

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsChangingAddress(!isChangingAddress)
    if(isChangingAddress) {
      const res = await fetchHandler(`${publicRuntimeConfig.apiUrl}/user/${userState._id}/info/address`, "PUT", undefined, formData)
      if(res.ok) {
        dispatch({type: "init_stored", value: { ...userState, address: formData}})
        console.log("updated address")
        setFormData({country: "", region: "", city: "", streetAddressLine1: "", streetAddressLine2: ""})
        createNotification("success")
        await new Promise(resolve => setTimeout(resolve, 3000));
        // router.reload()
      } else if(res.status === 401) {
        createNotification("error", "Sorry you are not authenticated")
        router.push("/")
      } else {
        createNotification("error", "Some errors occur, please try again")
      }
    }
  }

  const handleLogout = async() => {
    console.log("clicked logout")
    const res = await fetch(`${publicRuntimeConfig.apiUrl}/logout`, {method: 'GET',})
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