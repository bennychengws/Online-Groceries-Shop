import Image from "next/image";
import Link from 'next/link'
import SearchBox from "../components/SearchBox";
import moduleCss from '../styles/explore.module.css';
import { useRouter } from "next/router";
import { useState } from "react";
import NavBar from "../components/NavBar";
import fruits from "../images/fruits_&_vegetables.png";
import oil from "../images/cooking_oil_&_ghee.png";
import meat from "../images/meat_&_fish.png"
import bakery from "../images/bakery_&_snacks.png"
import eggs from "../images/dairy_&_eggs.png"
import drinks from "../images/beverages.png"
import Category from "../components/Category"
import Filters from "../components/Filters"

const explore = () => {

  const [showModal, setShowModal] = useState(false);
  const [categoryContent, setCategoryContent] = useState("");
  const categoryList = [
    {
      title: "Fresh Fruits & Vegetables",
      image: <Image src={fruits} width="100vw" height="70vh"></Image>,
      categoryStyle: moduleCss.fruits
    },
    {
      title: "Cooking Oil & Ghee",
      image: <Image src={oil} width="100vw" height="75vh"></Image>,
      categoryStyle: moduleCss.oil
    },
    {
      title: "Meat & Fish",
      image: <Image src={meat} width="100vw" height="90vh"></Image>,
      categoryStyle: moduleCss.meat
    },
    {
      title: "Bakery & Snacks",
      image: <Image src={bakery} width="100vw" height="80vh"></Image>,
      categoryStyle: moduleCss.bakery
    },
    {
      title: "Dairy & Eggs",
      image: <Image src={eggs} width="100vw" height="70vh"></Image>,
      categoryStyle: moduleCss.eggs
    },
    {
      title: "Beverages",
      image: <Image src={drinks} width="100vw" height="70vh"></Image>,
      categoryStyle: moduleCss.drinks
    },
  ]
  const router = useRouter()

  return (
    <div>
      <div className={moduleCss.container}>
        <div className={moduleCss.title}>Find Products</div>
        <SearchBox/>
        <div className={moduleCss.productContainer}>
          {categoryList.map((item) => (
            <div key={item.title} className={`${moduleCss.categroy} ${item.categoryStyle}`} onClick={()=>(setShowModal(true), setCategoryContent(item.title))}>
              {item.image}
              <div>{item.title}</div>
          </div>
          ))}
        </div>
      </div>
      <NavBar />
      <Category
        onClose={() => setShowModal(false)}
        show={showModal}
      >
        {categoryContent}
      </Category>
    </div>
  )
}


export default explore
