import moduleCss from '../styles/cart.module.css'

const cart = () => {
    return (
        <div className={moduleCss.container}>
            <div className={moduleCss.title}>My Cart</div>
            <div className={moduleCss.productContainer}>my products</div>
            <button>Go to Checkout</button>
            navBar
        </div>
    )
}

export default cart
