import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
// import getConfig from 'next/config';
import Jwt from "jsonwebtoken";
import axios from "axios";
import moduleCss from "../../../styles/resetPassword.module.css";
import Layout from "../../../components/Layout";
import Image from "next/image";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import carrotImage from "../../../images/Group.png";
import backArrow from "../../../images/back_arrow.png";
import showPwdImg from "../../../images/eye_visible_hide_hidden_show_icon_145988.png";
import hidePwdImg from "../../../images/eye_slash_visible_hide_hidden_show_icon_145987.png";
import getConfig from 'next/config';

const resetPassword = ({uid}) => {
  const router = useRouter()
  const { publicRuntimeConfig } = getConfig();
  const [formData, setformData] = useState({
    _id: uid,
    newPassword: "",
    confirmPassword: ""
  });

  const [isRevealnNewPwd, setIsRevealNewPwd] = useState(false);
  const [isRevealnConfirmPwd, setIsRevealConfirmPwd] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData._id)
    console.log(formData.newPassword);
    console.log(formData.confirmPassword);
    if(!formData.newPassword) {
      createNotification("info")
    } else if (formData.newPassword.length <= 6) {
      createNotification("error")
    } else if (formData.newPassword !== formData.confirmPassword) {
      createNotification("warning")      
    } else {
      try {
        console.log('passed');
        await axios.put(`${publicRuntimeConfig.apiUrl}/reset-password/${uid}`, formData);
        createNotification("success")
        await new Promise(resolve => setTimeout(resolve, 3000));
        router.push("/")
      } catch (error) {
        console.log(error)
        createNotification("error2", error) 
      }
    }

    // const res = await fetch("api/login", {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     formData
    //   }),
    // });
    // const res = await fetchHandler("api/login", "POST", undefined, formData)
    // if(res.ok) {
    //   router.push("../home")
    // } else {
    //   // router.reload()
    //   setFormData({email: "", password: "",})
    //   createNotification("warning")
    // }
  };
  const createNotification = (type, item) => {
    switch (type) {
      case "info":
        return NotificationManager.info(`Your passowrd should not be empty`, "Password");
      case "success":
        return NotificationManager.success(`You have succefully change your password`, "Successful Change");
      case "error":
        return NotificationManager.error('Please enter a password with at least 6 characters', 'Invalid Password', 3000);
      case "warning":
        return NotificationManager.warning('Please confirm your password', 'UnmatchedPassword', 3000);
      case "error2":
        return NotificationManager.error(item, 'Ooops', 3000);
    }
  }

  return (
    <Layout>
      <div className={moduleCss.container}>
      {/* <div className={moduleCss.backArrowImg} onClick={() => router.back()}><Image src={backArrow} width="8.4px" height="14px"></Image></div> */}
        <div className={moduleCss.image}>
          <Image src={carrotImage} width="30vw" height="40vh"></Image>
        </div>
        <div className={moduleCss.loginContainer}>
          <div className={moduleCss.loginIntro}>
            <div className={moduleCss.loggingIn}>Reset Password</div>
            <div className="text-gray-500">We will never shall your email with anyone else.</div>
          </div>
          <form className=" rounded mb-4" onSubmit={handleSubmit}>
            <div className={moduleCss.pwdContainer}
              style={{
                borderColor: formData.newPassword.length > 0 && formData.newPassword.length < 6
                  ? "rgba(239, 68, 68, 1)"
                  : "rgba(226, 226, 226, 1)"
              }}            
            >
              <input
                className="appearance-none bg-transparent w-full text-gray-700 leading-tight focus:outline-none border-b border-teal-500"
                id="newPassword"
                type={isRevealnNewPwd ? "text" : "password"}
                placeholder="Enter new password"
                autoComplete="off"
                onChange={(e) => setformData({...formData, newPassword: e.target.value})}
                value={formData.newPassword}
              />
              <span>
                <Image
                  src={isRevealnNewPwd ? hidePwdImg : showPwdImg}
                  width="20vw"
                  height="20vh"
                  onClick={() => setIsRevealNewPwd((prevState) => !prevState)}
                ></Image>
              </span>
            </div>
            {formData.newPassword.length > 0 && formData.newPassword.length < 6 ? (
              <p className="text-red-500 text-xs italic mt-1">
                Please enter a password with at least 6 characters.
              </p>
            ) : null}  
            <div className={moduleCss.pwdContainer}
              style={{
                borderColor: formData.confirmPassword.length > 0 && formData.confirmPassword.length < 6
                  ? "rgba(239, 68, 68, 1)"
                  : "rgba(226, 226, 226, 1)"
              }} 
              style={{marginTop: "0.75rem"}}
            >
              <input
                className="appearance-none bg-transparent w-full text-gray-700 leading-tight focus:outline-none border-b border-teal-500"
                id="confirmPassword"
                type={isRevealnConfirmPwd ? "text" : "password"}
                placeholder="Confirm new password"
                autoComplete="off"
                onChange={(e) => setformData({...formData, confirmPassword: e.target.value})}
                value={formData.confirmPassword}
              />
              <span>
                <Image
                  src={isRevealnConfirmPwd ? hidePwdImg : showPwdImg}
                  width="20vw"
                  height="20vh"
                  onClick={() => setIsRevealConfirmPwd((prevState) => !prevState)}
                ></Image>
              </span>
            </div>
            {formData.confirmPassword.length > 0 && formData.confirmPassword.length < 6 ? (
              <p className="text-red-500 text-xs italic mt-1">
                Please enter a password with at least 6 characters.
              </p>
            ) : null}            
            <button
              className="mt-3 w-full bg-green-500 hover:bg-green-700 text-white font-bold py-3 my-1 rounded-2xl focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
      <NotificationContainer/>
    </Layout>
  );
}

export default resetPassword;

export async function getServerSideProps(context) {
 const { publicRuntimeConfig } = getConfig();
  const { uid, jwtKey } = context.params;
  console.log(uid)
  console.log(jwtKey)
  try {
    var res = await axios.get(`${publicRuntimeConfig.apiUrl}/reset-password/${uid}`);
    const secretKey = process.env.JWT_SECRET + res.data.password
    const payload = Jwt.verify(jwtKey, secretKey)
//    console.log(payload)
    // console.log(res.data)
  } catch (error) {
    console.log(error)
    return {redirect: {destination: '/reset-password', permanent: true,}, };
  }

  return {
    props: {uid: uid}
  };
}