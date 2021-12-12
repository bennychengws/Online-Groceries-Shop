import React, { useState } from "react";
import moduleCss from "../styles/searchBox.module.scss";
import magnifier from "../images/magnifier.png";
import Image from "next/image";
import { useRouter } from "next/router";

const SearchBox = () => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  const handleInput = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchBoxSubmit = (event) => {
    event.preventDefault();
    router.push({ pathname: `../search/${searchQuery}` });
    return null;
  };
  return (
    <form
      className={moduleCss.container}
      id="searchForm"
      method="GET"
      onSubmit={handleSearchBoxSubmit}
    >
      <button type="submit">
        <Image src={magnifier} width="25vw" height="20vh"></Image>
      </button>
      <input
        id="searchBox"
        name="searchBox"
        onChange={handleInput}
        value={searchQuery}
        type="text"
        placeholder=" Search Product"
      />
    </form>
  );
};

export default SearchBox;
