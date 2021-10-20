// import "../styles/globals.css";
import Head from 'next/head'
import 'tailwindcss/tailwind.css'
import 'react-notifications/lib/notifications.css';
import { UserWrapper } from "../context/UserContext";
import getConfig from 'next/config';
import Jwt from "jsonwebtoken";
import { useRouter } from 'next/router'
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  // const [authenticated, setAuthenticated] = useState(false);

  const authenticationCheck = () => {
    const { serverRuntimeConfig } = getConfig();
    const auth = Cookies.get("auth");
    // console.log(context.req.cookies.auth)
    // var authenticated = false
    Jwt.verify(auth, serverRuntimeConfig.secret, async function (err, decoded) {
    if (!err && decoded) {
        console.log("authenticated by the authentication check function")
        if (router.asPath === "/") {
          router.push("/home");
        } else {
          // not really solved
          return;
        }
        // authenticated = true
      }
    })
    if (router.asPath === "/") {
      // not really solved
      return;
    } else {
      router.push("/");
    } 
    // authenticated = false
  }

  console.log(router.asPath)

  useEffect(() => {
    // run authentication check on initial load
    // authenticationCheck();

    // set authenticated to false to hide page content while changing routes
    // const hideContent = () => setAuthenticated(false);
    // router.events.on('routeChangeStart', hideContent);

    // run authentication check on route change
    router.events.on('routeChangeComplete', authenticationCheck)

    // unsubscribe from events in useEffect return function
    return () => {
        // router.events.off('routeChangeStart', hideContent);
        router.events.off('routeChangeComplete', authenticationCheck);
    }
  }, []);

  // useEffect(() => {
  //   const authenticated = authenticationCheck()
  //   if (!authenticated && router.pathname !== "/") {
  //     router.push("/")
  //   }
  // }, [pageProps]);

  return (
    <>
      <UserWrapper>
        <Head>
          <link rel="stylesheet" href="https://cdn.rawgit.com/mfd/09b70eb47474836f25a21660282ce0fd/raw/e06a670afcb2b861ed2ac4a1ef752d062ef6b46b/Gilroy.css" />
          {/* <link rel="stylesheet" href="path/node_modules/keen-slider/keen-slider.min.css" /> */}
        </Head>
        <Component {...pageProps} />
      </UserWrapper>
    </>
  )
}

export default MyApp

// export async function getServerSideProps(context) {
//   const authenticationCheck = (context) => {
//     const { serverRuntimeConfig } = getConfig();
//     console.log(context.req.cookies.auth)
//     var authenticated = false;
//     Jwt.verify(context.req.cookies.auth, serverRuntimeConfig.secret, async function (err, decoded) {
//     if (!err && decoded) {
//         console.log("authenticated by the authentication check function")
//         authenticated = true;
//       }
//     }) 
//     return authenticated
//   }
//   const authenticated = authenticationCheck(context)
//   if (!authenticated) {
//     return {redirect: {destination: '/', permanent: true,}, };
//   }
//   return {
//     props: {},
//   }
// }