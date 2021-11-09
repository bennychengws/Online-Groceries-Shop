import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import getConfig from 'next/config';
import Jwt from "jsonwebtoken";
import axios from "axios";
import moduleCss from "../../../styles/resetPassword.module.css";
import Layout from "../../../components/Layout";
import Image from "next/image";
import carrotImage from "../../../images/Group.png";
import backArrow from "../../../images/back_arrow.png";

const resetPassword = () => {
  const router = useRouter()
  const [formData, setformData] = useState({
    newPassword: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.newPassword);
    console.log(formData.confirmPassword);

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

  return (
    <Layout>
      <div className={moduleCss.container}>
      <div className={moduleCss.backArrowImg} onClick={() => router.back()}><Image src={backArrow} width="8.4px" height="14px"></Image></div>
        <div className={moduleCss.image}>
          <Image src={carrotImage} width="30vw" height="40vh"></Image>
        </div>
        <div className={moduleCss.loginContainer}>
          <div className={moduleCss.loginIntro}>
            <div className={moduleCss.loggingIn}>Reset Password</div>
            <div className="text-gray-500">We will never shall your email with anyone else.</div>
          </div>
          <form className=" rounded mb-4" onSubmit={handleSubmit}>
            <input
              className="mb-3 appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 leading-tight focus:outline-none border-b border-teal-500"
              id="newPassword"
              type="text"
              placeholder="Enter new password"
              autoComplete="off"
              onChange={(e) => setformData({...formData, newPassword: e.target.value})}
              value={formData.newPassword}
            />
                        <input
              className="mb-3 appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 leading-tight focus:outline-none border-b border-teal-500"
              id="confirmPassword"
              type="text"
              placeholder="Confirm new password"
              autoComplete="off"
              onChange={(e) => setformData({...formData, confirmPassword: e.target.value})}
              value={formData.confirmPassword}
            />
            <button
              className=" w-full bg-green-500 hover:bg-green-700 text-white font-bold py-3 my-1 rounded-2xl focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default resetPassword;

export async function getServerSideProps(context) {
  const { serverRuntimeConfig } = getConfig();
  const { uid, jwtKey } = context.params;
  console.log(uid)
  console.log(jwtKey)
  try {
    var res = await axios.get(`http://localhost:3000/api/reset-password/${uid}`);
    // console.log(res.data)
  } catch (error) {
    console.log(error.response.data.message)
    return {redirect: {destination: '/reset-password', permanent: true,}, };
  }
  // console.log(res.data.password)
  // console.log(serverRuntimeConfig.secret)
  const secretKey = serverRuntimeConfig.secret + res.data.password
  // console.log(secretKey)
  const payload = Jwt.verify(jwtKey, secretKey)
  console.log(payload)
  // Jwt.verify(jwtKey, secretKey, function (err, decoded) {
  //   if (!err && decoded) {
  //       console.log("authenticated by the authentication check function")  
  //     } else {
  //       return {redirect: {destination: '/reset-password', permanent: true,}, };
  //     }
  //   }) 
  return {
    props: {}
  };
}