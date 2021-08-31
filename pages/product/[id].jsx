import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import moduleCss from "../../styles/product.module.css";
import Image from "next/image";
import Link from "next/link";
import Rating from "../../components/Rating"
import heartE from "../../images/heartEmpty.png";
import heartR from "../../images/heartRed.png";
import downArrow from "../../images/downArrow.png";
import expandArrow from "../../images/back arrow.png";
import backArrow from "../../images/back_arrow.png";
import add from "../../images/addQtyButton.png"
import reduce from "../../images/reduceQtyButton.png"
import apple from "../../images/apple.png";

const product = ({productItem}) => {
  const router = useRouter()
  console.log(productItem)

  const {_id, name, category, productImage, brand, amountPerQty, nutritions, productDetail, rating, discount, discountedPrice} = productItem[0];
  console.log(name)

  const [product, setProduct] = useState({
    name: name,
    productImage: productImage,
    amount: amountPerQty,
    quantity: 1,
    price: discountedPrice,
    productTotalPrice: 1,
    productDetail: productDetail,
    nutritions: nutritions,
    rating: rating,
  })

  const [showModal, setShowModal] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  const handleQuantityIncrease = (product) => {
    // const newCartList = [...cartList];

    const newProduct = {...product};
    newProduct.quantity++;
    newProduct.productTotalPrice = newProduct.price * newProduct.quantity
    setProduct(newProduct);
    // console.log(product)
  };

  const handleQuantityDecrease = (product) => {
    const newProduct = {...product};
    if (newProduct.quantity > 1){
      newProduct.quantity--
      newProduct.productTotalPrice = newProduct.price * newProduct.quantity
    }
    setProduct(newProduct);
    // console.log(product)
  };

  useEffect(() => {
    const newProduct = {...product};
    newProduct.productTotalPrice = newProduct.price * newProduct.quantity
    setProduct(newProduct) 
    // console.log(product)
  }, [])


  return (
    <div className={moduleCss.container}>
      <div className={moduleCss.upperPart}>
        <div className={moduleCss.backArrowImg} onClick={() => router.back()}><Image src={backArrow} width="8.4px" height="14px"></Image></div>
        <div className={moduleCss.productImage}><Image src={`data:image/png;base64,${product.productImage}`} layout="fill" objectFit="contain" quality={100}></Image></div>
      </div>
      <div>
        <div className={moduleCss.nameAndHeart}><div>{product.name}</div><div className={moduleCss.heartImg} onClick={() => setIsFavourite(!isFavourite)}><Image src={isFavourite ? heartR: heartE} layout="fill" objectFit="contain" quality={100}></Image></div></div>
        <div className={moduleCss.amount}>{product.amount}</div>  
        <div className={moduleCss.qtyAndPrice}><div className={moduleCss.qtyPanel}><div className={moduleCss.reduceQtyButton} onClick={() => handleQuantityDecrease(product)}><Image src={reduce} width="35px" height="35px"></Image></div><div>{product.quantity}</div><div className={moduleCss.addQtyButton} onClick={() => handleQuantityIncrease(product)}><Image src={add} width="35px" height="35px"></Image></div></div><div>${product.productTotalPrice}</div></div>
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

export async function getServerSideProps(context) {
  const data = await fetch(`http://localhost:3000/api/product/${context.params.id}`);
  const productData = await data.json();
  return {
    props: { productItem: productData },
  };
}

