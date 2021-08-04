import React from "react";
import Image from "next/image";
import moduleCss from "../styles/Category.module.css";
import addToCart from "../images/add_to_cart.png";


const Goods = ({ children }) => {
  const { name, productImage, amount, price } = children;
  return (
    <div className={moduleCss.productBackground}>
      {productImage}
      <div className={moduleCss.productTopPanel}>
        <div className={moduleCss.productName}>{name}</div>
        <div style={{ color: "rgba(124, 124, 124, 1)" }}>{amount}</div>
      </div>
      <div className={moduleCss.productBottomPanel}>
        <div>${price}</div>
        <div>
          <Image src={addToCart} width="45.67px" height="45.67px"></Image>
        </div>
      </div>
    </div>
  );
};

export default Goods;
