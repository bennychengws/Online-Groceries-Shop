// import getConfig from 'next/config';
import connectDB from '../../middleware/mongodb';
import Jwt from "jsonwebtoken";
import cookie from 'cookie';
import User from '../../models/user';
import bcrypt from 'bcrypt'
import authenticate from '../../middleware/authenticate';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const loginAPI = async (req, res) => {
//  const { serverRuntimeConfig } = getConfig();
  // console.log(req.body.formData);
  // const users = await User.find({}).lean().exec();
  const { email, password } = req.body
  switch (req.method) {
    case 'POST':
      const user = await User.findOne({email: email}).lean().exec();
      // console.log(user)
      if (!user || !bcrypt.compareSync(password, user.password)) {
        // authentication failed
        console.log('Incorret email or password')
        return res.status(401).json({message: 'Incorret email or password'});
      } else {
        // authentication successful
        const claims = { sub: user._id, email: user.email };
        const jwt = Jwt.sign(claims, process.env.JWT_SECRET, { expiresIn: '1h' });
        // console.log(jwt)
        res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          maxAge: 3600,
          path: '/'
        }))
        console.log('Welcome back to the app!')
        return res.status(200).json({message: 'Welcome back to the app!'});
      }
    case 'GET':
      return res.status(200).json({ name: 'John Doe' })
    default:
      break
  } 
}

export default connectDB(loginAPI)

