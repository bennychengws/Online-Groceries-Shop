import { useState } from "react";
import moduleCss from "../styles/cart.module.css";
import NavBar from "../components/NavBar";
import Checkout from "../components/Checkout";
import Failed from "../components/Failed";
import Accepted from "../components/Accepted"

const cart = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className={moduleCss.container}>
        <div className={moduleCss.title}>My Cart</div>
        <div className={moduleCss.productContainer}>my products</div>
        {/* <button onClick={() => setShowModal(true)}>Open Modal</button> */}
        <Checkout onClose={() => setShowModal(false)} show={showModal} title={"Test"}>
          Hello from the modal!
        </Checkout>
        <button className={moduleCss.checkOut} onClick={() => setShowModal(true)}>Go to Checkout</button>
      </div>
      <NavBar />
      {/* <Failed
        onClose={() => setShowModal(false)}
        show={showModal}
      >
      </Failed> */}
      {/* <Accepted
        show={showModal}
      >
      </Accepted> */}
    </div>
  );
};

export default cart;
