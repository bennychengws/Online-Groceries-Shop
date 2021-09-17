import getConfig from 'next/config';
import connectDB from '../../middleware/mongodb';
import Jwt from "jsonwebtoken";
import cookie from 'cookie';
import User from '../../models/user';
import bcrypt from 'bcrypt'
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const loginAPI = async (req, res) => {
  const { serverRuntimeConfig } = getConfig();
  console.log(req.body);
  // const users = await User.find({}).lean().exec();
  const { email, password } = req.body
  switch (req.method) {
    case 'POST':
      const user = await User.findOne({email: email}).lean().exec();
      console.log(user)
      bcrypt.compare(password, user.password, function(err, result) {
        if (!err && result) {
          const claims = { sub: user._id, email: user.email };
          const jwt = Jwt.sign(claims, serverRuntimeConfig.secret, { expiresIn: '1h' });
          res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 3600,
            path: '/'
          }))
          return res.json({message: 'Welcome back to the app!'});
        } else {
          return res.json({ message: 'Ups, something went wrong!' });
        }
      })
      // return res.status(200).json(JSON.stringify(user))        
      
      // const {username, email, password} =req.body
      // if (users.find(user => user.email === email)){
      //     console.log(`User with the email "${email}" already exists`);
      //     break;  
      // }
      // if (users.find(user => user.username === username)){
      //   console.log(`User with the usernamme "${username}" already exists`);
      //   break;   
      // } 
      // const hashedPassword = bcrypt.hashSync(password, 10)
      // const user = new User({
      //   username,
      //   email,
      //   password: hashedPassword,
      // })
      // await user.save()
      // return res.status(200).json({ name: 'John Doe' })
    case 'GET':
      return res.status(200).json({ name: 'John Doe' })
    default:
      break
  } 
}

export default connectDB(loginAPI)