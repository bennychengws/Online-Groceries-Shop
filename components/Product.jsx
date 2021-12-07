import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import moduleCss from "../styles/product.module.scss";
import Image from "next/image";
import Link from "next/link";
import Rating from "../components/Rating"
import heartE from "../images/heartEmpty.png";
import heartR from "../images/heartRed.png"
import downArrow from "../images/downArrow.png";
import expandArrow from "../images/back arrow.png";
import backArrow from "../images/back_arrow.png";
import add from "../images/addQtyButton.png"
import reduce from "../images/reduceQtyButton.png"

const Product = ({ show, onClose, children }) => {
  const { name, productImage, amount, quantity, price, productDetail, nutritions, rating } = children
  const [isBrowser, setIsBrowser] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
    console.log("product created");
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div className={moduleCss.container}>
      <div className={moduleCss.upperPart}>
        <div className={moduleCss.backArrowImg} onClick={handleCloseClick}><Image src={backArrow} width="8.4px" height="14px"></Image></div>
        <div className={moduleCss.productImage}>{productImage}</div>
      </div>
      <div>
        <div className={moduleCss.nameAndHeart}><div>{name}</div><div className={moduleCss.heartImg} onClick={() => setIsFavourite(!isFavourite)}><Image src={isFavourite ? heartR : heartE} layout="fill" objectFit="contain" quality={100}></Image></div></div>
        <div className={moduleCss.amount}>{amount}</div>
        <div className={moduleCss.qtyAndPrice}><div className={moduleCss.qtyPanel}><div className={moduleCss.reduceQtyButton}><Image src={reduce} width="35px" height="35px"></Image></div><div>{quantity}</div><div className={moduleCss.addQtyButton}><Image src={add} width="35px" height="35px"></Image></div></div><div>${price}</div></div>
        <div className={moduleCss.productDetailPanel}><div className={moduleCss.productDetailAndExpand} onClick={() => setIsCollapsed(!isCollapsed)}><div className={moduleCss.infoTitle}>Product Detail</div><div className={moduleCss.expandButton}>{isCollapsed ? <Image src={downArrow} width="14px" height="8.4px"></Image> : <Image src={expandArrow} width="8.4px" height="14px"></Image>}</div></div><div className={moduleCss.productDetail} style={{ display: isCollapsed ? "block" : "none" }}>{productDetail}</div></div>
        <div className={moduleCss.infoPanel}><div className={moduleCss.infoTitle}>Nutritions</div><div className={moduleCss.nutri}>{nutritions}</div></div>
        <div className={moduleCss.infoPanel}>
          <div className={moduleCss.infoTitle}>Review</div>
          <div><Rating>{rating}</Rating></div>
        </div>
      </div>
      <Link href="../cart">
        <button className={moduleCss.addToBasket} onClick={() => setShowModal(true)}>Add To Basket</button>
      </Link>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("product-root")
    );
  } else {
    return null;
  }
}

export default Product
