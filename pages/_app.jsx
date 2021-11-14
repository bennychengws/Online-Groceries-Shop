// import "../styles/globals.css";
import Head from 'next/head'
import 'tailwindcss/tailwind.css'
import 'react-notifications/lib/notifications.css';
// import { UserContextProvider } from '../context/UserContext';
import { UserWrapper } from '../context/UserContext';
import { FilterWrapper } from '../context/FilterContext';
import getConfig from 'next/config';
import Jwt from "jsonwebtoken";
import { useRouter } from 'next/router'
import { useState, useEffect } from "react";
// import { clientAuthenticationCheck } from '../lib/clientAuthenticationCheck';
// import { authenticationCheck } from '../lib/authenticationCheck';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

function MyApp({ Component, pageProps }) {
  // const router = useRouter()
  // const [authenticated, setAuthenticated] = useState(false);

  // const authCheck = async(url) => {
  //   const publicPaths = ['/'];
  //   const path = url.split('/images')[0];
  //   const res = await fetch("http://localhost:3000/api/jwtClientCheck")
  //   const resMessage = await res.json()
  //   const isAuthenticated = resMessage.isAuthenticated
  //   console.log("Not logged in: " + (!isAuthenticated))
  //   console.log("In private path: " + !publicPaths.includes(path))
    
    
  //     if (!isAuthenticated && !publicPaths.includes(path)) {
  //       setAuthenticated(false)
  //       console.log("In private page and not authenticated by the authentication check function")        
  //       router.push("/")  
  //     // } else if (isAuthenticated && publicPaths.includes(path)) {
  //     //   console.log("In the login page and authenticated by the authentication check function")
  //     //   router.push("/home")  
  //     } else {
  //       console.log("In the login page or authenticated by the authentication check function")
  //       setAuthenticated(true)
  //     }
  // }

  // console.log(router.asPath)

  // useEffect(() => {
  //   // run authentication check on initial load
  //   authCheck(router.asPath);

  //   // set authenticated to false to hide page content while changing routes
  //   const hideContent = () => setAuthenticated(false);
  //   router.events.on('routeChangeStart', hideContent);

  //   // run authentication check on route change
  //   router.events.on('routeChangeComplete', authCheck)

  //   // unsubscribe from events in useEffect return function
  //   return () => {
  //       router.events.off('routeChangeStart', hideContent);
  //       router.events.off('routeChangeComplete', authCheck);
  //   }
  // }, []);

  // // version 2
  // useEffect(async() => {
  //   const isAuthenticated = await clientAuthenticationCheck()
  //   const publicPaths = ['/'];
  //   const url = router.asPath;
  //   const path = url.split('/images')[0];
  //   if (!isAuthenticated && !publicPaths.includes(path)) router.push("/")
  // })

  const initialOptions = {
    "client-id": process.env.PAYPAL_CLIENT_ID,
    currency: "HKD",
//    intent: "capture",
//    "data-client-token": "abc123xyz==",
};

  return (
    <>
      {/* <UserContextProvider> */}
      <PayPalScriptProvider options= {initialOptions}>
      <FilterWrapper>
      <UserWrapper>
        <Head>
          <link rel="stylesheet" href="https://cdn.rawgit.com/mfd/09b70eb47474836f25a21660282ce0fd/raw/e06a670afcb2b861ed2ac4a1ef752d062ef6b46b/Gilroy.css" />
          {/* <link rel="stylesheet" href="path/node_modules/keen-slider/keen-slider.min.css" /> */}
        </Head>
        {/* {authenticated && <Component {...pageProps} />}         */}
        <Component {...pageProps} />
      </UserWrapper>
      </FilterWrapper>
      </PayPalScriptProvider>
      {/* </UserContextProvider> */}
    </>
  )
}

export default MyApp
