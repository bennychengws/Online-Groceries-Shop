import { useState } from "react";
import authenticationCheck from "../lib/authenticationCheck";
import Image from "next/image";
import carrotImage from "../images/Group.png";
import moduleCss from "../styles/index.module.scss";
import Layout from "../components/Layout";
import Login from "../components/Login.jsx";
import Notice from "../components/Notice";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Layout>
      <div className={moduleCss.container}>
        <div className={moduleCss.image}>
          <Image src={carrotImage} width="30vw" height="40vh"></Image>
        </div>
        <div className={moduleCss.loginContainer}>
          <div className={moduleCss.loginIntro}>
            <div className={moduleCss.loggingIn}>Login</div>
            <div className={moduleCss.instructionContainer}>
              <div className="text-gray-500">Enter your username and password</div>
              <div className={moduleCss.noticeContainer}><button onClick={() => setShowModal(true)}>Notice to Visitors</button></div>
            </div>
          </div>
          <Login />
        </div>
      </div>
      <Notice onClose={() => setShowModal(false)} show={showModal}></Notice>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const authenticated = authenticationCheck(context)

  if (authenticated) {
    return {
      redirect: {
        destination: '../home',
        permanent: true,
      },      
    };
  }
  
  return {
    props: {},
  };
}