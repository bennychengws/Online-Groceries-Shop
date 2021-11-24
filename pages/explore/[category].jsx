import React, { useEffect, useState } from "react";
import moduleCss from "../../styles/Category.module.css";
import Image from "next/image";
import NavBar from "../../components/NavBar";
import filterIcon from "../../images/Filter.png";
import Filters from "../../components/Filters";
import GoodsV2 from "../../components/GoodsV2";
import { useFilterContext } from "../../context/FilterContext";
import getConfig from 'next/config';

const exploreCategory = ({title, data}) => {
  const [filterState, dispatchFilter] = useFilterContext()
  const [showFilter, setShowFilter] = useState(false);
  const [displayedData, setDisplayedData] = useState([])
  const [categorySet, setCategorySet] = useState(new Set())
  const [brandSet, setBrandSet] = useState(new Set())

  useEffect(() => {
    var categories = new Set()
    var brands = new Set()

    for (var i = 0; i < data.length; i++ ) {
      for (var j = 0; j < data.length; j++ ) {
        if (data[i].categoryTags[j] !== undefined) {
          categories.add(data[i].categoryTags[j])
          continue
        }
      }
    }    

    for (var k = 0; k < data.length; k++ ) {
      brands.add(data[k].brand)
    }    

    setCategorySet(categories)
    setBrandSet(brands)


    setDisplayedData(data)
    dispatchFilter({type: "filter_stored", value: ""})
  }, [data])

  useEffect(() => {
    if (filterState.brands && filterState.categories !== undefined) {
      let fitleredData = new Set()
      for (var k = 0; k < data.length; k++ ) {
        let isCheckedInBrands = false;
        let isCheckedInCategories = false;
        for (var m = 0; m < filterState.brands.length; m++ ) {
          if (data[k].brand === filterState.brands[m]) {
            isCheckedInBrands = true;
            break
          }
        }

        for (var p = 0; p < filterState.categories.length; p++ ) {
          for (var r = 0; r < data[k].categoryTags.length; r++ ) {
            if (data[k].categoryTags[r] === filterState.categories[p]) {
              isCheckedInCategories= true;
              break
            }
          }
        }
        if (isCheckedInBrands && isCheckedInCategories) {
          fitleredData.add(data[k])
        }
      }

      setDisplayedData(Array.from(fitleredData))
    }
  }, [filterState])

  return (
    <div className={moduleCss.container} style={{ overflow: showFilter ? "hidden" : "auto", height: showFilter ? "100vh" : "auto" }}>
      <div className={moduleCss.topPanel}>
        <div></div>
        {/* <div className={moduleCss.back} onClick={() => router.back()}>
          <Image src={backArrow} width="10px" height="18px"></Image>
        </div> */}
        <div className={moduleCss.childrenTitle}>{title}</div>
        <div
          className={moduleCss.filter}
          onClick={() => (setShowFilter(true), console.log("Clicked"))}
        >
          <Image src={filterIcon} width="16.8px" height="17.85px"></Image>
        </div>
      </div>
      <div className={moduleCss.productContainer}>
        {/* {beverageList.map((item, index) => (
          <Goods key={index}>{item}</Goods>
        ))} */}
        {displayedData.map((item, index) => (
          <GoodsV2 key={index}>{item}</GoodsV2>
        ))}        
      </div>
      <NavBar />
      <Filters onClose={() => setShowFilter(false)} show={showFilter} categoryData={Array.from(categorySet)} brandData={Array.from(brandSet)}></Filters>
    </div>
  );
};

export default exploreCategory;

export async function getServerSideProps(context) {
  const { publicRuntimeConfig } = getConfig();

  switch (context.params.category) {
    case "fresh-fruits-and-vegetables":
      var title = "Fresh Fruits & Vegetables"
      break;
    case "cooking-oil-and-ghee":
      var title = "Cooking Oil & Ghee"
      break;
    case "meat-and-fish":
      var title = "Meat & Fish"
      break;
    case "bakery-and-snacks":
      var title = "Bakery & Snacks"
      break;
    case "dairy-and-eggs":
      var title = "Dairy & Eggs"
      break;
    case "beverages":
      var title = "Beverages"
      break;
    case "groceries":
      var title = "Groceries"
      break;
  }

  const data = await fetch(`${publicRuntimeConfig.apiUrl}/explore/${context.params.category}`);
  const productData = await data.json();

  //you can make DB queries using the data in context.query
  return {
    props: {
      title: title,
      data: productData //pass it to the page props
    }
  }
}