import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import moduleCss from "../../styles/resetPassword.module.css";
import Layout from "../../components/Layout";
import Image from "next/image";
import carrotImage from "../../images/Group.png";
import backArrow from "../../images/back_arrow.png";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import axios from "axios";

const index = () => {

  const router = useRouter()
  const [formData, setformData] = useState({
    email: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.email);
    try {
    await axios.post("http://localhost:3000/api/sendEmail", formData)
    createNotification("success")
    } catch (error) { 

      if (error.response.data.status === 409) {
      createNotification("warning")
      } else {
      console.log(error.response.data.message)
      createNotification("error")
    }
  }
  };

  const createNotification = (type) => {
    switch (type) {
      case "success":
        return NotificationManager.success(`Please check your email in order to reset password`, "Email Sent");
      case "warning":
        return NotificationManager.warning(`Your email address has not been registered`, "Email Not Found");  
      case "error":
        return NotificationManager.error("Something is wrong, please try again", 'Ooops', 3000);
    }
  }

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
              id="email"
              type="text"
              placeholder="Enter email"
              autoComplete="off"
              onChange={(e) => setformData({...formData, email: e.target.value})}
              value={formData.email}
            />
            <button
              className=" w-full bg-green-500 hover:bg-green-700 text-white font-bold py-3 my-1 rounded-2xl focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <NotificationContainer/>
    </Layout>
  );
};

export default index;
