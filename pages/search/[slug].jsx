import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import moduleCss from "../../styles/search.module.css";
import Image from "next/image";
import NavBar from "../../components/NavBar";
import backArrow from "../../images/back_arrow.png";
import authenticationCheck from "../../lib/authenticationCheck";
import filterIcon from "../../images/Filter.png";
import Filters from "../../components/Filters";
import SearchBox from "../../components/SearchBox";
import coca from "../../images/coca_cola.png";
import pepsi from "../../images/pepsi.png";
import dietCoke from "../../images/diet_coke.png";
import orangeJuice from "../../images/orange_juice.png";
import appleJuice from "../../images/apple_juice.png";
import sprite from "../../images/sprite_can.png";
import GoodsV2 from "../../components/GoodsV2";
import Goods from "../../components/Goods";
import { useFilterContext } from "../../context/FilterContext";
import getConfig from 'next/config';

const search = (props) => {
  const router = useRouter();
  const [filterState, dispatchFilter] = useFilterContext()
  const {data} = props
//   console.log("passed data: " + data)
  const [showFilter, setShowFilter] = useState(false);
  // console.log(data)
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
    console.log(data)
    console.log(filterState.brands)
    console.log(filterState.categories)
    if (filterState.brands && filterState.categories !== undefined) {
      // let filteredBrands = filterState.brands.slice()
      // let filteredCategories = filterState.categories.slice()
      // console.log(filteredBrands)
      // console.log(filteredCategories)

      let fitleredData = new Set()
      for (var k = 0; k < data.length; k++ ) {
        let isCheckedInBrands = false;
        let isCheckedInCategories = false;
        for (var m = 0; m < filterState.brands.length; m++ ) {
          if (data[k].brand === filterState.brands[m]) {
            // console.log(data[k].name)
            isCheckedInBrands = true;
            // fitleredData.add(data[k])
            break
          }
        }

        for (var p = 0; p < filterState.categories.length; p++ ) {
          for (var r = 0; r < data[k].categoryTags.length; r++ ) {
            // console.log(data[k].categoryTags.length)
            if (data[k].categoryTags[r] === filterState.categories[p]) {
              // console.log(data[k].categoryTags[r])
              // console.log(data[k].name)
              // fitleredData.add(data[k])
              isCheckedInCategories= true;
              break
            }
          }
        }
        if (isCheckedInBrands && isCheckedInCategories) {
          fitleredData.add(data[k])
        }
      }

      console.log(fitleredData)
      setDisplayedData(Array.from(fitleredData))
    }
  }, [filterState])

  
  // useEffect(() =>{
  //   var categoryList = []
  //   for (var i = 0; i < data.length; i++ ) {
  //     for (var j = 0; j < data.length; j++ ) {
  //       if (data[i].categoryTags[j] !== undefined) {
  //         categoryList.push(data[i].categoryTags[j])
  //       }
  //     }
  //   }
  //   console.log(categoryList) 
  // })

  // useEffect(() => {
  //   var categories = new Set()
  //   var brands = new Set()

  //   for (var i = 0; i < data.length; i++ ) {
  //     for (var j = 0; j < data.length; j++ ) {
  //       if (data[i].categoryTags[j] !== undefined) {
  //         categories.add(data[i].categoryTags[j])
  //         continue
  //       }
  //     }
  //   }    

  //   for (var k = 0; k < data.length; k++ ) {
  //     brands.add(data[k].brand)
  //   }    

  //   setCategorySet(categories)
  //   setBrandSet(brands)

  // }, [])

  return (
    <div className={moduleCss.container} style={{ overflow: showFilter ? "hidden" : "auto", height: showFilter ? "100vh" : "auto" }}>
      <div className={moduleCss.topPanel}>
        {/* <div className={moduleCss.back} onClick={() => router.back()}>
          <Image src={backArrow} width="10px" height="18px"></Image>
        </div> */}
        {/* <div className={moduleCss.childrenTitle}>{children.title}</div> */}
          <SearchBox/>
        <div
          className={moduleCss.filter}
          onClick={() => (setShowFilter(true), console.log("Clicked"))}
        >
          <Image src={filterIcon} width="16.8px" height="17.85px"></Image>
        </div>
      </div>
      {displayedData.length > 0 ?
        <div className={moduleCss.productContainer}>
          {displayedData.map((item, index) => (
            <GoodsV2 key={index}>{item}</GoodsV2>
          ))}        
        </div> 
        : <div style={{fontWeight: "bold"}}>No Matched Result</div>
      }
      <NavBar />
      <Filters onClose={() => setShowFilter(false)} show={showFilter} categoryData={Array.from(categorySet)} brandData={Array.from(brandSet)}></Filters>
    </div>
  );
};

export default search;

export async function getServerSideProps(context) {
  const { publicRuntimeConfig } = getConfig();
  const authenticated = authenticationCheck(context)
  if (!authenticated) {
    return {redirect: {destination: '/', permanent: true,}, };
  }
  const data = await fetch(`${publicRuntimeConfig.apiUrl}/search/${context.params.slug}`);
  const productData = await data.json();
//   console.log("server side:" + productData)
  return {
    props: {
      data: productData

    }
  }
}

