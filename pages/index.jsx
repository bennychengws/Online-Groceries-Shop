import Head from "next/head";
import Image from "next/image";
import carrotImage from "../images/Group.png";
import moduleCss from "../styles/index.module.css";
import backgroundImage from "../images/background.jpg"

// import { useState } from "react";
import Login from "../components/Login.jsx";

export default function Home() {
  // const onChange = (e) => {
  //   setFormData({ ...formData, uername: e.target.value });
  // };
  return (
    <div className={moduleCss.container}>
      <div className={moduleCss.image}>
        <Image src={carrotImage} width="30vw" height="40vh"></Image>
      </div>
      <div className={moduleCss.loginContainer}>
        <div className={moduleCss.loginIntro}>
          <div className={moduleCss.loggingIn}>Logging in</div>
          <div>Enter your username and password</div>
        </div>
        <Login />
      </div>
    </div>
  );
}
