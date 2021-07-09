import Image from "next/image";
import carrotImage from "../images/Group.png";
import moduleCss from "../styles/home.module.css";

const home = () => {
    const parameters = {name: "", categories: "", brand: "", price: "", productDetail: "", nutritions: "", review: ""}
    // beverages * 6
    // eggs * 6
    // fruits * 5
    // meats * 2
    // filterCategories * 4
    // filterBrand * 4
    // FindProductsCategories * 8
    
    return (
        <div className={moduleCss.container}>
            <div className={moduleCss.image}>
                <Image src={carrotImage} width="30vw" height="40vh"></Image>
                Exclusive Offer 
                Best Selling
                Goceries
                {/* {console.log(test)} */}
            </div>
        </div>
    )
}

export default home
