import Image from "next/image";
import carrotImage from "../images/Group.png";
import moduleCss from "../styles/home.module.css";
import NavBar from "../components/NavBar"


const home = () => {
    const parameters = {name: "", categories: "", brand: "", price: "", productDetail: "", nutritions: "", review: ""}
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

    return (
        <div className={moduleCss.container}>
            <div className={moduleCss.image}>
                <Image src={carrotImage} width="20vw" height="25vh"></Image>
            </div>
            location with icon<br/>
            discount promotion panel<br/>
            searchBar
            <div className={moduleCss.subtitleRows}><div className={moduleCss.subtitles}>Exclusive Offer </div><div className={moduleCss.seeAll}>See all</div></div><div>products</div>
            <div className={moduleCss.subtitleRows}><div className={moduleCss.subtitles}>Best Selling</div><div className={moduleCss.seeAll}>See all</div></div><div>products</div>
            <div className={moduleCss.subtitleRows}><div className={moduleCss.subtitles}>Goceries</div><div className={moduleCss.seeAll}>See all</div></div><div>products</div>
            <NavBar/>
        </div>
    )
}

export default home
