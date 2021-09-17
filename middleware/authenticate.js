import getConfig from 'next/config';
import Jwt from "jsonwebtoken";

const authenticate = handler => async (req, res) => {
  const { serverRuntimeConfig } = getConfig();
  Jwt.verify(!req.cookies.auth, serverRuntimeConfig.secret, async function (err, decoded) {
    if (!err && decoded) {
      return handler(req, res);
    }

    res.status(401).json({
      message: 'Sorry you are not authenticated'
    });
  });
};

export default authenticate;