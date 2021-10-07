import connectDB from '../../../middleware/mongodb';
import User from '../../../models/user';
import authenticate from '../../../middleware/authenticate';
// import dbConnect from '../../utils/dbConnect';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// dbConnect();

const userAccountAPI = async (req, res) => {
  switch (req.method) {
    case 'POST':
        return res.status(405).json({ message: 'We only support Get' });
    case 'PUT':
      try {
        console.log("Put method")
        // console.log(req.body)
        const { username, email } = req.body
        console.log(username)
        console.log(email)
        const user = await User.updateOne({email: email}, {$set: {username: username}}) 
        // return res.status(200).json({message: 'Username updated successfully', success: true});
        // console.log(user)
        return res.status(200).json('Username updated successfully');
      } catch(error) {
        // return res.status(400).json({message: new Error(error).message, success: false,});
        return res.status(400).json('Username failed to update');
      }
    case 'GET':
      try {
        const { email } = req.query
        console.log(email)
        // const users = await User.find({}).lean().exec();
        const user = await User.findOne({email: email}).lean().exec();
        return res.status(200).json(user)      
      } catch (error) {
        return res.status(400).json("failed to get users data");        
      }

    default:
      break
  } 
}

export default connectDB(userAccountAPI)