import Router from "next/router";

// const get = async(url, context) => {
//   console.log("GET method")
//   const cookie = context.req?.headers.cookie;
//   const requestOptions = {
//       method: 'GET',
//       headers: {cookie: cookie,}
//   };
//   console.log(cookie)
//   console.log("ready to get")
//   const resp = await fetch(url, requestOptions)
//   return handleResponse(resp, context) 
// };

// const put = async(url, body) => {
//   const requestOptions = {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json', cookie: cookie, },
//     body: JSON.stringify(body)
//   }; 
//   const resp = await fetch(url, requestOptions)
//   return handleResponse(resp) 
// }

// const handleResponse = async(resp, context) => {
// // not yet completed
//   if (resp.status === 401 && !context.req) {
//     Router.replace("/");
//     return {};
//   }

//   if (resp.status === 401 && context.req) {
//     context.res?.writeHead(302, {
//       Location: "http://localhost:3000/",
//     });
//     context.res?.end();
//     return;
//   }

//   const json = await resp.json();
//   return json;
// }

// export const fetchWrapper = {
//   get,
//   // post,
//   put,
//   // delete: _delete
// };


// const fetchWrapper = () => {

//   const get = async(url, context) => {
//     const cookie = context.req?.headers.cookie;
//     const resp = await fetch(url, {
//       headers: {
//         cookie: cookie,
//       },
//     });
//   };

//   if (resp.status === 401 && !context.req) {
//     Router.replace("/");
//     return {};
//   }

//   if (resp.status === 401 && context.req) {
//     context.res?.writeHead(302, {
//       Location: "http://localhost:3000/",
//     });
//     context.res?.end();
//     return;
//   }

//   const json = await resp.json();
//   return json;
// };

// export default fetchWrapper;
