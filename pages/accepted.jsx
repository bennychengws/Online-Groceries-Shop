import acceptedIcon from "../images/accepted.png"
import Image from "next/dist/client/image"
import Layout from "../components/Layout";
import moduleCss from "../styles/accepted.module.css"

const accepted = () => {
    return (
      <Layout>
        <div className={moduleCss.container}>
            <div className={moduleCss.acceptedImage}>
                <Image src={acceptedIcon} width="269px" height="240px"></Image>
            </div>
            <div className={moduleCss.orderAccepted}>Your Order has been accepted</div>
            <div className={moduleCss.itemsPlaced}> Your items has been placed and is on it's way to being processed</div>
            <button className={moduleCss.track}>Track Order</button>
            <button className={moduleCss.back}>Back to home</button>
        </div>
      </Layout>
    )
}

export default accepted
