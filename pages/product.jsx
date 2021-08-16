import { useState } from "react";
import Router from 'next/router'
import moduleCss from "../styles/product.module.css";
import Image from "next/image";
import Link from "next/link";
import Rating from "../components/Rating"
import heartE from "../images/heartEmpty.png";
import heartR from "../images/heartRed.png";
import downArrow from "../images/downArrow.png";
import expandArrow from "../images/back arrow.png";
import backArrow from "../images/back_arrow.png";
import add from "../images/addQtyButton.png"
import reduce from "../images/reduceQtyButton.png"
import apple from "../images/apple.png";

const product = () => {
  const product = {
    name: "Natural Red Apple",
    productImage: <Image src={apple} layout="fill" objectFit="contain" quality={100}></Image>,
    amount: "6pcs",
    quantity: 1,
    price: 20,
    productDetail:
      "Apples are nutritious. Apples may be good for weight loss. Apples may be good for your heart. As kind of a healthful and varied diet.",
    nutritions: "100g",
    rating: 4.3,
  };

  const [showModal, setShowModal] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);


  return (
    <div className={moduleCss.container}>
      <div className={moduleCss.upperPart}>
        <div className={moduleCss.backArrowImg} onClick={() => Router.back()}><Image src={backArrow} width="8.4px" height="14px"></Image></div>
        <div className={moduleCss.productImage}>{product.productImage}</div>
      </div>
      <div>
        <div className={moduleCss.nameAndHeart}><div>{product.name}</div><div className={moduleCss.heartImg} onClick={() => setIsFavourite(!isFavourite)}><Image src={isFavourite ? heartR: heartE} layout="fill" objectFit="contain" quality={100}></Image></div></div>
        <div className={moduleCss.amount}>{product.amount}</div>  
        <div className={moduleCss.qtyAndPrice}><div className={moduleCss.qtyPanel}><div className={moduleCss.reduceQtyButton}><Image src={reduce} width="35px" height="35px"></Image></div><div>{product.quantity}</div><div className={moduleCss.addQtyButton}><Image src={add} width="35px" height="35px"></Image></div></div><div>${product.price}</div></div>
        <div className={moduleCss.productDetailPanel}><div className={moduleCss.productDetailAndExpand} onClick={() => setIsCollapsed(!isCollapsed)}><div className={moduleCss.infoTitle}>Product Detail</div><div className={moduleCss.expandButton}>{isCollapsed ? <Image src={downArrow} width="14px" height="8.4px"></Image> : <Image src={expandArrow} width="8.4px" height="14px"></Image>}</div></div><div className={moduleCss.productDetail} style={{display: isCollapsed ? "block" : "none"}}>{product.productDetail}</div></div>
        <div className={moduleCss.infoPanel}><div className={moduleCss.infoTitle}>Nutritions</div><div className={moduleCss.nutri}>{product.nutritions}</div></div>
        <div className={moduleCss.infoPanel}>
          <div className={moduleCss.infoTitle}>Review</div>
          <div><Rating>{product.rating}</Rating></div>
        </div>
      </div> 
      <Link href="../cart">
          <button className={moduleCss.addToBasket} onClick={() => setShowModal(true)}>Add To Basket</button>
      </Link> 
    </div>
  );
};

export default product;
