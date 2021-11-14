module.exports = {
  env: {
    PAYPAL_CLIENT_ID: "AUNoSVgSLuz9QuQv9d414brbmTW5M4SKTgzbRe7MshLFjgOkoOtBGZG97zokiJDyHboqXjTrCu2rfwKr"
  },
  reactStrictMode: false,
  publicRuntimeConfig: {
      apiUrl: process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/api' // development api
          : 'http://localhost:3000/api' // production api
  },
};

