import Image from "next/image";
import Link from "next/link";
import moduleCss from "../styles/home.module.css";
import NavBar from "../components/NavBar";
import SearchBox from "../components/SearchBox";
import Slider from "../components/Slider";
import Goods from "../components/Goods";
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

const home = () => {
  const parameters = {
    name: "",
    categories: "",
    brand: "",
    price: "",
    productDetail: "",
    nutritions: "",
    review: "",
  };
  // beverages * 6
  // eggs * 6
  // fruits * 5
  // meats * 2
  // filterCategories * 4
  // filterBrand * 4
  // FindProductsCategories * 6
  // function fetchData() {
  //     const res = axios.get(
  //       "http://localhost:3000/api/product"
  //     );
  //     console.log(res.data)
  // }
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

  const offerList = [
    {
      name: "Organic Bananas",
      productImage: <Image src={banana} width="93" height="63px"></Image>,
      amount: "7pcs",
      price: 35,
    },
    {
      name: "Red Apple",
      productImage: <Image src={apple} width="93px" height="63px"></Image>,
      amount: "6pcs",
      price: 20,
    },
    {
      name: "Pear",
      productImage: <Image src={pear} width="93px" height="63px"></Image>,
      amount: "4pcs",
      price: 12,
    },
    {
      name: "Pear2",
      productImage: <Image src={pear} width="93px" height="63px"></Image>,
      amount: "4pcs",
      price: 12,
    },
    {
      name: "Pear3",
      productImage: <Image src={pear} width="93px" height="63px"></Image>,
      amount: "4pcs",
      price: 12,
    },
    {
      name: "Pear4",
      productImage: <Image src={pear} width="93px" height="63px"></Image>,
      amount: "4pcs",
      price: 12,
    },
    {
      name: "Pear5",
      productImage: <Image src={pear} width="93px" height="63px"></Image>,
      amount: "4pcs",
      price: 12,
    },
  ];

  const bestSellingList = [
    {
      name: "Bell Pepper Red",
      productImage: <Image src={bellPR} width="93px" height="63px"></Image>,
      amount: "800kg",
      price: 25,
    },
    {
      name: "Ginger",
      productImage: <Image src={ginger} width="93px" height="63px"></Image>,
      amount: "700g",
      price: 13,
    },
    {
      name: "Organic Bananas",
      productImage: <Image src={banana} width="93" height="63px"></Image>,
      amount: "7pcs",
      price: 35,
    },
  ];

  const groceriesList = [
    {
      name: "Beef Bone",
      productImage: <Image src={beefBone} width="93px" height="63px"></Image>,
      amount: "1kg",
      price: 30,
    },
    {
      name: "Broller Chiken",
      productImage: <Image src={chicken} width="93px" height="63px"></Image>,
      amount: "1kg",
      price: 40,
    },
    {
      name: "Organic Bananas",
      productImage: <Image src={banana} width="93" height="63px"></Image>,
      amount: "7pcs",
      price: 35,
    },
  ];

  return (
    <div>
      <div className={moduleCss.container}>
        <div className={moduleCss.carrotImage}>
          <Image src={carrotImage} width="20vw" height="25vh"></Image>
        </div>
        <div className={moduleCss.locationContainer}>
          <div className={moduleCss.locationImage}>
            <Image src={location} width="15.13px" height="18.17px"></Image>
          </div>
          <div>Hong Kong</div>
        </div>
        <SearchBox />
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
          <div className={moduleCss.subtitles}>Exclusive Offer </div>
          <Link href="#">
            <div className={moduleCss.seeAll}>See all</div>
          </Link>
        </div>
        <div className={moduleCss.productContainer}>
          {offerList.map((item) => (
            <div key={item.name} className={moduleCss.product}>
              <Goods>{item}</Goods>
            </div>
          ))}
        </div>
        <div className={moduleCss.subtitleRows}>
          <div className={moduleCss.subtitles}>Best Selling</div>
          <Link href="#">
            <div className={moduleCss.seeAll}>See all</div>
          </Link>
        </div>
        <div className={moduleCss.productContainer}>
          {bestSellingList.map((item) => (
            <div key={item.name} className={moduleCss.product}>
              <Goods>{item}</Goods>
            </div>
          ))}
        </div>
        <div className={moduleCss.subtitleRows}>
          <div className={moduleCss.subtitles}>Groceries</div>
          <Link href="#">
            <div className={moduleCss.seeAll}>See all</div>
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
          {groceriesList.map((item) => (
            <div key={item.name} className={moduleCss.product}>
              <Goods>{item}</Goods>
            </div>
          ))}
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default home;
