import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import moduleCss from "../styles/Category.module.css";
import Link from "next/link";
import Image from "next/image";
import backArrow from "../images/back_arrow.png";
import filterIcon from "../images/Filter.png";
import Filters from "../components/Filters";

const Category = ({ children, show, onClose }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
    console.log("cateogry created");
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div className={moduleCss.container}>
      <div className={moduleCss.topPanel}>
        <div className={moduleCss.back} onClick={handleCloseClick}>
          <Image src={backArrow} width="10px" height="18px"></Image>
        </div>
        <div className={moduleCss.childrenTitle}>{children}</div>
        <div className={moduleCss.filter} onClick={() => (setShowFilter(true), console.log("Clicked"))}>
          <Image src={filterIcon} width="16.8px" height="17.85px"></Image>
        </div>
      </div>
      <div>Products</div>
      <Filters onClose={() => setShowFilter(false)} show={showFilter}></Filters>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("category-root")
    );
  } else {
    return null;
  }
};

export default Category;
