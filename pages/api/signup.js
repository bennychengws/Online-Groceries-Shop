import connectDB from '../../middleware/mongodb';
import User from '../../models/user';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const helloAPI = async (req, res) => {
  console.log(req.body);
  switch (req.method) {
    case 'POST':
      const {username, email, password, address} =req.body
      const user = new User({
        username,
        email,
        password,
        address
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