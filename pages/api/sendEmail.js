import connectDB from '../../middleware/mongodb';
import User from '../../models/user';
import bcrypt from 'bcrypt'
import mail from '@sendgrid/mail';
import Jwt from "jsonwebtoken";
import getConfig from 'next/config';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

mail.setApiKey(process.env.SENDGRID_API_KEY)

const resetPasswordEmail = async (req, res) => {
  // const users = await User.find({}).lean().exec();
  switch (req.method) {
    case 'POST':
      try {
      const { serverRuntimeConfig } = getConfig();
      console.log(req.body)
      const { email } = req.body
      const user = await User.findOne({email: email}, {username: 1, password: 1}).lean().exec();
      console.log(user)
      if(!user) {
        return res.status(409).json({ message: `User with the email "${email}" does not exist` });  
      } else {
        const payload = { sub: user._id, email: email };
        console.log(user.password)
        console.log(serverRuntimeConfig.secret)
        const secretKey = serverRuntimeConfig.secret + user.password
        // console.log(payload.password)
        console.log(secretKey)
        const jwtKey = Jwt.sign(payload, secretKey, { expiresIn: '1m' });
        console.log(jwtKey)
        const message = `
          Dear ${user.username}: \r\n
          \r\n
          Please click the following link to reset your password:\r\n
          http://localhost:3000/reset-password/${user._id}/${jwtKey} \r\n
          \r\n
          Regards,\r\n
          Admin from Eshop
        `;
        const data = {
          to: 'bennychengws@gmail.com',
          from: 'bearcastlecws@gmail.com',
          subject: 'Reset Password',
          text: message,
          html: message.replace(/\r\n/g, '<br>')
        }
        
        mail.send(data)
        return res.status(200).json("An Email is sent");
      }
    } catch (error) {
      return res.status(400).json("Failed to post users data");
    }
    case 'GET':
      return res.status(405).json("We only support POST")
    default:
      break
  } 
}

export default connectDB(resetPasswordEmail)