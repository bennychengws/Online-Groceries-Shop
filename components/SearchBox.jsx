import React from 'react';
import moduleCss from "../styles/searchBox.module.css";
import magnifier from "../images/magnifier.png";
import Image from 'next/image';

const SearchBox = () => {
    return (
        <div className={moduleCss.container}>
            <Image src={magnifier} width="25vw" height="20vh"></Image>
            <input id="searchbox" type="text" placeholder=" Search Product" className={moduleCss.box}/>
        </div>
    )
}

export default SearchBox
