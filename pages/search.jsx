import React from "react";

const search = () => {

  return (
    <div></div>
  );
};

export default search;

export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: '../home',
      permanent: true,
    },
  }
}   
