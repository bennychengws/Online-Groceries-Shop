// import getConfig from 'next/config';
import Jwt from "jsonwebtoken";

// export async function authenticationCheck() {
//   const res = await fetch("http://localhost:3000/api/jwtClientCheck")
//   const resMessage = await res.json()
//   console.log("authenticationCheck value: " + resMessage.isAuthenticated)
//   return resMessage.isAuthenticated;
// }

const authenticationCheck = (context) => {
//    const { serverRuntimeConfig } = getConfig();
    console.log("server-checked jwt: " + context.req.cookies.auth)
    var authenticated = false;

    Jwt.verify(context.req.cookies.auth, process.env.JWT_SECRET, async function (err, decoded) {
    if (!err && decoded) {
        console.log("authenticated by the authentication check function")
        authenticated = true;
      }
    }) 
    return authenticated
}

export default authenticationCheck
