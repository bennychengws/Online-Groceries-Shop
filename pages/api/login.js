import dbConnect from '../../lib/dbConnect'
import Jwt from "jsonwebtoken";
import cookie from 'cookie';
import User from '../../models/user';
import bcrypt from 'bcrypt'

const loginAPI = async (req, res) => {
  const { email, password } = req.body
  await dbConnect();
  switch (req.method) {
    case 'POST':
      const user = await User.findOne({email: email}).lean().exec();
      if (!user || !bcrypt.compareSync(password, user.password)) {
        console.log('Incorret email or password')
        return res.status(401).json({message: 'Incorret email or password'});
      } else {
        const claims = { sub: user._id, email: user.email };
        const jwt = Jwt.sign(claims, process.env.JWT_SECRET, { expiresIn: '1h' });
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

export default loginAPI;

