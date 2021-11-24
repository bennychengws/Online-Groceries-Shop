import Jwt from "jsonwebtoken";

const authenticationCheck = (context) => {
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
