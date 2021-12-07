import React, { useState } from "react";
import { useRouter } from 'next/router'
import Image from "next/image";
import Link from "next/link";
import moduleCss from "../styles/account.module.scss";
import NavBar from "../components/NavBar";
import logOut from "../images/logOut.png";
import pencil from "../images/pencil.png";
import orders from "../images/ordersIcon.png";
import delivery from "../images/deliceryAddress.png";
import backArrow from "../images/back arrow.png";
import accIcon from "../images/accIcon.png";
import authenticationCheck from "../lib/authenticationCheck";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { useUserContext } from "../context/UserContext";
import { useFilterContext } from "../context/FilterContext";
import fetchHandler from "../lib/fetchHandler";
import getConfig from 'next/config';

const account = () => {
  const [userState, dispatch] = useUserContext()
  const [filterState, dispatchFilter] = useFilterContext()
  const { publicRuntimeConfig } = getConfig();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false)
  const optionList = [
    {
      option: "Orders",
      optionImage: <Image src={orders} width="18px" height="20px"></Image>,
      linkTo: "../my_orders",
      marginStyle: {marginLeft: "15px"}
    },
    {
      option: "Delivery Address",
      optionImage: <Image src={delivery} width="16.81px" height="20.17px"></Image>,
      linkTo: "../address",
      marginStyle: {marginLeft: "16px"}
    },
    // {
    //   option: "Payment Methods",
    //   optionImage: <Image src={payment} width="20px" height="13.45px"></Image>,
    //   linkTo: "../payment",
    //   marginStyle: {marginLeft: "12px"}
    // },
    
  ];

  const handleEditUsername = async() => {
    setIsEditing(!isEditing)
    if(isEditing) {
      const res = await fetchHandler(`${publicRuntimeConfig.apiUrl}/user/${userState._id}/info/username`, "PUT", undefined, {username: userState.username})
      if(res.ok) {
        createNotification("success")
        console.log("updated username")
      } else if(res.status === 401) {
        router.push("/")
      } else {
        createNotification("error", "Some errors occur, please try again")
      }

    }
  }

  const handleLogout = async() => {
    console.log("clicked logout")
    const res = await fetchHandler(`${publicRuntimeConfig.apiUrl}/logout`, "POST" )
    if(res.ok) {
      localStorage.removeItem('myAccount');
      dispatch({type: "init_stored", value: ""})
      dispatchFilter({type: "filter_stored", value: ""})
      router.push("/")
    }
  }

  const createNotification = (type, message) => {
    switch (type) {
      case "success":
        return NotificationManager.success(`You have succefully changed your username`, "Successful Change");
      case "error":
        return NotificationManager.error(message, 'Ooops', 3000);
    }
  }

  return (
    <div className={moduleCss.container}>
      <div className={moduleCss.accContainerWrapper}>
        <div className={moduleCss.accContainer}>
          <div className={moduleCss.iconContainer}>
            <Image src={accIcon} width="46px" height="48px"></Image>
          </div>
          <div>
            <div className={moduleCss.accDetails}>
            {
              isEditing ? 
              <div>
              <input type="text" name="username" onChange={(e) => dispatch({type: "init_stored", value: { ...userState, username: e.target.value}})} value={userState.username} placeholder="Your New Username" className="py-1 appearance-none bg-transparent w-full text-gray-700 leading-tight focus:outline-none border-b border-teal-500"></input>
              {/* <button onClick={handleSubmitEditedUsername}>Submit</button> */}
              </div>
              : <div>{userState.username}</div>
            }
              <div className={moduleCss.usernameEditButton} onClick={handleEditUsername}>
                <Image src={pencil} width="15px" height="15px"></Image>
              </div>
            </div>
            <div>{userState.email}</div>
          </div>
        </div>
        <div className={moduleCss.optionsContainer}>
          {optionList.map((item) => (
            <Link href={item.linkTo} key={item.option}>
              <div className={moduleCss.options}>
                <div className={moduleCss.firstHalfOption}>
                  <div className={moduleCss.optionsIcon}>
                    {item.optionImage}
                  </div>
                  <div style={item.marginStyle}>{item.option}</div>
                </div>
                <div>
                  <Image src={backArrow} width="8.4px" height="14px"></Image>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <button className={moduleCss.logOutButton} onClick={handleLogout}>
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

export default account;

export async function getServerSideProps(context) {
  const authenticated = authenticationCheck(context)
  if (!authenticated) {
    return {redirect: {destination: '/', permanent: true,}, };
  }
  return {
    props: {}
  };
}
