import React, { useEffect, useState } from "react";
import moduleCss from "../../styles/Category.module.css";
import Image from "next/image";
// import { useRouter } from 'next/router'
import NavBar from "../../components/NavBar";
import backArrow from "../../images/back_arrow.png";
import filterIcon from "../../images/Filter.png";
import Filters from "../../components/Filters";
import coca from "../../images/coca_cola.png";
import pepsi from "../../images/pepsi.png";
import dietCoke from "../../images/diet_coke.png";
import orangeJuice from "../../images/orange_juice.png";
import appleJuice from "../../images/apple_juice.png";
import sprite from "../../images/sprite_can.png";
import Goods from "../../components/Goods";

export async function getServerSideProps(context) {
  console.log(context.query) 
  // returns { id: episode.itunes.episode, title: episode.title}
  

  //you can make DB queries using the data in context.query
  return {
      props: { 
         title: context.query.title //pass it to the page props
      }
  }
}

const cookingOilAndGhee = (props) => {
  // const router = useRouter();
  const [showFilter, setShowFilter] = useState(false);
  const beverageList = [
    {
      name: "Diet Coke",
      productImage: <Image src={dietCoke} width="35px" height="80px"></Image>,
      amount: "355ml",
      price: 7,
    },
    {
      name: "Sprite Can",
      productImage: <Image src={sprite} width="45px" height="80px"></Image>,
      amount: "325ml",
      price: 6.5,
    },
    {
      name: "Apple & Grape Juice",
      productImage: <Image src={appleJuice} width="80px" height="80px"></Image>,
      amount: "2L",
      price: 15,
    },
    {
      name: "Orange Juice",
      productImage: (
        <Image src={orangeJuice} width="80px" height="80px"></Image>
      ),
      amount: "2L",
      price: 15,
    },
    {
      name: "Coca Cola Can",
      productImage: <Image src={coca} width="45px" height="80px"></Image>,
      amount: "325ml",
      price: 6.8,
    },
    {
      name: "Pepsi Can",
      productImage: <Image src={pepsi} width="45px" height="80px"></Image>,
      amount: "330ml",
      price: 6.8,
    },
  ];

  return (
    <div className={moduleCss.container} style={{overflow: showFilter ? "hidden" : "auto", height: showFilter ? "100vh": "auto"}}>
      <div className={moduleCss.topPanel}>
        <div></div>
        {/* <div className={moduleCss.back} onClick={() => router.back()}>
          <Image src={backArrow} width="10px" height="18px"></Image>
        </div> */}
        <div className={moduleCss.childrenTitle}>{props.title}</div>
        <div
          className={moduleCss.filter}
          onClick={() => (setShowFilter(true), console.log("Clicked"))}
        >
          <Image src={filterIcon} width="16.8px" height="17.85px"></Image>
        </div>
      </div>
      <div className={moduleCss.productContainer}>
        {beverageList.map((item, index) => (
          <Goods key={index}>{item}</Goods>
        ))}
      </div>
      <NavBar/>
      <Filters onClose={() => setShowFilter(false)} show={showFilter}></Filters>
    </div>
  );
};

export default cookingOilAndGhee;