import React, { useState } from "react";
import { useRouter } from 'next/router'
import Image from "next/image";
import Link from "next/link";
import moduleCss from "../styles/account.module.css";
import NavBar from "../components/NavBar";
import logOut from "../images/logOut.png";
import pencil from "../images/pencil.png";
import orders from "../images/ordersIcon.png";
import delivery from "../images/deliceryAddress.png";
import payment from "../images/paymentMethod.png";
import backArrow from "../images/back arrow.png";
import accIcon from "../images/accIcon.png";
// import Noti from "../components/NotificationContainer"
import authenticationCheck from "../lib/authenticationCheck";
import jwt_decode from "jwt-decode"
import fetchWrapper from "../lib/fetchWrapper";
import {NotificationContainer, NotificationManager} from 'react-notifications';


const account = (props) => {
  const router = useRouter();
  // const userInfo = acctContent.decoded
  console.log(props.email)
  // console.log(props)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    username: props.username,
    email: props.email,
  });

  const optionList = [
    {
      option: "Orders",
      optionImage: <Image src={orders} width="18px" height="20px"></Image>,
      linkTo: "../order",
      marginStyle: {marginLeft: "15px"}
    },
    {
      option: "Delivery Address",
      optionImage: <Image src={delivery} width="16.81px" height="20.17px"></Image>,
      linkTo: "#",
      marginStyle: {marginLeft: "16px"}
    },
    {
      option: "Payment Methods",
      optionImage: <Image src={payment} width="20px" height="13.45px"></Image>,
      linkTo: "#",
      marginStyle: {marginLeft: "12px"}
    },
    
  ];

  const handleEditUsername = async() => {
    setIsEditing(!isEditing)
    console.log("user: " + formData.username)
    console.log(formData)
    if(isEditing) {
      const res = await fetch(`api/user/${props.email}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formData
        }),
      });
      if(res.ok) {
        console.log("updated username")
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
              <input type="text" name="username" onChange={(e) => setFormData({ ...formData, username: e.target.value})} value={formData.username} placeholder="Your New Username" className="py-1 appearance-none bg-transparent w-full text-gray-700 leading-tight focus:outline-none border-b border-teal-500"></input>
              {/* <button onClick={handleSubmitEditedUsername}>Submit</button> */}
              </div>
              : <div>{formData.username}</div>
            }
              <div className={moduleCss.usernameEditButton} onClick={handleEditUsername}>
                <Image src={pencil} width="15px" height="15px"></Image>
              </div>
            </div>
            <div>{formData.email}</div>
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
      {/* <Link href="../"> */}
      <button className={moduleCss.logOutButton} onClick={handleLogout}>
        <div className={moduleCss.logOutIcon}>
          <Image src={logOut} width="18px" height="18px"></Image>
        </div>
        <div>Log Out</div>
        <div></div>
      </button>
      {/* </Link> */}
      <NavBar />
    </div>
  );
};

export default account;

export async function getServerSideProps(context) {
  const authenticated = authenticationCheck(context)

  if (!authenticated) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },      
    };
  }

  const token = context.req.cookies.auth;
  const decoded = jwt_decode(token);
   
  console.log(decoded.email);

  // return {
  //   props: {acctContent: decoded},
  // };
  const data = await fetchWrapper(`http://localhost:3000/api/user/${decoded.email}`, context, "GET");

  return {
    props: data,
  };
}