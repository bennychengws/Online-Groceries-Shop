import moduleCss from '../styles/favourite.module.css'

const cart = () => {
    return (
        <div className={moduleCss.container}>
            <div className={moduleCss.title}>Favourite</div>
            <div className={moduleCss.productContainer}>my products</div>
            <button>Add All To Cart</button>
            navBar
        </div>
    )
}

export default cart
