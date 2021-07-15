import moduleCss from '../styles/cart.module.css'
import NavBar from "../components/NavBar"

const cart = () => {
    return (
        <div>
            <div className={moduleCss.container}>
                <div className={moduleCss.title}>My Cart</div>
                <div className={moduleCss.productContainer}>my products</div>
                <button>Go to Checkout</button>
            </div>
            <NavBar />
        </div>
    )
}

export default cart
