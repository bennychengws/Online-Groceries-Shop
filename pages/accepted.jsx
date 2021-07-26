import acceptedIcon from "../images/acceptedIcon.png"
import Image from "next/image";
import Layout from "../components/Layout";
import moduleCss from "../styles/accepted.module.css"
import Link from "next/link";

const accepted = () => {
  return (
    <Layout>
      <div className={moduleCss.container}>
        <div className={moduleCss.acceptedImage}>
          <Image src={acceptedIcon} width="269px" height="240px"></Image>
        </div>
        <div className={moduleCss.orderAccepted}>Your Order has been accepted</div>
        <div className={moduleCss.itemsPlaced}> Your items has been placed and is on it's way to being processed</div>
        <Link href="#">
          <button className={moduleCss.track}>Track Order</button>
        </Link>
        <Link href="../home">
          <button className={moduleCss.back}>Back to home</button>
        </Link>

      </div>
    </Layout>
  )
}

export default accepted
