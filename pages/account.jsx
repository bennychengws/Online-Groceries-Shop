import React from "react";
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

const account = () => {
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

  return (
    <div className={moduleCss.container}>
      <div className={moduleCss.accContainerWrapper}>
        <div className={moduleCss.accContainer}>
          <div className={moduleCss.iconContainer}>
            <Image src={accIcon} width="46px" height="48px"></Image>
          </div>
          <div>
            <div className={moduleCss.accDetails}>
              <div>Afsar Hossen</div>
              <div style={{ marginLeft: "5px" }}>
                <Image src={pencil} width="15px" height="15px"></Image>
              </div>
            </div>
            <div>Imsuvo97@gmail.com</div>
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
      <Link href="../">
      <div className={moduleCss.logOutButton}>
        <div className={moduleCss.logOutIcon}>
          <Image src={logOut} width="18px" height="18px"></Image>
        </div>
        <div>Log Out</div>
        <div></div>
      </div>
      </Link>
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
  
  return {
    props: {},
  };
}