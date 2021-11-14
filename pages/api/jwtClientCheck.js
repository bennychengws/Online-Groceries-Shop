import getConfig from 'next/config';
import Jwt from "jsonwebtoken";

export default async (req, res) => {
  const { serverRuntimeConfig } = getConfig();
  Jwt.verify(req.cookies.auth, serverRuntimeConfig.secret, async function (err, decoded) {
    console.log(req.cookies.auth)
    if (!err && decoded) {
      console.log("internal api ok")
      return res.json({isAuthenticated: true});
    }
    return res.json({isAuthenticated: false});
  });
}