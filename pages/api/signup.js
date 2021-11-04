import connectDB from '../../middleware/mongodb';
import User from '../../models/user';
import bcrypt from 'bcrypt'
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const helloAPI = async (req, res) => {
  // const users = await User.find({}).lean().exec();
  switch (req.method) {
    case 'POST':
      // console.log("Req body: " + req.body.password);
      const {username, email, password} = req.body
      // console.log(password)
      const userforUsernameVerification = await User.findOne({username: username}).lean().exec();
      const userForEmailVerification = await User.findOne({email: email}).lean().exec();
      // console.log(userForEmailVerification)
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
        cart,
        favourite,
        orders
        // paymentMethod: ""
      })
      await user.save()
      return res.status(200).json({ name: 'John Doe' })
    case 'GET':
      return res.status(200).json({ name: 'John Doe' })
    default:
      break
  } 
}

export default connectDB(helloAPI)

// const app = express()

// const connectDB = (req, res, next) => {
//   console.log('middleware')
//   next()
// }


// // app.post('api/signup', (req, res,) => {
//   console.log('middleware')
//   next()
//   res.status(200).json({ name: 'John Doe' }
// } ,(req, res,) => {
//   console.log(req.body);
//   res.status(200).json({ name: 'John Doe' })
// })

// app.get('api/signup', (req, res) => {
//   console.log(req.body);
//   res.status(200).json({ name: 'John Doe' })
// })