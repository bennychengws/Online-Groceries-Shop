module.exports = {
  env: {
    PAYPAL_CLIENT_ID: "AUNoSVgSLuz9QuQv9d414brbmTW5M4SKTgzbRe7MshLFjgOkoOtBGZG97zokiJDyHboqXjTrCu2rfwKr"
  },
  reactStrictMode: false,
  // outputFileTracing: false,
  publicRuntimeConfig: {
      apiUrl: process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/api' // development api
          : 'https://onlinegroceriesapp.vercel.app/api' // production api
      , 
      domainUrl: process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000' // development api
      : 'https://onlinegroceriesapp.vercel.app' // production api  
  },
};

