import dbConnect from '../../lib/dbConnect';
import User from '../../models/user';
import bcrypt from 'bcrypt'

const signUpAPI = async (req, res) => {
  await dbConnect();
  switch (req.method) {
    case 'POST':
      const {username, email, password} = req.body
      const userforUsernameVerification = await User.findOne({username: username}).lean().exec();
      const userForEmailVerification = await User.findOne({email: email}).lean().exec();
      if(userforUsernameVerification) {
        return res.status(409).json({ message: `User with the username "${username}" already exists` });  
      }
      if(userForEmailVerification) {
        return res.status(409).json({ message: `User with the email "${email}" already exists` });  
      }
      const hashedPassword = bcrypt.hashSync(password, 10)
      console.log("hashed")
      const user = new User({
        username,
        email,
        password: hashedPassword,
        address: {
          country: "",
          region: "",
          city: "",
          streetAddressLine1: "",
          streetAddressLine2: ""
        },
        cart: [],
        favourite: [],
        orders:[]
      })
      await user.save()
      return res.status(200).json({ name: 'John Doe' })
    case 'GET':
      return res.status(200).json({ name: 'John Doe' })
    default:
      break
  } 
}

export default signUpAPI;