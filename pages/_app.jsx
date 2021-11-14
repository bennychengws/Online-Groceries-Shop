import Head from 'next/head'
import 'tailwindcss/tailwind.css'
import 'react-notifications/lib/notifications.css';
import { UserWrapper } from '../context/UserContext';
import { FilterWrapper } from '../context/FilterContext';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

function MyApp({ Component, pageProps }) {

  const initialOptions = {
    "client-id": process.env.PAYPAL_CLIENT_ID,
    currency: "HKD",
//    intent: "capture",
//    "data-client-token": "abc123xyz==",
};

  return (
    <>
      <PayPalScriptProvider options= {initialOptions}>
      <FilterWrapper>
      <UserWrapper>
        <Head>
          <link rel="stylesheet" href="https://cdn.rawgit.com/mfd/09b70eb47474836f25a21660282ce0fd/raw/e06a670afcb2b861ed2ac4a1ef752d062ef6b46b/Gilroy.css" />
        </Head>
        <Component {...pageProps} />
      </UserWrapper>
      </FilterWrapper>
      </PayPalScriptProvider>
    </>
  )
}

export default MyApp
