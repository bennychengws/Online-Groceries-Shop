import React from "react";
import Product from "../models/product";
import axios from "axios";
import Image from "next/image";

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
  const data = await fetch("http://localhost:3000/api/product");
  const productData = await data.json();
  return {
    props: { products: productData },
  };
}
// export async function getServerSideProps() {
//   const result = await Product.find({})
//   const products = result.map((doc) => {
//     const product = doc.toObject()
//     product._id = product._id.toString()
//     return product
//   })

//   return { props: { products: products } }
// }
