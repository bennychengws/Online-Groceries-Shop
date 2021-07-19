import moduleCss from "../styles/favourite.module.css";
import NavBar from "../components/NavBar";
import { useState } from "react";
// import Failed from "../components/Failed";

const cart = () => {
  // const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className={moduleCss.container}>
        <div className={moduleCss.title}>Favourite</div>
        <div className={moduleCss.productContainer}>my products</div>
        <button className={moduleCss.addAllToCart} onClick={() => setShowModal(true)}>Add All To Cart</button>
      </div>
      <NavBar />
      {/* <Failed
        onClose={() => setShowModal(false)}
        show={showModal}
      >
      </Failed> */}
    </div>
  );
};

export default cart;
