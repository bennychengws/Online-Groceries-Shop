import React from "react";
import Product from "../models/product";
import axios from "axios";
import Image from "next/image";
import getConfig from 'next/config';
import moduleCss from "../styles/test.module.css";

const test = ({ products }) => {
  console.log(products);

  return (
    <div>
      {products.map((product) => (
        <div className={moduleCss.productImage}>
          <Image
            src={`data:image/png;base64,${product.productImage}`}
            layout="fill"
            objectFit="contain"
          ></Image>
        </div>
      ))}
    </div>
  );
};

export default test;

export async function getServerSideProps() {
  const { publicRuntimeConfig } = getConfig();
  const data = await fetch(`${publicRuntimeConfig.apiUrl}/product`);
  const productData = await data.json();
  return {
    props: { products: productData },
  };
}
