import Image from "next/image";
import carrotImage from "../images/Group.png";
import moduleCss from "../styles/home.module.css";
import axios from "axios";
import mongoose from "mongoose"
import Product from '../models/product';

const home = () => {
    const parameters = {name: "", categories: "", brand: "", price: "", productDetail: "", nutritions: "", review: ""}
    // beverages * 6
    // eggs * 6
    // fruits * 5
    // meats * 2
    // filterCategories * 4
    // filterBrand * 4
    // FindProductsCategories * 8
    // function fetchData() {
    //     const res = axios.get(
    //       "http://localhost:3000/api/product"
    //     );
    //     console.log(res.data)
    // }

    return (
        <div className={moduleCss.container}>
            <div className={moduleCss.image}>
                <Image src={carrotImage} width="30vw" height="40vh"></Image>
                Exclusive Offer 
                Best Selling
                Goceries
                {/* {console.log(test)} */}
                {mongoose.connect('mongodb://localhost/products')}
                {axios.get('/api/product', async (req, res) => {
                    const records = await Product.find({})
                    console.log('Response => ', records)
                    res.json(records)
                })
                }
            </div>
        </div>
    )
}

export default home
