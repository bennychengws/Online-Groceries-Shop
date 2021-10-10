import getConfig from 'next/config';
import Jwt from "jsonwebtoken";
const authenticationCheck = (context) => {
    const { serverRuntimeConfig } = getConfig();
    console.log(context.req.cookies.auth)
    var authenticated = false;
    Jwt.verify(context.req.cookies.auth, serverRuntimeConfig.secret, async function (err, decoded) {
    if (!err && decoded) {
        console.log("authenticated by the authentication check function")
        authenticated = true;
      }
    }) 
    return authenticated
}

export default authenticationCheck
