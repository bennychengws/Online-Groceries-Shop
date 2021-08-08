import React from "react";
import Image from "next/image";
import Link from "next/link";
import moduleCss from "../styles/Goods.module.css";
import addToCart from "../images/add_to_cart.png";

const Goods = ({ children }) => {
  const { name, productImage, amount, price } = children;
  return (
    <div className={moduleCss.productBackground}>
      <div>{productImage}</div>
      <div className={moduleCss.productTopPanel}>
        <div className={moduleCss.productName}>{name}</div>
        <div style={{ color: "rgba(124, 124, 124, 1)" }}>{amount}</div>
      </div>
      <div className={moduleCss.productBottomPanel}>
        <div>${price}</div>
        <Link href="../product">
        <div style={{cursor: "pointer"}}>
          <Image src={addToCart} width="35px" height="35px"></Image>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default Goods;
