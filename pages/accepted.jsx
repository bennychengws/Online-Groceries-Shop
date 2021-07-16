import acceptedIcon from "../images/accepted.png"
import Image from "next/dist/client/image"
import Layout from "../components/Layout";
import moduleCss from "../styles/accepted.module.css"

const accepted = () => {
    return (
      <Layout>
        <div className={moduleCss.container}>
            <div>
                <Image src={acceptedIcon} width="150vw" height="150vh"></Image>
            </div>
            <div>Your Order has been accepted</div>
            <div> Your items has been placed and is on it's way to being processed</div>
            <button>Track Order</button>
            <button>Back to home</button>
        </div>
      </Layout>
    )
}

export default accepted
