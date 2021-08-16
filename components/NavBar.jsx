import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Image from "next/image";
import Link from 'next/link'
import moduleCss from "../styles/NavBar.module.css";
import shopIcon from "../images/shop.png";
import shopGreenIcon from "../images/shop_green.png";
import exploreIcon from "../images/explore.png";
import exploreGreenIcon from "../images/explore_green.png";
import cartIcon from "../images/cart.png"
import cartGreenIcon from "../images/cart_green.png"
import favouriteIcon from "../images/favourite.png"
import favouriteGreenIcon from "../images/favourite_green.png"
import accountIcon from "../images/account.png";
import accountGreenIcon from "../images/account_green.png";

// {console.log(router.pathname)}

const navBar = () => {
  const [isShop, setIsShop] = useState(false);
  const [isExplore, setIsExplore] = useState(false);
  const [isCart, setIsCart] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isAccount, setIsAccount] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const path = router.pathname
    console.log("current pathname: " + path)
    switch (path) {
      case "/home":
        setIsShop(true)
        break;
      case "/explore":
        setIsExplore(true)
        break;

      case "/cart":
        setIsCart(true)
        break;

      case "/favourite":
        setIsFavourite(true)
        break;

      case "/account":
        setIsAccount(true)
        break;

      default:
        console.log("non-navbar's path")
    }
  })

  return (
      <div className={moduleCss.container}>

        <Link href="../home">
          <Image src={isShop ? shopGreenIcon : shopIcon} width="29px" height="42.17px" className={moduleCss.every}></Image>
        </Link>
        <Link href="../explore">
          <Image src={isExplore ? exploreGreenIcon : exploreIcon} width="41px" height="38.45px" className={moduleCss.every}></Image>
        </Link>
        <Link href="../cart">
          <Image src={isCart ? cartGreenIcon : cartIcon} width="26px" height="39.73px" className={moduleCss.every}></Image>
        </Link>
        <Link href="../favourite">
          <Image src={isFavourite ? favouriteGreenIcon : favouriteIcon} width="53px" height="41.59px" className={moduleCss.every}></Image>
        </Link >
        <Link href="../account">
        <Image src={isAccount ? accountGreenIcon : accountIcon} width="46px" height="42.17px" className={moduleCss.every}></Image>
        </Link>

      </div>
  )
}

export default navBar
