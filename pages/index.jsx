
// import getConfig from 'next/config';
// import Jwt from "jsonwebtoken";
import authenticationCheck from "../lib/authenticationCheck";
import Image from "next/image";
import carrotImage from "../images/Group.png";
import moduleCss from "../styles/index.module.css";
import Layout from "../components/Layout";

// import { useState } from "react";
import Login from "../components/Login.jsx";

export default function Home() {
  // const onChange = (e) => {
  //   setFormData({ ...formData, uername: e.target.value });
  // };


  return (
    <Layout>
      <div className={moduleCss.container}>
        <div className={moduleCss.image}>
          <Image src={carrotImage} width="30vw" height="40vh"></Image>
        </div>
        <div className={moduleCss.loginContainer}>
          <div className={moduleCss.loginIntro}>
            <div className={moduleCss.loggingIn}>Login</div>
            <div className="text-gray-500">Enter your username and password</div>
          </div>
          <Login />
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // const { serverRuntimeConfig } = getConfig();
  // console.log(context.req.cookies.auth)
  // let authenticated = false;
  // Jwt.verify(context.req.cookies.auth, serverRuntimeConfig.secret, async function (err, decoded) {
  //   if (!err && decoded) {
  //     console.log("authenticated")
  //     authenticated = true;
  //   }
  // });
  // const authenticated = authenticationCheck(context)

  // if (authenticated) {
  //   return {
  //     redirect: {
  //       destination: '../home',
  //       permanent: true,
  //     },      
  //   };
  // }
  
  return {
    props: {},
  };
}