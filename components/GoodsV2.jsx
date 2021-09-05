import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import Product from "../components/Product"
import moduleCss from "../styles/Goods.module.css";
import addToCart from "../images/add_to_cart.png";
import apple from "../images/apple.png";

const Goods = ({ children }) => {
  const [showProductInfo, setShowProductInfo] = useState(false);
  const {_id, name, productImage, amountPerQty, discountedPrice} = children;
  const productInfo = {
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
  // console.log([name, productImage, amountPerQty, discountedPrice])
  // console.log(children)

  return (
    <div className={moduleCss.productBackground} >
      <div className={moduleCss.productImage}><Image src={`data:image/png;base64,${productImage}`} layout="fill" objectFit="contain" quality={100}></Image></div>
      <div className={moduleCss.productTopPanel}>
        <div className={moduleCss.productName}>{name}</div>
        <div style={{ color: "rgba(124, 124, 124, 1)" }}>{amountPerQty}</div>
      </div>
      <div className={moduleCss.productBottomPanel}>
        <div>${discountedPrice}</div>
        <Link href={{pathname: "../product/[id]", query: {id:_id}}}>
          <div style={{cursor: "pointer", display: "flex"}} onClick={() => setShowProductInfo(true)}>
            <Image src={addToCart} width="30px" height="30px"></Image>
          </div>
        </Link>
      </div>
      {/* <Product
        onClose={() => setShowProductInfo(false)}
        show={showProductInfo}
      >
        {productInfo}
      </Product> */}
    </div>
  );
};

export default Goods;
