import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import moduleCss from "../styles/home.module.scss";
import NavBar from "../components/NavBar";
import SearchBox from "../components/SearchBox";
import Slider from "../components/Slider";
import GoodsV2 from "../components/GoodsV2";
import Category from "../components/Category";
import carrotImage from "../images/Group.png";
import location from "../images/locationicon.png";
import fruits from "../images/fruits_&_vegetables.png";
import eggs from "../images/dairy_&_eggs.png";
import drinks from "../images/beverages.png";
import rice from "../images/rice.png";
import pulses from "../images/pulses.png";
import authenticationCheck from "../lib/authenticationCheck";
import jwt_decode from "jwt-decode";
import fetchHandler from "../lib/fetchHandler";
import { useUserContext } from "../context/UserContext";
import getConfig from 'next/config';


const home = ({products, account}) => {
  const router = useRouter();
  const [userState, dispatch] = useUserContext()

  useEffect(() => {
    dispatch({type: "init_stored", value: account})
  }, [])

  const promoList = [
    {
      categoryName: "Fresh Vegetables",
      content: "Get Up To 40% OFF",
      image: <Image src={fruits} width="150px" height="100px"></Image>,
      bgColor: moduleCss.vegeColor,
      contentColor: moduleCss.vegeContentColor,
      linkTo: "../explore/fresh-fruits-and-vegetables",
    },
    {
      categoryName: "Fresh Eggs",
      content: "Click and Shop",
      image: <Image src={eggs} width="100px" height="100px"></Image>,
      bgColor: moduleCss.eggColor,
      contentColor: moduleCss.eggContentColor,
      linkTo: "../explore/dairy-and-eggs",
    },
    {
      categoryName: "New Drinks",
      content: "Find Out What You Want",
      image: <Image src={drinks} width="100px" height="100px"></Image>,
      bgColor: moduleCss.drinkColor,
      contentColor: moduleCss.drinkContentColor,
      linkTo: "../explore/beverages",
    },
  ];

  const [offerList, setOfferList] = useState([]);
  const [bestSellingList, setBestSellingList] = useState([]);
  const [groceriesList, setGroceriesList] = useState([]);
  const [showSeeAll, setShowSeeAll] = useState(false);
  const [categoryContent, setCategoryContent] = useState("");
  const [contentData, setContentData] = useState([]);

  useEffect(() => {
    let processingOfferArray = [];
    products.map((item) => {
      if (item.discounts[0] >= 0.15) {            
        processingOfferArray.push(item)
      }
    })
    setOfferList(processingOfferArray)

    let processingBestSellingArray = [];
    products.map((item) => {
      if (item.totalSalesOrderNumber >= 10) {            
        processingBestSellingArray.push(item)
      }
    })
    setBestSellingList(processingBestSellingArray)    

    let processingGroceriesArray = [];
    products.map((item) => {
      if (item.categoryTags.includes("groceries")) {            
        processingGroceriesArray.push(item)
      }
    })
    setGroceriesList(processingGroceriesArray)      
  }, [])

  const handleClickSeeAll = (e, title, data) => {
    e.preventDefault();
    setShowSeeAll(true);
    setCategoryContent(title);
    setContentData(data);
  }

  const handleClickTab = (e, searchQuery) => {
    e.preventDefault();
		router.push({pathname: `../search/${searchQuery}`});
  };

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
        <div className={moduleCss.searchBoxContainer}>
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
                      <div className={`${moduleCss.promoContent} ${item.contentColor}`}>
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
          {/* <Link href="#"> */}
            <button className={moduleCss.seeAll} onClick={(e) => handleClickSeeAll(e, "Exclusive Offer", offerList)}>See all</button>
          {/* </Link> */}
        </div>
        <div className={moduleCss.productContainer}>
          {offerList.map((item) => {
            return <div key={item._id} className={moduleCss.product}>
              <GoodsV2>{item}</GoodsV2>
            </div>
          })}
        </div>
        <div className={moduleCss.subtitleRows}>
          <div className={moduleCss.subtitles}>Best Selling</div>
          {/* <Link href="#"> */}
            <button className={moduleCss.seeAll} onClick={(e) => handleClickSeeAll(e, "Best Selling", bestSellingList)}>See all</button>
          {/* </Link> */}
        </div>
        <div className={moduleCss.productContainer}>
          {bestSellingList.map((item) => {
            if (item.totalSalesOrderNumber >= 10) {            
            return <div key={item.name} className={moduleCss.product}>
              <GoodsV2>{item}</GoodsV2>
            </div>
            }
          })}           
        </div>
        <div className={moduleCss.subtitleRows}>
          <div className={moduleCss.subtitles}>Groceries</div>
          {/* <Link href="#"> */}
            <button className={moduleCss.seeAll} onClick={(e) => handleClickSeeAll(e, "Groceries", groceriesList)}>See all</button>
          {/* </Link> */}
        </div>
        <div className={moduleCss.tabContainer}>
          <div className={moduleCss.pulseTab} onClick={(e) => handleClickTab(e, "pulse")}>
            <div>
              <Image src={pulses} width="71.9px" heigh="71.9px"></Image>
            </div>
            <div>Pulses</div>
            <div></div>
          </div>
          <div className={moduleCss.riceTab} onClick={(e)=> handleClickTab(e, "rice")}>
            <div>
              <Image src={rice} width="69.6px" heigh="70.84px"></Image>
            </div>
            <div>Rice</div>
            <div></div>
          </div>
        </div>
        <div className={moduleCss.productContainer}>
          {groceriesList.map((item) => {
            if (item.categoryTags.includes("groceries")) {            
            return <div key={item.name} className={moduleCss.product}>
              <GoodsV2>{item}</GoodsV2>
            </div>
            }
          })}           
        </div>
      </div>
      <NavBar/>
      <Category onClose={() => setShowSeeAll(false)} show={showSeeAll} content={contentData}>
        {categoryContent}
      </Category>
    </div>
  );
};

export default home;

export async function getServerSideProps(context) {
  const { publicRuntimeConfig } = getConfig();
  const authenticated = authenticationCheck(context)
  if (!authenticated) {
    return {redirect: {destination: '/', permanent: true,}, };
  }
  const token = context.req.cookies.auth
  const decoded = jwt_decode(token);
//  console.log("decoded: " + decoded.sub)
  const accAPIData = await fetchHandler(`${publicRuntimeConfig.apiUrl}/user/${decoded.sub}`, "GET", context);
  const productAPIData = await fetchHandler(`${publicRuntimeConfig.apiUrl}/product`, "GET", context);
  console.log(`productAPI status: ${productAPIData.status}`)
  if(accAPIData.status === 401 || productAPIData.status === 401) {
    return {redirect: {destination: '/', permanent: true,}, };
  }
  return {
    props: { account: accAPIData.data, products: productAPIData.data },
  };
}