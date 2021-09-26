module.exports = {
  env: {
    mongodburl:
      "mongodb+srv://dbAdmin:GmjzIMjYuheH475Z@cluster0.bcxlu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  },
  reactStrictMode: false,
  serverRuntimeConfig: {
      secret: '66c504de-57d7-4690-bb39-4a7ddc36d909'
  },
  publicRuntimeConfig: {
      apiUrl: process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/api' // development api
          : 'http://localhost:3000/api' // production api
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       has: [
  //         // {
  //         //   type: 'query',
  //         //   key: 'page',
  //         //   // the page value will not be available in the
  //         //   // destination since value is provided and doesn't
  //         //   // use a named capture group e.g. (?<page>home)
  //         //   value: 'home',
  //         // },
  //         {
  //           type: 'cookie',
  //           key: 'auth',
  //           value: 'true',
  //         },
  //       ],
  //       permanent: true,
  //       destination: '/home',
  //     },
  //   ]
  // }
//   async redirects() {
//     return [
//       {
//         source: "../search",
//         destination: "../home",
//         permanent: true,
//       },
//     ];
//   },
};

// const withCSS = require('@zeit/next-css')
// module.exports = withCSS()
