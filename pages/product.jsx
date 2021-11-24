import React from 'react'

const product = () => {
  return (
    <div>
      
    </div>
  )
}

export default product

export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: '../home',
      permanent: true,
    },
  }
}   