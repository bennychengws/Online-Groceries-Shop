import { useState } from "react";
import Image from "next/image";
import moduleCss from "../styles/favourite.module.css";
import NavBar from "../components/NavBar";
import backArrow from "../images/back arrow.png";
import coca from "../images/coca_cola.png";
import pepsi from "../images/pepsi.png";
import dietCoke from "../images/diet_coke.png";
import appleJuice from "../images/apple_juice.png";
import sprite from "../images/sprite_can.png";


const favourite = () => {
  const favouriteList = [
    {
      name: "Diet Coke",
      productImage: (
        <Image src={dietCoke} width="44.49px" height="89.36px"></Image>
      ),
      amount: "355ml",
      price: 7,
    },
    {
      name: "Sprite Can",
      productImage: (
        <Image src={sprite} width="51.68px" height="91.77px"></Image>
      ),
      amount: "325ml",
      price: 6.5,
    },
    {
      name: "Apple & Grape Juice",
      productImage: (
        <Image src={appleJuice} width="81.68px" height="93.21px"></Image>
      ),
      amount: "2L",
      price: 15,
    },
    {
      name: "Coca Cola Can",
      productImage: <Image src={coca} width="48.82px" height="90.44px"></Image>,
      amount: "325ml",
      price: 6.8,
    },
    {
      name: "Pepsi Can",
      productImage: (
        <Image src={pepsi} width="49.52px" height="94.59px"></Image>
      ),
      amount: "330ml",
      price: 6.8,
    },

  ];
  const [showModal, setShowModal] = useState(false);
  const [isLastItem, setIsLastItem] = useState(false); 

  return (
    <div>
      <div className={moduleCss.container}>
        <div className={moduleCss.title}>Favourite</div>
        <div className={moduleCss.itemContentWrapper}>
          {favouriteList.map((item) => (
            <div key={item.name} className={moduleCss.itemContent} style={{}}><div className={moduleCss.imgAndDescription}><div className={moduleCss.itemImage}>{item.productImage}</div><div><div className={moduleCss.name}>{item.name}</div><div className={moduleCss.amount}>{item.amount}</div></div></div><div></div><div className={moduleCss.priceAndArrow}><div>${item.price}</div><div className={moduleCss.arrowContainer}><Image src={backArrow} width="8.4px" height="14px"></Image></div></div></div>
          ))}
        </div>
        <button className={moduleCss.addAllToCart} onClick={() => setShowModal(true)}>Add All To Cart</button>
            {console.log(favouriteList[favouriteList.length-1])}
      </div>
      <NavBar />
    </div>
  );
};

export default favourite;
