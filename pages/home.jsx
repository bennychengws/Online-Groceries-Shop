import Image from "next/image";
import Link from "next/link";
import moduleCss from "../styles/home.module.css";
import NavBar from "../components/NavBar";
import SearchBox from "../components/SearchBox";
import Slider from "../components/Slider";
import Goods from "../components/Goods";
import carrotImage from "../images/Group.png";
import fruits from "../images/fruits_&_vegetables.png";
import eggs from "../images/dairy_&_eggs.png";
import drinks from "../images/beverages.png";
import banana from "../images/banana.png";
import apple from "../images/apple.png";
import pear from "../images/pear.png";

const home = () => {
  const parameters = { name: "", categories: "", brand: "", price: "", productDetail: "", nutritions: "", review: "" }
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
      linkTo: "../explore"
    },
    {
      categoryName: "Fresh Eggs",
      content: "Click and Shop",
      image: <Image src={eggs} width="100px" height="100px"></Image>,
      bgColor: moduleCss.eggColor,
      contentColor: moduleCss.eggContentColor,
      linkTo: "../explore"
    },
    {
      categoryName: "New Drinks",
      content: "Find Out What You Want",
      image: <Image src={drinks} width="100px" height="100px"></Image>,
      bgColor: moduleCss.drinkColor,
      contentColor: moduleCss.drinkContentColor,
      linkTo: "../explore"
    }
  ]

  const offerList = [
    {
      name: "Organic Bananas",
      productImage: (
        <Image src={banana} width="99.89px" height="79.43px"></Image>
      ),
      amount: "7pcs",
      price: 35,
    },
    {
      name: "Red Apple",
      productImage: (
        <Image src={apple} width="103.43px" height="62.56px"></Image>
      ),
      amount: "6pcs",
      price: 20,
    },
    {
      name: "Pear",
      productImage: (
        <Image src={pear} width="103.43px" height="62.56px"></Image>
      ),
      amount: "4pcs",
      price: 12,
    },
  ]

  return (
    <div>
      <div className={moduleCss.container}>
        <div className={moduleCss.image}>
          <Image src={carrotImage} width="20vw" height="25vh"></Image>
        </div>
        location with icon<br />
        <SearchBox />
        <div>
          <Slider>
            {promoList.map((item) => (
              <Link href={item.linkTo}>
                <div className={`${moduleCss.promo} ${item.bgColor}`}>
                  {item.image}
                  <div className={moduleCss.promoTextContainer}>
                    <div className={moduleCss.promoTitle}>{item.categoryName}</div>
                    <div className={`${moduleCss.promoContent} ${item.contentColor}`}>{item.content}</div>
                  </div>
                </div>
              </Link>
            ))}
          </Slider>
        </div>
        <div className={moduleCss.subtitleRows}><div className={moduleCss.subtitles}>Exclusive Offer </div><div className={moduleCss.seeAll}>See all</div></div>
        <div className={moduleCss.productContainer}>{offerList.map((item) => <div className={moduleCss.product}><Goods>{item}</Goods></div>)}</div>

        <div className={moduleCss.productContainer}><div className={moduleCss.product}>product</div><div className={moduleCss.product}>product</div><div className={moduleCss.product}>product</div></div>
        <div className={moduleCss.subtitleRows}><div className={moduleCss.subtitles}>Best Selling</div><div className={moduleCss.seeAll}>See all</div></div>
        <div className={moduleCss.productContainer}><div className={moduleCss.product}>product</div><div className={moduleCss.product}>product</div><div className={moduleCss.product}>product</div></div>
        <div className={moduleCss.subtitleRows}><div className={moduleCss.subtitles}>Goceries</div><div className={moduleCss.seeAll}>See all</div></div>
        <div className={moduleCss.productContainer}><div className={moduleCss.product}>product</div><div className={moduleCss.product}>product</div><div className={moduleCss.product}>product</div></div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, quibusdam provident libero qui eum nostrum illo veniam earum a beatae tenetur explicabo rerum perferendis minus ducimus quo voluptatibus amet aperiam.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci eaque veritatis et recusandae quam corrupti tenetur illo tempora cumque quasi! Ad suscipit quasi magnam magni qui at officiis laboriosam harum!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab hic quisquam sequi dolor alias mollitia molestias? Eligendi, aut tempora soluta nobis nisi cumque? Reprehenderit deserunt rem recusandae. Culpa, minima cum.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias ad illo esse molestiae ipsam! Magni, nam? Ducimus, laudantium. Laboriosam, ipsam voluptatum? Sequi quos eveniet perferendis quidem minima. Quidem, vel illo!
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus optio aliquam odio, minima culpa aperiam voluptatem repudiandae provident ullam molestias quas, itaque vel mollitia dolorem? Consectetur ratione dolor dignissimos at!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, sunt dolorem. Officiis id vitae minima, quo eveniet quia distinctio facere saepe, quasi ducimus error sequi dolor, reiciendis quaerat dolores vero.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe nobis atque exercitationem? Impedit ratione harum quis, nulla dolore deserunt sunt voluptate ipsum amet repellat in mollitia dolorum necessitatibus ullam sint!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quas repudiandae molestiae at non corrupti suscipit quam, nobis maxime dicta voluptate odit expedita ea excepturi vitae temporibus consequatur ullam ad.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla quod nobis aut praesentium excepturi, esse veritatis tempora debitis ad nostrum ipsum vel, tenetur hic in quibusdam, assumenda id odio eos!
      </div>
      <NavBar />
    </div>
  )
}

export default home
