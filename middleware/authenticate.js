import getConfig from 'next/config';
import Jwt from "jsonwebtoken";

const authenticate = handler => async (req, res) => {

  const { serverRuntimeConfig } = getConfig();
  Jwt.verify(req.cookies.auth, serverRuntimeConfig.secret, async function (err, decoded) {
    console.log(req.cookies.auth)
    if (!err && decoded) {
      console.log("authenticated")
      console.log(res.statusCode)
      return handler(req, res);
    }
    console.log("Not authenticated")
    console.log(err)
    return res.status(401).json({
      message: 'Sorry you are not authenticated'
    });
  });
};

export default authenticate;