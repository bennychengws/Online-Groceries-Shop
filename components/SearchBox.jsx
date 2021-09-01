import React, { useState } from 'react'
import moduleCss from "../styles/searchBox.module.css";
import magnifier from "../images/magnifier.png";
import Image from 'next/image';

const SearchBox = () => {
	const [text, setText] = useState(" ");

	const handleInput = event => {
		setText(event.target.value);
	};

	return (
		<form className={moduleCss.container} id="searchForm" method="GET" action="/account" onSubmit={() => console.log(text)}>
			<button className={moduleCss.magnifier}>
				<Image src={magnifier} width="25vw" height="20vh"></Image>
			</button>
			<input id="searchBox" name="searchBox" onChange={handleInput} value={text} type="text" placeholder=" Search Product" className={moduleCss.box} />
		</form>
	)
}

export default SearchBox
