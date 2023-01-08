module.exports = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  },
  env: {
    PAYPAL_CLIENT_ID: "AUNoSVgSLuz9QuQv9d414brbmTW5M4SKTgzbRe7MshLFjgOkoOtBGZG97zokiJDyHboqXjTrCu2rfwKr"
  },
  reactStrictMode: false,
  outputFileTracing: false,
  publicRuntimeConfig: {
      apiUrl: process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/api' // development api
          : 'https://onlinegroceriesapp.vercel.app/api' // production api
      , 
      domainUrl: process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000' // development api
      : 'https://onlinegroceriesapp.vercel.app' // production api
  },
  swcMinify: true,
};

