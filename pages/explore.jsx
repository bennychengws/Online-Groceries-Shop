import Image from "next/image";
import Link from "next/link";
import SearchBox from "../components/SearchBox";
import moduleCss from "../styles/explore.module.scss";
import { useState } from "react";
import NavBar from "../components/NavBar";
import fruits from "../images/fruits_&_vegetables.png";
import oil from "../images/cooking_oil_&_ghee.png";
import meat from "../images/meat_&_fish.png";
import bakery from "../images/bakery_&_snacks.png";
import eggs from "../images/dairy_&_eggs.png";
import drinks from "../images/beverages.png";
import groceries from "../images/groceries.png";
import authenticationCheck from "../lib/authenticationCheck";

const explore = () => {
  const [showModal, setShowModal] = useState(false);
  const categoryList = [
    {
      id: "fresh-fruits-and-vegetables",
      title: "Fresh Fruits & Vegetables",
      image: <Image src={fruits} width="100vw" height="70vh"></Image>,
      categoryStyle: moduleCss.fruits,
    },
    {
      id: "cooking-oil-and-ghee",
      title: "Cooking Oil & Ghee",
      image: <Image src={oil} width="100vw" height="75vh"></Image>,
      categoryStyle: moduleCss.oil,
    },
    {
      id: "meat-and-fish",
      title: "Meat & Fish",
      image: <Image src={meat} width="100vw" height="90vh"></Image>,
      categoryStyle: moduleCss.meat,
    },
    {
      id: "bakery-and-snacks",
      title: "Bakery & Snacks",
      image: <Image src={bakery} width="100vw" height="80vh"></Image>,
      categoryStyle: moduleCss.bakery,
    },
    {
      id: "dairy-and-eggs",
      title: "Dairy & Eggs",
      image: <Image src={eggs} width="100vw" height="70vh"></Image>,
      categoryStyle: moduleCss.eggs,
    },
    {
      id: "beverages",
      title: "Beverages",
      image: <Image src={drinks} width="100vw" height="70vh"></Image>,
      categoryStyle: moduleCss.drinks,
    },
    {
      id: "groceries",
      title: "Groceries",
      image: <Image src={groceries} width="100vw" height="70vh"></Image>,
      categoryStyle: moduleCss.groceries,
    },
  ];

  return (
    <div>
      <div className={moduleCss.container} style={{overflow: showModal ? "hidden" : "auto", height: showModal ? "100vh": "auto"}}>
        <h1>Find Products</h1>
        <div className={moduleCss.searchBoxContainer}>
          <SearchBox />
        </div>
        <div className={moduleCss.productContainer}>
          {categoryList.map((item) => (
            <Link key={item.id} href={{pathname: "explore/[category]", query: {category: item.id}}}>
              <div className={`${moduleCss.category} ${item.categoryStyle}`}>
                {item.image}
                <div>{item.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <NavBar/>
      {/* <Category onClose={() => setShowModal(false)} show={showModal}>
        {categoryContent}
      </Category> */}
    </div>
  );
};

export default explore;

export async function getServerSideProps(context) {
  const authenticated = authenticationCheck(context)

  if (!authenticated) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },      
    };
  }
  
  return {
    props: {},
  };
}