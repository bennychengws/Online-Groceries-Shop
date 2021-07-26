import moduleCss from "../styles/favourite.module.css";
import NavBar from "../components/NavBar";
import { useState } from "react";
// import Failed from "../components/Failed";
import Accepted from "../components/Accepted"

const favourite = () => {
  const [showModal, setShowModal] = useState(false);

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
      <Accepted
        show={showModal}
      >
      </Accepted>
    </div>
  );
};

export default favourite;
