import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import moduleCss from "../styles/Filters.module.css";
import Link from "next/link";
import Image from "next/image";

const Filters = ({ show, onClose }) => {

  const catList = [
    "Eggs", "Noodles & Pasta", "Chips & Crisps", "Fast Fodd"
  ];

  const brandList = [
    "Individual Collection", "Cocola", "Ifad", "Kazi Farmas"
  ];

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
        <Link href="#"><a onClick={handleCloseClick} className={moduleCss.styledModalHeader}>x</a></Link>
        <div>Filters</div>
        <div> </div>
      </div>
      <div className={moduleCss.filterPanel}>
        <div className={moduleCss.filterContent}>
          <div className={moduleCss.Title}>Categories</div>
          <div class="mt-4 flex flex-col">
            {catList.map((category) => (
              <label className="inline-flex items-center mb-2">
                <input type="checkbox" className="form-checkbox text-green-500 rounded" defaultChecked></input>
                <span className={`ml-2 ${moduleCss.optionColor}`}>{category}</span>
              </label>              
            ))}
          </div>
          <div className={moduleCss.Title}>Brand</div>
          <div class="mt-4 flex flex-col">
            {brandList.map((brand) => (
              <label className="inline-flex items-center mb-2">
                <input type="checkbox" className="form-checkbox text-green-500 rounded" defaultChecked></input>
                <span className={`ml-2 ${moduleCss.optionColor}`}>{brand}</span>
              </label>              
            ))}
          </div>
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
