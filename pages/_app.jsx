// import "../styles/globals.css";
import Head from 'next/head'
import 'tailwindcss/tailwind.css'


function MyApp({ Component, pageProps }) {
  return (
    <div>
    <Head>
      <link rel="stylesheet" href="https://cdn.rawgit.com/mfd/09b70eb47474836f25a21660282ce0fd/raw/e06a670afcb2b861ed2ac4a1ef752d062ef6b46b/Gilroy.css"/>
      {/* <link rel="stylesheet" href="path/node_modules/keen-slider/keen-slider.min.css" /> */}
    </Head>
  <Component {...pageProps} />
  </div>)
}

export default MyApp
