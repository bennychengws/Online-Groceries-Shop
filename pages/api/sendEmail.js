import dbConnect from '../../lib/dbConnect';
import User from '../../models/user';
import mail from '@sendgrid/mail';
import Jwt from "jsonwebtoken";
import getConfig from 'next/config';

mail.setApiKey(process.env.SENDGRID_API_KEY)

const resetPasswordEmail = async (req, res) => {
  await dbConnect();
  switch (req.method) {
    case 'POST':
      try {
      const { email } = req.body
      const user = await User.findOne({email: email}, {username: 1, password: 1}).lean().exec();
      if(!user) {
        return res.status(409).json({ message: `User with the email "${email}" does not exist` });  
      } else {
        const { publicRuntimeConfig } = getConfig();
        const payload = { sub: user._id, email: email };
        const secretKey = process.env.JWT_SECRET + user.password
        const jwtKey = Jwt.sign(payload, secretKey, { expiresIn: '1m' });
        const message = `
          Dear ${user.username}: \r\n
          \r\n
          Please click the following link to reset your password:\r\n
          ${publicRuntimeConfig.domainUrl}/reset-password/${user._id}/${jwtKey} \r\n
          \r\n
          Regards,\r\n
          Admin from the Online Groceries Shop
        `;
        const data = {
          to: email,
          from: 'bearcastle@protonmail.com',
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

export default resetPasswordEmail;