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
  const router = useRouter()

  return (
    <div>
      <div className={moduleCss.container}>
        <div className={moduleCss.title}>Find Products</div>
        <SearchBox/>
        <div className={moduleCss.productContainer}>
          <Link href="">
            <div className={`${moduleCss.categroy} ${moduleCss.fruits}`} onClick={()=>(setShowModal(true), setCategoryContent("Fresh Fruits & Vegetables"))}>
              <Image src={fruits} width="100vw" height="70vh"></Image>
              <div>Fresh Fruits & Vegetables</div>
            </div>
          </Link>
          <Link href="">
            <div className={`${moduleCss.categroy} ${moduleCss.oil}`} onClick={()=>(setShowModal(true), setCategoryContent("Cooking Oil & Ghee"))}>
              <Image src={oil} width="100vw" height="75vh"></Image>
              <div>Cooking Oil & Ghee</div>
            </div>
          </Link>
          <Link href="">
            <div className={`${moduleCss.categroy} ${moduleCss.meat}`} onClick={()=>(setShowModal(true), setCategoryContent("Meat & Fish"))}>
              <Image src={meat} width="100vw" height="90vh"></Image>
              <div>Meat & Fish</div>
            </div>
          </Link>
          <Link href="">
            <div className={`${moduleCss.categroy} ${moduleCss.bakery}`} onClick={()=>(setShowModal(true), setCategoryContent("Bakery & Snacks"))}>
              <Image src={bakery} width="100vw" height="80vh"></Image>
              <div>Bakery & Snacks</div>
            </div>
          </Link>
          <Link href="">
            <div className={`${moduleCss.categroy} ${moduleCss.eggs}`} onClick={()=>(setShowModal(true), setCategoryContent("Dairy & Eggs"))}>
              <Image src={eggs} width="100vw" height="70vh"></Image>
              <div>Dairy & Eggs</div>
            </div>
          </Link>
          <Link href="">
            <div className={`${moduleCss.categroy} ${moduleCss.drinks}`} onClick={()=>(setShowModal(true), setCategoryContent("Beverages"))}>
              <Image src={drinks} width="100vw" height="70vh"></Image>
              <div>Beverages</div>
            </div>
          </Link>

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
