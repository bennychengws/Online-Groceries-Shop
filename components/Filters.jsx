import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import moduleCss from "../styles/Filters.module.scss";
import Link from "next/link";
import { useFilterContext } from "../context/FilterContext";

const Filters = ({ show, onClose, categoryData, brandData }) => {
  const [filterState, dispatchFilter] = useFilterContext()
  const [catCheckedState, setCatCheckedState] = useState([]);
  const [brandCheckedState, setBrandCheckedState] = useState([]);

  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
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
    var filteredCategories = []
    for (var i = 0; i < catCheckedState.length; i++ ) {
      if (catCheckedState[i] === true) {
        filteredCategories.push(categoryData[i]) 
      }
    }
    var filteredBrands = []
    for (var i = 0; i < brandCheckedState.length; i++ ) {
      if (brandCheckedState[i] === true) {
        filteredBrands.push(brandData[i]) 
      }
    }      

    dispatchFilter({type: "filter_stored", value: {categories: filteredCategories, brands: filteredBrands, catCheckedSetting: catCheckedState, brandCheckedSetting: brandCheckedState}})
    onClose();
  };

  useEffect(() => {
    if (filterState.catCheckedSetting === undefined){
      let processingArray = new Array(categoryData.length).fill(true)
      setCatCheckedState(processingArray)
    }
  }, [categoryData]);

  useEffect(() => {
    if (filterState.brandCheckedSetting === undefined) {
      let processingArray = new Array(brandData?.length).fill(true)
      setBrandCheckedState(processingArray)
    }
  }, [brandData]);

  const modalContent = show ? (
    <div className={moduleCss.container}>
      <div className={moduleCss.topPanel}>
        <Link href="#"><a onClick={handleCloseClick} className={moduleCss.styledModalHeader}>x</a></Link>
        <h1>Filters</h1>
        <div> </div>
      </div>
      <div className={moduleCss.filterPanel}>
        <div className={moduleCss.filterContent}>
          {categoryData.length === 0 ? <div></div> : <h2 className={moduleCss.Title}>Categories</h2>}
          <div className="mt-4 flex flex-col">
            {categoryData.map((category, index) => (
              <div className="inline-flex items-center mb-2" key={index}>
                <input type="checkbox" className="form-checkbox text-green-500 rounded" name={category} value={category} onChange={() => handleOnChange(index, catCheckedState, setCatCheckedState)} checked={catCheckedState[index]}></input>
                <span className={`ml-2`}>{category}</span>
              </div>              
            ))}
          </div>
          {brandData.length === 0 ? <div></div> : <h2 className={moduleCss.Title}>Brand</h2>}
          <div className="mt-4 flex flex-col">
            {brandData.map((brand, index) => (
              <div className="inline-flex items-center mb-2" key={index}>
                <input type="checkbox" className="form-checkbox text-green-500 rounded" name={brand} value={brand} onChange={() => handleOnChange(index, brandCheckedState, setBrandCheckedState)} checked={brandCheckedState[index]}></input>
                <span className={`ml-2`}>{brand}</span>
              </div>              
            ))}
          </div>
        </div>
        {categoryData.length === 0 && brandData.length === 0 ? <div></div> :
          <button onClick={handleApplyFilter}>Apply Filter</button>
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
