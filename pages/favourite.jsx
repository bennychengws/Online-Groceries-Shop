import moduleCss from '../styles/favourite.module.css'
import NavBar from "../components/NavBar"

const cart = () => {
    return (
        <div>
            <div className={moduleCss.container}>
                <div className={moduleCss.title}>Favourite</div>
                <div className={moduleCss.productContainer}>my products</div>
                <button className={moduleCss.addAllToCart}>Add All To Cart</button>
            </div>
            <NavBar />
        </div>
    )
}

export default cart
