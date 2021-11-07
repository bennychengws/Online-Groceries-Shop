import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import moduleCss from "../../styles/resetPassword.module.css";
import Layout from "../../components/Layout";
import Image from "next/image";
import carrotImage from "../../images/Group.png";
import backArrow from "../../images/back_arrow.png";

const resetPassword = () => {
  const router = useRouter()
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
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
              id="username"
              type="text"
              placeholder="Enter email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
    </Layout>
  );
}

export default resetPassword;
