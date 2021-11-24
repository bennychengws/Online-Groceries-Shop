import Jwt from "jsonwebtoken";

const authenticate = handler => async (req, res) => {
  Jwt.verify(req.cookies.auth, process.env.JWT_SECRET, async function (err, decoded) {
    if (!err && decoded) {
      console.log("authenticated by wrapper")
      console.log(res.statusCode)
      return handler(req, res);
    }
    console.log("Not authenticated by wrapper")
    console.log(err)
    return res.status(401).json({
      message: 'Sorry you are not authenticated'
    });
  });
};

export default authenticate;