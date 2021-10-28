import { useState, useEffect, useContext  } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import moduleCss from "../styles/home.module.css";
import NavBar from "../components/NavBar";
import SearchBox from "../components/SearchBox";
import Slider from "../components/Slider";
import Goods from "../components/Goods";
import GoodsV2 from "../components/GoodsV2";
import Category from "../components/Category";
import carrotImage from "../images/Group.png";
import location from "../images/locationicon.png";
import fruits from "../images/fruits_&_vegetables.png";
import eggs from "../images/dairy_&_eggs.png";
import drinks from "../images/beverages.png";
import banana from "../images/banana.png";
import apple from "../images/apple.png";
import pear from "../images/pear.png";
import bellPR from "../images/bellPepperR.png";
import ginger from "../images/ginger.png";
import chicken from "../images/chicken.png";
import beefBone from "../images/beefBone.png";
import rice from "../images/rice.png";
import pulses from "../images/pulses.png";
// import {fetchWrapper} from "../lib/fetchWrapper";
import authenticationCheck from "../lib/authenticationCheck";
import axios from "axios"
import jwt_decode from "jwt-decode";
import fetchHandler from "../lib/fetchHandler";
// import { UserContext } from "../context/UserContext";
import { useUserContext } from "../context/UserContext";

const home = ({products, account}) => {
  // const {userState, setUserContent} = useContext(UserContext);
  // const [userState, setUserState] = useUserContext()
  const [userState, dispatch] = useUserContext()
  // dispatch({type: "init_stored", value: account})

  useEffect(() => {
    // setUserContent(account)
    // setUserState(account)
    dispatch({type: "init_stored", value: account})
  }, [])

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //   localStorage.setItem('myAccount', JSON.stringify(userState))
  //   }
  // }, [userState])  

  console.log(userState)

  const promoList = [
    {
      categoryName: "Fresh Vegetables",
      content: "Get Up To 40% OFF",
      image: <Image src={fruits} width="150px" height="100px"></Image>,
      bgColor: moduleCss.vegeColor,
      contentColor: moduleCss.vegeContentColor,
      linkTo: "../explore",
    },
    {
      categoryName: "Fresh Eggs",
      content: "Click and Shop",
      image: <Image src={eggs} width="100px" height="100px"></Image>,
      bgColor: moduleCss.eggColor,
      contentColor: moduleCss.eggContentColor,
      linkTo: "../explore",
    },
    {
      categoryName: "New Drinks",
      content: "Find Out What You Want",
      image: <Image src={drinks} width="100px" height="100px"></Image>,
      bgColor: moduleCss.drinkColor,
      contentColor: moduleCss.drinkContentColor,
      linkTo: "../explore",
    },
  ];

  // const offerList = [
  //   {
  //     name: "Organic Bananas",
  //     productImage: <Image src={banana} width="93" height="63px"></Image>,
  //     amount: "7pcs",
  //     price: 35,
  //   },
  //   {
  //     name: "Red Apple",
  //     productImage: <Image src={apple} width="93px" height="63px"></Image>,
  //     amount: "6pcs",
  //     price: 20,
  //   },
  //   {
  //     name: "Pear",
  //     productImage: <Image src={pear} width="93px" height="63px"></Image>,
  //     amount: "4pcs",
  //     price: 12,
  //   },
  //   {
  //     name: "Pear2",
  //     productImage: <Image src={pear} width="93px" height="63px"></Image>,
  //     amount: "4pcs",
  //     price: 12,
  //   },
  //   {
  //     name: "Pear3",
  //     productImage: <Image src={pear} width="93px" height="63px"></Image>,
  //     amount: "4pcs",
  //     price: 12,
  //   },
  //   {
  //     name: "Pear4",
  //     productImage: <Image src={pear} width="93px" height="63px"></Image>,
  //     amount: "4pcs",
  //     price: 12,
  //   },
  //   {
  //     name: "Pear5",
  //     productImage: <Image src={pear} width="93px" height="63px"></Image>,
  //     amount: "4pcs",
  //     price: 12,
  //   },
  // ];

  // const bestSellingList = [
  //   {
  //     name: "Bell Pepper Red",
  //     productImage: <Image src={bellPR} width="93px" height="63px"></Image>,
  //     amount: "800kg",
  //     price: 25,
  //   },
  //   {
  //     name: "Ginger",
  //     productImage: <Image src={ginger} width="93px" height="63px"></Image>,
  //     amount: "700g",
  //     price: 13,
  //   },
  //   {
  //     name: "Organic Bananas",
  //     productImage: <Image src={banana} width="93" height="63px"></Image>,
  //     amount: "7pcs",
  //     price: 35,
  //   },
  // ];

  // const groceriesList = [
  //   {
  //     name: "Beef Bone",
  //     productImage: <Image src={beefBone} width="93px" height="63px"></Image>,
  //     amount: "1kg",
  //     price: 30,
  //   },
  //   {
  //     name: "Broller Chiken",
  //     productImage: <Image src={chicken} width="93px" height="63px"></Image>,
  //     amount: "1kg",
  //     price: 40,
  //   },
  //   {
  //     name: "Organic Bananas",
  //     productImage: <Image src={banana} width="93" height="63px"></Image>,
  //     amount: "7pcs",
  //     price: 35,
  //   },
  // ];

  const [showSeeAll, setShowSeeAll] = useState(false);
  const [categoryContent, setCategoryContent] = useState("");

  // console.log(products)

  // const router = useRouter();
  // const [searchQuery, setSearchQuery] = useState(" ");
  // const handleSearchBoxSubmit = (event) => {
  //   event.preventDefault();
  //   router.push(`/search?=${searchQuery}`);
  //   return null
  // }

  return (
    <div>
      <div className={moduleCss.container} style={{overflow: showSeeAll ? "hidden" : "auto", height: showSeeAll ? "100vh": "auto"}}>
        <div className={moduleCss.carrotImage}>
          <Image src={carrotImage} width="20vw" height="25vh"></Image>
        </div>
        <div className={moduleCss.locationContainer}>
          <div className={moduleCss.locationImage}>
            <Image src={location} width="15.13px" height="18.17px"></Image>
          </div>
          <div>Hong Kong</div>
        </div>
        <div style={{marginBottom: "2vh"}}>
          {/* <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearchBoxSubmit /> */}
          <SearchBox/>
        </div>
        
        <div>
          <Slider>
            {promoList.map((item) => (
              <Link href={item.linkTo} key={item.categoryName}>
                <div >
                  <div className={`${moduleCss.promo} ${item.bgColor}`}>
                    {item.image}
                    <div className={moduleCss.promoTextContainer}>
                      <div className={moduleCss.promoTitle}>
                        {item.categoryName}
                      </div>
                      <div
                        className={`${moduleCss.promoContent} ${item.contentColor}`}
                      >
                        {item.content}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </Slider>
        </div>
        <div className={moduleCss.subtitleRows}>
          <div className={moduleCss.subtitles}>Exclusive Offer</div>
          <Link href="#">
            <div className={moduleCss.seeAll} onClick={() => (setShowSeeAll(true), setCategoryContent("Exclusive Offer"))}>See all</div>
          </Link>
        </div>
        <div className={moduleCss.productContainer}>
          {/* {offerList.map((item) => (
            <div key={item.name} className={moduleCss.product}>
              <Goods>{item}</Goods>
            </div>
          ))} */}
          {products.map((item) => {
            if (item.discounts[0] >= 0.15) {            
            return <div key={item._id} className={moduleCss.product}>
              <GoodsV2>{item}</GoodsV2>
            </div>
            }
          })}          
        </div>
        <div className={moduleCss.subtitleRows}>
          <div className={moduleCss.subtitles}>Best Selling</div>
          <Link href="#">
            <div className={moduleCss.seeAll} onClick={() => (setShowSeeAll(true), setCategoryContent("Best Selling"))}>See all</div>
          </Link>
        </div>
        <div className={moduleCss.productContainer}>
          {/* {bestSellingList.map((item) => (
            <div key={item.name} className={moduleCss.product}>
              <Goods>{item}</Goods>
            </div>
          ))} */}
          {products.map((item) => {
            if (item.totalSales >= 10) {            
            return <div key={item.name} className={moduleCss.product}>
              <GoodsV2>{item}</GoodsV2>
            </div>
            }
          })}           
        </div>
        <div className={moduleCss.subtitleRows}>
          <div className={moduleCss.subtitles}>Groceries</div>
          <Link href="#">
            <div className={moduleCss.seeAll} onClick={() => (setShowSeeAll(true), setCategoryContent("Groceries"))}>See all</div>
          </Link>
        </div>
        <div className={moduleCss.tabContainer}>
          <div className={`${moduleCss.tab} ${moduleCss.pulseTabBgColor}`}>
            <div>
              <Image src={pulses} width="71.9px" heigh="71.9px"></Image>
            </div>
            <div>Pulses</div>
            <div></div>
          </div>
          <div className={`${moduleCss.tab} ${moduleCss.riceTabBgColor}`}>
            <div>
              <Image src={rice} width="69.6px" heigh="70.84px"></Image>
            </div>
            <div>Rice</div>
            <div></div>
          </div>
        </div>
        <div className={moduleCss.productContainer}>
          {/* {groceriesList.map((item) => (
            <div key={item.name} className={moduleCss.product}>
              <Goods>{item}</Goods>
            </div>
          ))} */}
          {products.map((item) => {
            if (item.categoryTags.includes("groceries")) {            
            return <div key={item.name} className={moduleCss.product}>
              <GoodsV2>{item}</GoodsV2>
            </div>
            }
          })}           
        </div>
      </div>
      <NavBar/>
      <Category onClose={() => setShowSeeAll(false)} show={showSeeAll}>
        {categoryContent}
      </Category>
    </div>
  );
};

export default home;

export async function getServerSideProps(context) {
  const authenticated = authenticationCheck(context)
  if (!authenticated) {
    return {redirect: {destination: '/', permanent: true,}, };
  }
  const token = context.req.cookies.auth
  const decoded = jwt_decode(token);
  console.log("decoded: " + decoded.sub)
  const accAPIData = await fetchHandler(`http://localhost:3000/api/user/${decoded.sub}`, "GET", context);
  // const accAPIData = await fetch(`http://localhost:3000/api/user/${decoded.email}`, {
  //   headers: {cookie: context.req?.headers.cookie}} 
  // );
  // const productAPIData = await fetch("http://localhost:3000/api/product", {
  //   headers: {cookie: context.req?.headers.cookie}} 
  // );
  const productAPIData = await fetchHandler("http://localhost:3000/api/product", "GET", context);
  console.log(`productAPI status: ${productAPIData.status}`)
  if(accAPIData.status === 401 || productAPIData.status === 401) {
    return {redirect: {destination: '/', permanent: true,}, };
  }
  // const productData = await productAPIData.json();
  // const accountData = await accAPIData.json();
  return {
    props: { account: accAPIData.data, products: productAPIData.data },
  };
}

// export async function getServerSideProps(context) {
//   try {
//   var res = await axios.get(
//     "http://localhost:3000/api/product",
//     {
//       headers: {
//         cookie: context.req?.headers.cookie
//       }
//     } 
//   );
//   var productData = await res.data;
//   console.log(res.status)
//   } catch (error) {
//     if (error instanceof TypeError) {
//       return {
//         redirect: {
//           destination: '/',
//           permanent: true,
//         },
//       }      
//     }
//   // if(error.res === 401) {
//   //   return {
//   //     redirect: {
//   //       destination: '/',
//   //       permanent: true,
//   //     },
//   //   }
//   // }
//   }
//   // console.log(res)
//   // const data = await fetchWrapper.get("http://localhost:3000/api/product", context)
  
//   return {
//     props: { products: productData },
//   };
// }