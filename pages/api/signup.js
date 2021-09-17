import connectDB from '../../middleware/mongodb';
import User from '../../models/user';
import bcrypt from 'bcrypt'
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const helloAPI = async (req, res) => {
  console.log(req.body);
  const users = await User.find({}).lean().exec();
  switch (req.method) {
    case 'POST':
      const {username, email, password} =req.body
      if (users.find(user => user.email === email)){
          console.log(`User with the email "${email}" already exists`);
          break;  
      }
      if (users.find(user => user.username === username)){
        console.log(`User with the usernamme "${username}" already exists`);
        break;   
      } 
      const hashedPassword = bcrypt.hashSync(password, 10)
      const user = new User({
        username,
        email,
        password: hashedPassword,
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