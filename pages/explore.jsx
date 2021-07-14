import firstImage from '../images/account.png';
import Image from "next/image";
import moduleCss from '../styles/explore.module.css'
import { useRouter } from "next/router";


const explore = () => {

  const test = () => {
    console.log("hi")
  }
  const router = useRouter()

  return (
    <div className={moduleCss.container}>
      <div className={moduleCss.title}>Find Products</div>
      {/* <div onClick={test}>test</div>
            <Image src={firstImage} width="30vw" height="40vh" onClick={test}/> */}
            searchBar
      <div className={moduleCss.productContainer}>
        <div>Fresh Fruits & Vegetable</div>
        <div>Cooking Oil & Ghee</div>
        <div>Meat & Fish</div>
        <div>Bakery & Snacks</div>
        <div>Dairy & Eggs</div>
        <div>Beverages</div>
      </div>
      navBar
    </div>
  )
}


export default explore
