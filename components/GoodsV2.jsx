import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import moduleCss from "../styles/Goods.module.css";
import addToCart from "../images/add_to_cart.png";

const Goods = ({ children }) => {
  const [showProductInfo, setShowProductInfo] = useState(false);
  const {_id, name, productImage, amountPerQty, discountedPrice} = children;

  return (
    <div className={moduleCss.productBackground} >
      <div className={moduleCss.productImage}><Image src={`data:image/png;base64,${productImage}`} layout="fill" objectFit="contain" quality={100}></Image></div>
      <div className={moduleCss.productTopPanel}>
        <div className={moduleCss.productName}>{name}</div>
        <div style={{ color: "rgba(124, 124, 124, 1)" }}>{amountPerQty}</div>
      </div>
      <div className={moduleCss.productBottomPanel}>
        <div>${discountedPrice.$numberDecimal}</div>
        <Link href={{pathname: "../product/[id]", query: {id:_id}}}>
          <div style={{cursor: "pointer", display: "flex"}} onClick={() => setShowProductInfo(true)}>
            <Image src={addToCart} width="30px" height="30px"></Image>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Goods;
