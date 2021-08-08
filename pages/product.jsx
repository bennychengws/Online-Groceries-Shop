import { useState } from "react";
import moduleCss from "../styles/product.module.css";
import Image from "next/image";
import Link from "next/link";
import heartE from "../images/heartEmpty.png";
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
    rating: 5,
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <div className={moduleCss.container}>
      <div className={moduleCss.upperPart}>
        <div className={moduleCss.backArrowImg}><Image src={backArrow} width="8.4px" height="14px"></Image></div>
        <div className={moduleCss.productImage}>{product.productImage}</div>
      </div>
      <div>
        <div><div>{product.name}</div><div><Image src={heartE} width="24px" height="24px"></Image></div></div>
        <div>{product.amount}</div>  
        <div><div><div><Image src={add} width="35px" height="35px"></Image></div><div>{product.quantity}</div><div><Image src={reduce} width="35px" height="35px"></Image></div></div><div>${product.price}</div></div>
        <div><div><div>Product Detail</div><div><Image src={expandArrow} width="8.4px" height="14px"></Image></div></div><div>{product.productDetail}</div></div>
        <div><div>Nutritions</div><div>{product.nutritions}</div></div>
        <div><div>Review</div><div>{product.rating}</div></div>
      </div> 
      <Link href="../cart">
          <button className={moduleCss.addToBasket} onClick={() => setShowModal(true)}>Add To Basket</button>
      </Link> 
    </div>
  );
};

export default product;
