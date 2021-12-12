import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import moduleCss from "../styles/category.module.scss";
import Image from "next/image";
import backArrow from "../images/back_arrow.png";
import filterIcon from "../images/Filter.png";
import Filters from "../components/Filters";
import GoodsV2 from "../components/GoodsV2"
import { useFilterContext } from "../context/FilterContext";

const Category = ({ children, show, onClose, content }) => {
  const [filterState, dispatchFilter] = useFilterContext()
  const [isBrowser, setIsBrowser] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [displayedData, setDisplayedData] = useState([])
  const [categorySet, setCategorySet] = useState(new Set())
  const [brandSet, setBrandSet] = useState(new Set())

  useEffect(() => {
    setIsBrowser(true);
    console.log("category created");
  }, []);

  useEffect(() => {
    var categories = new Set()
    var brands = new Set()

    for (var i = 0; i < content.length; i++ ) {
      for (var j = 0; j < content.length; j++ ) {
        if (content[i].categoryTags[j] !== undefined) {
          categories.add(content[i].categoryTags[j])
          continue
        }
      }
    }    

    for (var k = 0; k < content.length; k++ ) {
      brands.add(content[k].brand)
    }    

    setCategorySet(categories)
    setBrandSet(brands)


    setDisplayedData(content)
    dispatchFilter({type: "filter_stored", value: ""})
  }, [content])

  useEffect(() => {
    if (filterState.brands && filterState.categories !== undefined) {
      let fitleredData = new Set()
      for (var k = 0; k < content.length; k++ ) {
        let isCheckedInBrands = false;
        let isCheckedInCategories = false;
        for (var m = 0; m < filterState.brands.length; m++ ) {
          if (content[k].brand === filterState.brands[m]) {
            isCheckedInBrands = true;
            break
          }
        }

        for (var p = 0; p < filterState.categories.length; p++ ) {
          for (var r = 0; r < content[k].categoryTags.length; r++ ) {
            if (content[k].categoryTags[r] === filterState.categories[p]) {
              isCheckedInCategories= true;
              break
            }
          }
        }
        if (isCheckedInBrands && isCheckedInCategories) {
          fitleredData.add(content[k])
        }
      }
      setDisplayedData(Array.from(fitleredData))
    }
  }, [filterState])

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
        <div
          className={moduleCss.filter}
          onClick={() => (setShowFilter(true), console.log("Clicked"))}
        >
          <Image src={filterIcon} width="16.8px" height="17.85px"></Image>
        </div>
      </div>
      <div className={moduleCss.productContainer}>
        {displayedData.map((item, index) => (
          <GoodsV2 key={index}>{item}</GoodsV2>
        ))}
      </div>
      <Filters onClose={() => setShowFilter(false)} show={showFilter} categoryData={Array.from(categorySet)} brandData={Array.from(brandSet)}></Filters>
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
