import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import moduleCss from "../../styles/search.module.css";
import Image from "next/image";
import NavBar from "../../components/NavBar";
import authenticationCheck from "../../lib/authenticationCheck";
import filterIcon from "../../images/Filter.png";
import Filters from "../../components/Filters";
import SearchBox from "../../components/SearchBox";
import GoodsV2 from "../../components/GoodsV2";
import { useFilterContext } from "../../context/FilterContext";
import getConfig from 'next/config';

const search = (props) => {
  const router = useRouter();
  const [filterState, dispatchFilter] = useFilterContext()
  const {data} = props
  const [showFilter, setShowFilter] = useState(false);
  const [displayedData, setDisplayedData] = useState([])
  const [categorySet, setCategorySet] = useState(new Set())
  const [brandSet, setBrandSet] = useState(new Set())

  useEffect(() => {
    var categories = new Set()
    var brands = new Set()

    if (data != null) {
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
      {displayedData != null ? displayedData.length > 0 ?
        <div className={moduleCss.productContainer}>
          {displayedData.map((item, index) => (
            <GoodsV2 key={index}>{item}</GoodsV2>
          ))}        
        </div> 
        : <div style={{fontWeight: "bold"}}>No Matched Result</div> 
        : <div style={{fontWeight: "bold"}}>There Is Error In Searching Results. Please Contact Administrator.</div>  
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
  // console.log(data)
  try {
    const productData = await data.json();
    return {
      props: {
        data: productData
  
      }
    }

  } catch (error) {
    console.log(error)
    return {
      props : {

      }
    }
  } 
  
}

