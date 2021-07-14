import React, { useState } from "react";
import Image from "next/image";
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

  return (
    <div>
      <Image src={shopIcon} width="40vw" height="40vh"></Image>
      <Image src={exploreIcon} width="40vw" height="40vh"></Image>
      <Image src={cartIcon} width="40vw" height="40vh"></Image>
      <Image src={favouriteIcon} width="40vw" height="40vh"></Image>
      <Image src={accountIcon} width="40vw" height="40vh"></Image>
    </div>
  )
}

export default navBar
