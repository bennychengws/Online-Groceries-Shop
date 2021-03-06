import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Image from "next/image";
import Link from 'next/link'
import moduleCss from "../styles/NavBar.module.scss";
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
          <div className={moduleCss.home}>
            <Image src={isShop ? shopGreenIcon : shopIcon} layout="fill" objectFit="contain" quality={100}></Image>
          </div>
        </Link>
        <Link href="../explore">
          <div className={moduleCss.explore}>
            <Image src={isExplore ? exploreGreenIcon : exploreIcon} layout="fill" objectFit="contain" quality={100}></Image>
          </div>
        </Link>
        <Link href="../cart">
          <div className={moduleCss.cart}>
            <Image src={isCart ? cartGreenIcon : cartIcon} layout="fill" objectFit="cover" quality={100}></Image>
          </div>
        </Link>
        <Link href="../favourite">
          <div className={moduleCss.favourite}>
            <Image src={isFavourite ? favouriteGreenIcon : favouriteIcon} layout="fill" objectFit="contain" quality={100}></Image>
          </div>
        </Link >
        <Link href="../account">
          <div className={moduleCss.account}>
            <Image src={isAccount ? accountGreenIcon : accountIcon} layout="fill" objectFit="contain" quality={100}></Image>
          </div>
        </Link>

      </div>
  )
}

export default navBar
