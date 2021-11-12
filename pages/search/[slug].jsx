import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import moduleCss from "../../styles/search.module.css";
import Image from "next/image";
// import { useRouter } from 'next/router'
import NavBar from "../../components/NavBar";
import backArrow from "../../images/back_arrow.png";
import authenticationCheck from "../../lib/authenticationCheck";
import filterIcon from "../../images/Filter.png";
import Filters from "../../components/Filters";
import SearchBox from "../../components/SearchBox";
import coca from "../../images/coca_cola.png";
import pepsi from "../../images/pepsi.png";
import dietCoke from "../../images/diet_coke.png";
import orangeJuice from "../../images/orange_juice.png";
import appleJuice from "../../images/apple_juice.png";
import sprite from "../../images/sprite_can.png";
import GoodsV2 from "../../components/GoodsV2";
import Goods from "../../components/Goods";


const search = (props) => {
  // const router = useRouter();
  // console.log(props.data)
  // const [searchQuery, setSearchQuery] = useState(" ");
  // const handleSearchBoxSubmit = (event) => {
  //   event.preventDefault();
  //   router.push(`/search?=${searchQuery}`);
  //   return null
  // }
  const {data} = props
//   console.log("passed data: " + data)
  const [showFilter, setShowFilter] = useState(false);
  // console.log(data)
  const [displayedData, setDisplayedData] = useState([])
  const [categorySet, setCategorySet] = useState(new Set())
  const [brandSet, setBrandSet] = useState(new Set())

  useEffect(()=>{
    setDisplayedData(data)
  })
  // const [catList, setCatList] = useState([]);
  // const [brandList, setBrandList] = useState([]);
  // const beverageList = [
  //   {
  //     name: "Diet Coke",
  //     productImage: <Image src={dietCoke} width="35px" height="80px"></Image>,
  //     amount: "355ml",
  //     price: 7,
  //   },
  //   {
  //     name: "Sprite Can",
  //     productImage: <Image src={sprite} width="45px" height="80px"></Image>,
  //     amount: "325ml",
  //     price: 6.5,
  //   },
  //   {
  //     name: "Apple & Grape Juice",
  //     productImage: <Image src={appleJuice} width="80px" height="80px"></Image>,
  //     amount: "2L",
  //     price: 15,
  //   },
  //   {
  //     name: "Orange Juice",
  //     productImage: (
  //       <Image src={orangeJuice} width="80px" height="80px"></Image>
  //     ),
  //     amount: "2L",
  //     price: 15,
  //   },
  //   {
  //     name: "Coca Cola Can",
  //     productImage: <Image src={coca} width="45px" height="80px"></Image>,
  //     amount: "325ml",
  //     price: 6.8,
  //   },
  //   {
  //     name: "Pepsi Can",
  //     productImage: <Image src={pepsi} width="45px" height="80px"></Image>,
  //     amount: "330ml",
  //     price: 6.8,
  //   },
  // ];
  
  // useEffect(() =>{
  //   var categoryList = []
  //   for (var i = 0; i < data.length; i++ ) {
  //     for (var j = 0; j < data.length; j++ ) {
  //       if (data[i].categoryTags[j] !== undefined) {
  //         categoryList.push(data[i].categoryTags[j])
  //       }
  //     }
  //   }
  //   console.log(categoryList) 
  // })

  useEffect(() => {
    var categories = new Set()
    for (var i = 0; i < data.length; i++ ) {
      for (var j = 0; j < data.length; j++ ) {
        if (data[i].categoryTags[j] !== undefined) {
          categories.add(data[i].categoryTags[j])
        }
      }
    }    
    setCategorySet(categories)
  }, [])

  useEffect(() => {
    var brands = new Set()
    for (var i = 0; i < data.length; i++ ) {
      brands.add(data[i].brand)
    }    
    setBrandSet(brands)
  }, [])

  return (
    <div className={moduleCss.container} style={{ overflow: showFilter ? "hidden" : "auto", height: showFilter ? "100vh" : "auto" }}>
      <div className={moduleCss.topPanel}>
        {/* <div className={moduleCss.back} onClick={() => router.back()}>
          <Image src={backArrow} width="10px" height="18px"></Image>
        </div> */}
        {/* <div className={moduleCss.childrenTitle}>{children.title}</div> */}
          <SearchBox/>
        <div
          className={moduleCss.filter}
          onClick={() => (setShowFilter(true), console.log("Clicked"))}
        >
          <Image src={filterIcon} width="16.8px" height="17.85px"></Image>
        </div>
      </div>
      <div className={moduleCss.productContainer}>
        {/* {beverageList.map((item, index) => (
          <Goods key={index}>{item}</Goods>
        ))} */}
        {displayedData.map((item, index) => (
          <GoodsV2 key={index}>{item}</GoodsV2>
        ))}        
      </div>
      <NavBar />
      <Filters onClose={() => setShowFilter(false)} show={showFilter} categoryData={Array.from(categorySet)} brandData={Array.from(brandSet)}></Filters>
    </div>
  );
};

export default search;

export async function getServerSideProps(context) {
  const authenticated = authenticationCheck(context)
  if (!authenticated) {
    return {redirect: {destination: '/', permanent: true,}, };
  }
  const data = await fetch(`http://localhost:3000/api/search/${context.params.slug}`);
  const productData = await data.json();
//   console.log("server side:" + productData)
  return {
    props: {
      data: productData

    }
  }
}

// export async function getServerSideProps(context) {

//   switch (context.params.category) {
//     case "fresh-fruits-and-vegetables":
//       var title = "Fresh Fruits & Vegetables"
//       break;
//     case "cooking-oil-and-ghee":
//       var title = "Cooking Oil & Ghee"
//       break;
//     case "meat-and-fish":
//       var title = "Meat & Fish"
//       break;
//     case "bakery-and-snacks":
//       var title = "Bakery & Snacks"
//       break;
//     case "dairy-and-eggs":
//       var title = "Dairy & Eggs"
//       break;
//     case "beverages":
//       var title = "Beverages"
//       break;
//     case "groceries":
//       var title = "Groceries"
//       break;
//   }

//   const data = await fetch(`http://localhost:3000/api/explore/${context.params.category}`);
//   const productData = await data.json();

//   //you can make DB queries using the data in context.query
//   return {
//     props: {
//       title: title,
//       categoryData: productData //pass it to the page props
//     }
//   }
// }