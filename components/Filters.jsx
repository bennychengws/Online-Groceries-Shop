import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import moduleCss from "../styles/Filters.module.css";
import Link from "next/link";
import Image from "next/image";

const Filters = ({ show, onClose }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
    console.log("filter created");
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div className={moduleCss.container}>
      <div className={moduleCss.topPanel}>
        <Link href="#">
          <a
            onClick={handleCloseClick}
            className={moduleCss.styledModalHeader}
          >
            x
          </a>
        </Link>
        <div>Filters</div>
        <div> </div>
      </div>
      <div className={moduleCss.filterPanel}>
        <div className={moduleCss.filterContent}>
          <div className={moduleCss.Title}>Categories</div>
          <div className={moduleCss.Title}>Brand</div>
        </div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("filters-root")
    );
  } else {
    return null;
  }
};

export default Filters;
