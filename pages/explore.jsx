import Image from "next/image";
import Link from 'next/link'
import moduleCss from '../styles/explore.module.css';
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";
import fruits from "../images/fruits_&_vegetables.png";
import oil from "../images/cooking_oil_&_ghee.png";
import meat from "../images/meat_&_fish.png"
import bakery from "../images/bakery_&_snacks.png"
import eggs from "../images/dairy_&_eggs.png"
import drinks from "../images/beverages.png"

const explore = () => {

  const test = () => {
    console.log("hi")
  }
  const router = useRouter()

  return (
    <div>
      <div className={moduleCss.container}>
        <div className={moduleCss.title}>Find Products</div>
        {/* <div onClick={test}>test</div>
            <Image src={firstImage} width="30vw" height="40vh" onClick={test}/> */}
        searchBar
        <div className={moduleCss.productContainer}>
          <Link href="">
            <div className={moduleCss.fruits}>
              <Image src={fruits} width="100vw" height="70vh"></Image>
              <div>Fresh Fruits & Vegetables</div>
            </div>
          </Link>
          <Link href="">
            <div className={moduleCss.fruits}>
              <Image src={oil} width="100vw" height="70vh"></Image>
              <div>Cooking Oil & Ghee</div>
            </div>
          </Link>
          <Link href="">
            <div className={moduleCss.fruits}>
              <Image src={meat} width="100vw" height="70vh"></Image>
              <div>Meat & Fish</div>
            </div>
          </Link>
          <Link href="">
            <div className={moduleCss.fruits}>
              <Image src={bakery} width="100vw" height="70vh"></Image>
              <div>Bakery & Snacks</div>
            </div>
          </Link>
          <Link href="">
            <div className={moduleCss.fruits}>
              <Image src={eggs} width="100vw" height="70vh"></Image>
              <div>Dairy & Eggs</div>
            </div>
          </Link>
          <Link href="">
            <div className={moduleCss.fruits}>
              <Image src={drinks} width="100vw" height="70vh"></Image>
              <div>Beverages</div>
            </div>
          </Link>

        </div>
      </div>
      <NavBar />
    </div>
  )
}


export default explore
