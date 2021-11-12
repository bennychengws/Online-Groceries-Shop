import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import moduleCss from "../styles/Filters.module.css";
import Link from "next/link";
import Image from "next/image";
import { set } from "mongoose";

const Filters = ({ show, onClose, categoryData, brandData }) => {

  const [newCatList, setNewCatList] = useState([]);
  const [newbrandList, setNewBrandList] = useState([]);

  const [catCheckedState, setCatCheckedState] = useState(
    new Array(categoryData.length).fill(false)
  );

  const [brandCheckedState, setBrandCheckedState] = useState(
    new Array(brandData.length).fill(false)
  );
  // const catList = [
  //   "Eggs", "Noodles & Pasta", "Chips & Crisps", "Fast Food"
  // ];

  // const brandList = [
  //   "Individual Collection", "Cocola", "Ifad", "Kazi Farmas"
  // ];

  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
    // setCatList(categoryData);
    // setBrandList(brandData);
    console.log("filter created");
  }, []);
  
  const handleOnChange = (position, targetField, setTargetField) => {
    const updatedCheckedState = targetField.map((item, index) =>
      index === position ? !item : item
    );

    setTargetField(updatedCheckedState)
  };

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const handleApplyFilter = (e) => {
    e.preventDefault();
    onClose();
  };

  console.log(catCheckedState)
  console.log(brandCheckedState)

  const modalContent = show ? (
    <div className={moduleCss.container}>
      <div className={moduleCss.topPanel}>
        <Link href="#"><a onClick={handleCloseClick} className={moduleCss.styledModalHeader}>x</a></Link>
        <div>Filters</div>
        <div> </div>
      </div>
      <div className={moduleCss.filterPanel}>
        <div className={moduleCss.filterContent}>
          {categoryData.length === 0 ? <div></div> : <div className={moduleCss.Title}>Categories</div>}
          <div className="mt-4 flex flex-col">
            {categoryData.map((category, index) => (
              <label className="inline-flex items-center mb-2" key={index}>
                <input type="checkbox" className="form-checkbox text-green-500 rounded" name={category} value={category} onChange={() => handleOnChange(index, catCheckedState, setCatCheckedState)} defaultChecked></input>
                <span className={`ml-2 ${moduleCss.optionColor}`}>{category}</span>
              </label>              
            ))}
          </div>
          {brandData.length === 0 ? <div></div> : <div className={moduleCss.Title}>Brand</div>}
          <div className="mt-4 flex flex-col">
            {brandData.map((brand, index) => (
              <label className="inline-flex items-center mb-2" key={index}>
                <input type="checkbox" className="form-checkbox text-green-500 rounded" name={brand} value={brand} defaultChecked></input>
                <span className={`ml-2 ${moduleCss.optionColor}`}>{brand}</span>
              </label>              
            ))}
          </div>
        </div>
        {categoryData.length === 0 && brandData.length === 0 ? <div></div> :
          <button className={moduleCss.applyFilter} onClick={handleApplyFilter}>Apply Filter</button>
        }
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
